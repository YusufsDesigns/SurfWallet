require("dotenv").config();
const express = require("express");
const Redis = require("redis");
const { ethers } = require("ethers");
const cors = require("cors");
const bodyParser = require("body-parser");
const entryPointAbi = require("./entryPointAbi.json");

// Config
const config = {
  PHAROS_RPC: "https://devnet.dplabs-internal.com",
  ENTRY_POINT: "0xb3dfdddf64d291d828891d4b6593747f12861ea1",
  PAYMASTER_ADDRESS: "0xeC17FE9bFc20a38bBEC869ECED85603Cd1Fb9d34",
  BUNDLER_PK: process.env.BUNDLER_PK,
  PAYMASTER_PK: process.env.PAYMASTER_PK,
  PORT: 3001,
  REDIS_URL: "redis://localhost:6379",
  MIN_BUNDLE_SIZE: 2,
};

// Initialize services
const provider = new ethers.JsonRpcProvider(config.PHAROS_RPC);
const bundlerSigner = new ethers.Wallet(config.BUNDLER_PK, provider);
const paymasterSigner = new ethers.Wallet(config.PAYMASTER_PK, provider);
const redisClient = Redis.createClient({ url: config.REDIS_URL });
const app = express();

// Middleware
app.use(cors());
app.use(
  bodyParser.json({
    reviver: (key, value) => {
      // Convert numeric strings back to BigInt
      if (typeof value === "string" && /^\d+$/.test(value)) {
        return BigInt(value);
      }
      return value;
    },
  })
);

