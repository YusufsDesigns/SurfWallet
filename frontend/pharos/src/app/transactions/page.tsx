"use client"
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowUpRight, ArrowDownLeft, Filter, Download, Search, ArrowDown, Check, X, Clock } from 'lucide-react';

export default function TransactionsPage() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  
  // Sample transaction data
  const transactions = [
    { 
      id: 'tx1', 
      type: 'send', 
      token: 'ETH', 
      amount: '0.45', 
      address: '0x1234...5678', 
      date: '2025-04-06T14:30:00', 
      status: 'confirmed',
      nonce: 45,
      fee: '0.002 ETH',
      value: '$900.00'
    },
    { 
      id: 'tx2', 
      type: 'receive', 
      token: 'USDC', 
      amount: '250', 
      address: '0xabcd...efgh', 
      date: '2025-04-05T09:15:00', 
      status: 'confirmed',
      nonce: 44,
      fee: '-',
      value: '$250.00'
    },
    { 
      id: 'tx3', 
      type: 'swap', 
      fromToken: 'ETH',
      toToken: 'USDC',
      amount: '0.25', 
      receivedAmount: '500',
      date: '2025-04-03T18:45:00', 
      status: 'confirmed',
      nonce: 43,
      fee: '0.0015 ETH',
      value: '$500.00'
    },
    { 
      id: 'tx4', 
      type: 'approve', 
      token: 'LINK', 
      spender: '0x7890...1234', 
      date: '2025-04-02T11:20:00', 
      status: 'confirmed',
      nonce: 42,
      fee: '0.001 ETH',
      value: '-'
    },
    { 
      id: 'tx5', 
      type: 'send', 
      token: 'LINK', 
      amount: '15', 
      address: '0x5678...9012', 
      date: '2025-04-01T16:10:00', 
      status: 'pending',
      nonce: 46,
      fee: '0.0012 ETH',
      value: '$180.00'
    },
    { 
      id: 'tx6', 
      type: 'multisig', 
      token: 'ETH', 
      amount: '1.5', 
      address: '0xefgh...ijkl', 
      date: '2025-03-30T13:00:00', 
      status: 'awaiting approvals',
      nonce: 41,
      confirmations: 1,
      requiredConfirmations: 2,
      fee: '0.003 ETH',
      value: '$3,000.00'
    },
  ];

  const filteredTransactions = transactions.filter(tx => {
    // Filter by type
    if (selectedFilter !== 'all' && (
      (selectedFilter === 'send' && tx.type !== 'send') ||
      (selectedFilter === 'receive' && tx.type !== 'receive') ||
      (selectedFilter === 'swap' && tx.type !== 'swap') ||
      (selectedFilter === 'multisig' && tx.type !== 'multisig')
    )) {
      return false;
    }
    
    // Filter by search query (address or token)
    if (searchQuery && !(
      tx.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.token?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.fromToken?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.toToken?.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    // Filter by date range
    if (dateRange.from && new Date(tx.date) < new Date(dateRange.from)) {
      return false;
    }
    if (dateRange.to && new Date(tx.date) > new Date(dateRange.to)) {
      return false;
    }
    
    return true;
  });
  
  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Check className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'failed':
        return <X className="w-4 h-4 text-red-600" />;
      case 'awaiting approvals':
        return <Clock className="w-4 h-4 text-blue-600" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch(status) {
      case 'confirmed':
        return 'bg-green-50 text-green-700';
      case 'pending':
        return 'bg-amber-50 text-amber-700';
      case 'failed':
        return 'bg-red-50 text-red-700';
      case 'awaiting approvals':
        return 'bg-blue-50 text-blue-700';
      default:
        return 'bg-gray-50 text-gray-700';
    }
  };
  
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const formatTime = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
            <p className="text-gray-600 mt-1">
              View and manage all your wallet transactions
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setFilterOpen(!filterOpen)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center cursor-pointer"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center cursor-pointer">
              <Download className="w-5 h-5 mr-2" />
              Export
            </button>
          </div>
        </div>
        
        {/* Search and Filter Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by token or address"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3"
              />
            </div>
            
            {/* Type Filter */}
            <div className="flex space-x-2">
              <button 
                onClick={() => setSelectedFilter('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => setSelectedFilter('send')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === 'send' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sent
              </button>
              <button 
                onClick={() => setSelectedFilter('receive')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === 'receive' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Received
              </button>
              <button 
                onClick={() => setSelectedFilter('swap')}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  selectedFilter === 'swap' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Swaps
              </button>
            </div>
          </div>
          
          {/* Advanced Filters */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({...dateRange, from: e.target.value})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({...dateRange, to: e.target.value})}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => {
                    setDateRange({ from: '', to: '' });
                    setSelectedFilter('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500 cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Token
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          tx.type === 'send' ? 'bg-red-100 text-red-600' : 
                          tx.type === 'receive' ? 'bg-green-100 text-green-600' : 
                          tx.type === 'swap' ? 'bg-blue-100 text-blue-600' : 
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {tx.type === 'send' && <ArrowUpRight className="w-4 h-4" />}
                          {tx.type === 'receive' && <ArrowDownLeft className="w-4 h-4" />}
                          {tx.type === 'swap' && <ArrowDown className="w-4 h-4 rotate-45" />}
                          {tx.type === 'approve' && <Check className="w-4 h-4" />}
                          {tx.type === 'multisig' && <Check className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {tx.type === 'send' && 'Sent'}
                            {tx.type === 'receive' && 'Received'}
                            {tx.type === 'swap' && 'Swapped'}
                            {tx.type === 'approve' && 'Approved'}
                            {tx.type === 'multisig' && 'Multisig'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {tx.address && tx.address}
                            {tx.spender && `Spender: ${tx.spender}`}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.type === 'swap' ? (
                        <div>
                          <p className="font-medium text-gray-900">{tx.fromToken} → {tx.toToken}</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-900">{tx.token}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tx.type === 'swap' ? (
                        <div>
                          <p className="font-medium text-gray-900">-{tx.amount} {tx.fromToken}</p>
                          <p className="text-xs text-gray-500">+{tx.receivedAmount} {tx.toToken}</p>
                        </div>
                      ) : tx.type === 'approve' ? (
                        <div>
                          <p className="font-medium text-gray-900">Unlimited</p>
                        </div>
                      ) : (
                        <div>
                          <p className="font-medium text-gray-900">
                            {tx.type === 'send' ? '-' : '+'}{tx.amount} {tx.token}
                          </p>
                          <p className="text-xs text-gray-500">Fee: {tx.fee}</p>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{formatDate(tx.date)}</p>
                        <p className="text-xs text-gray-500">{formatTime(tx.date)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(tx.status)}`}>
                          {getStatusIcon(tx.status)}
                          <span className="ml-1">
                            {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                            {tx.status === 'awaiting approvals' && ` (${tx.confirmations}/${tx.requiredConfirmations})`}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div>
                        <p className="font-medium text-gray-900">{tx.value}</p>
                        <p className="text-xs text-gray-500">#{tx.nonce}</p>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="py-12 text-center">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No transactions found</h3>
              <p className="text-gray-500">Try changing your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}