// ======================
// 1. PAYMASTER ENDPOINTS
// ======================
app.post("/api/paymaster/sign", async (req, res) => {
  try {
    const { sender, nonce } = req.body;
    console.log("Paymaster sign request:", req.body);

    if (!sender || nonce === undefined) {
      return res.status(400).json({ error: "Missing sender or nonce" });
    }

    const paymasterHash = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(
        ["address", "uint256"],
        [sender, nonce]
      )
    );
    console.log("Paymaster hash:", paymasterHash);

    const signature = await paymasterSigner.signMessage(
      ethers.getBytes(paymasterHash)
    );
    console.log("Paymaster signature:", signature);

    res.json({
      paymasterData: signature,
    });
  } catch (error) {
    console.error("Paymaster signing error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ======================
// 2. USEROPERATION PACKING (FINAL CORRECTED VERSION)
// ======================
// Fixed packUserOp function
function packUserOp(userOp) {
  // Safety check the entire userOp
  if (!userOp || typeof userOp !== 'object') {
    console.error("Invalid userOp:", userOp);
    throw new Error("UserOp must be a valid object");
  }

  // Safely convert to BigInt with null/undefined handling
  const toBigInt = (val) => {
    if (val === null || val === undefined) return 0n;
    if (typeof val === "bigint") return val;
    if (typeof val === "string" && /^\d+$/.test(val)) return BigInt(val);
    if (typeof val === "number") return BigInt(val);
    return 0n;
  };

  // Safe bytes conversion
  const toBytes = (val) => {
    if (!val || val === "0x") return "0x";
    try {
      return ethers.getBytes(val);
    } catch (e) {
      console.warn(`Failed to convert to bytes: ${val}`, e);
      return "0x";
    }
  };

  // Ensure sender is valid
  const sender = userOp.sender ? ethers.getAddress(userOp.sender) : ethers.ZeroAddress;
  
  // Nonce handling
  const nonce = toBigInt(userOp.nonce);

  // Handle initCode properly with safety checks
  const initCode = userOp.factory && userOp.factory !== "0x"
    ? ethers.concat([
        toBytes(userOp.factory), 
        toBytes(userOp.factoryData || "0x")
      ])
    : "0x";

  // Ensure callData is proper bytes with safety check
  const callData = toBytes(userOp.callData || "0x");

  // Pack gas limits carefully with safety checks
  const accountGasLimits = ethers.solidityPacked(
    ["uint128", "uint128"],
    [
      toBigInt(userOp.verificationGasLimit), 
      toBigInt(userOp.callGasLimit)
    ]
  );

  // Pack gas fees with safety checks
  const gasFees = ethers.solidityPacked(
    ["uint128", "uint128"],
    [
      toBigInt(userOp.maxPriorityFeePerGas), 
      toBigInt(userOp.maxFeePerGas)
    ]
  );

  // Format paymasterAndData with safety checks
  const paymasterAndData = userOp.paymaster && userOp.paymaster !== "0x"
    ? ethers.concat([
        toBytes(userOp.paymaster),
        ethers.solidityPacked(["uint128"], [toBigInt(userOp.paymasterVerificationGasLimit)]),
        ethers.solidityPacked(["uint128"], [toBigInt(userOp.paymasterPostOpGasLimit)]),
        toBytes(userOp.paymasterData || "0x")
      ])
    : "0x";

  // Include a proper signature or just empty bytes
  const signature = userOp.signature && userOp.signature !== "0x"
    ? toBytes(userOp.signature)
    : "0x";
  
  // Debug output to check values and lengths
  console.log({
    sender,
    nonce: nonce.toString(),
    initCodeLength: ethers.dataLength(initCode),
    callDataLength: ethers.dataLength(callData),
    accountGasLimitsLength: ethers.dataLength(accountGasLimits),
    preVerificationGas: toBigInt(userOp.preVerificationGas).toString(),
    gasFeesLength: ethers.dataLength(gasFees),
    paymasterAndDataLength: ethers.dataLength(paymasterAndData),
    signatureLength: ethers.dataLength(signature)
  });

  // Return as a structured object
  return {
    sender,
    nonce,
    initCode,
    callData,
    accountGasLimits,
    preVerificationGas: toBigInt(userOp.preVerificationGas),
    gasFees,
    paymasterAndData,
    signature
  };
}

// ======================
// 3. USEROP HASH ENDPOINT (FINAL CORRECTED VERSION)
// ======================
app.post("/api/userOpHash", async (req, res) => {
  try {
    const { userOp } = req.body;
    const packed = packUserOp(userOp);

    // Use the ALREADY PROPERLY FORMATTED fields directly
    const contractUserOp = [
      packed.sender, // address
      packed.nonce, // uint256
      packed.initCode, // already bytes
      packed.callData, // already bytes
      packed.accountGasLimits, // bytes32
      packed.preVerificationGas, // uint256
      packed.gasFees, // bytes32
      packed.paymasterAndData, // already bytes
      packed.signature, // bytes
    ];

    const entryPoint = new ethers.Contract(
      config.ENTRY_POINT,
      entryPointAbi,
      provider
    );

    const userOpHash = await entryPoint.getUserOpHash(contractUserOp);
    console.log("Finally... UserOp Hash:", userOpHash);

    res.json({ userOpHash });
  } catch (error) {
    console.error("UserOp Hashing Error:", error);
    res.status(500).json({ error: "Failed to get userOp hash" });
  }
});

// ======================
// 4. BUNDLE PROCESSING
// ======================
async function processBundle() {
  if ((await redisClient.lLen("userops")) >= config.MIN_BUNDLE_SIZE) {
    const userOps = await redisClient.lRange(
      "userops",
      0,
      config.MIN_BUNDLE_SIZE - 1
    );
    console.log(`Processing bundle with ${userOps.length} UserOps`);

    const packedOps = await Promise.all(
      userOps.map((op) => {
        const parsedOp = JSON.parse(op, (key, value) => {
          if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
          }
          return value;
        });
        return packUserOp(parsedOp);
      })
    );

    const entryPoint = new ethers.Contract(
      config.ENTRY_POINT,
      entryPointAbi,
      bundlerSigner
    );

    try {
      console.log("Submitting bundle to EntryPoint...");
      const tx = await entryPoint.handleOps(packedOps, bundlerSigner.address);
      await tx.wait(1);
      console.log(`Bundle submitted: ${tx.hash}`);

      await redisClient.set(
        `bundle:${tx.hash}`,
        JSON.stringify({
          userOpHashes: userOps.map((op) =>
            ethers.keccak256(ethers.toUtf8Bytes(op))
          ),
          timestamp: Date.now(),
        })
      );

      await redisClient.lTrim("userops", packedOps.length, -1);
      console.log(`Successfully processed bundle: ${tx.hash}`);
    } catch (err) {
      console.error("Bundle submission failed:", err);
    }
  }
}

// ======================
// 5. API ENDPOINTS
// ======================
app.post("/api/rpc", async (req, res) => {
  const { method, params, id } = req.body;
  console.log(`RPC request: ${method}`);

  try {
    if (method === "eth_sendUserOperation") {
      const [userOp] = params;
      console.log("Received UserOp:", userOp);

      // Store the original UserOp with BigInts as strings
      const serializedOp = JSON.stringify(userOp, (key, value) => {
        if (typeof value === "bigint") {
          return value.toString() + "n";
        }
        return value;
      });

      await redisClient.lPush("userops", serializedOp);

      res.json({
        jsonrpc: "2.0",
        id,
        result: ethers.keccak256(ethers.toUtf8Bytes(serializedOp)),
      });
    } else if (method === "eth_getUserOperationReceipt") {
      const [userOpHash] = params;
      console.log("Looking for receipt for UserOpHash:", userOpHash);

      const bundleKeys = await redisClient.keys("bundle:*");
      for (const key of bundleKeys) {
        const bundle = JSON.parse(await redisClient.get(key));
        if (bundle.userOpHashes.includes(userOpHash)) {
          return res.json({
            jsonrpc: "2.0",
            id,
            result: {
              transactionHash: key.replace("bundle:", ""),
              success: true,
              timestamp: bundle.timestamp,
            },
          });
        }
      }
      res.json({ jsonrpc: "2.0", id, result: null });
    } else {
      throw new Error("Unsupported method");
    }
  } catch (err) {
    console.error("RPC error:", err);
    res.json({
      jsonrpc: "2.0",
      id,
      error: {
        code: -32603,
        message: err.message,
        data: {
          stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
        },
      },
    });
  }
});

// Start services
async function start() {
  await redisClient.connect();
  console.log("Connected to Redis");

  setInterval(processBundle, 15000);
  console.log("Started bundle processing interval");

  app.listen(config.PORT, () => {
    console.log(`Bundler running on port ${config.PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start services:", err);
  process.exit(1);
});