'use client';

import { useState } from 'react';
import { TrendingUp, Calculator, BarChart3, Search } from 'lucide-react';
import StockAnalyzer from '@/components/StockAnalyzer';
import MultibaggerScanner from '@/components/MultibaggerScanner';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'scanner' | 'analyzer'>('scanner');

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <TrendingUp className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl font-bold text-white">
              Multibagger Stock Scanner
            </h1>
          </div>
          <p className="text-blue-200 text-lg">
            Discover high-growth potential stocks with intrinsic value analysis
          </p>
        </div>

        <div className="flex gap-4 mb-6 justify-center">
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'scanner'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Search className="w-5 h-5" />
            Stock Scanner
          </button>
          <button
            onClick={() => setActiveTab('analyzer')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'analyzer'
                ? 'bg-green-500 text-white shadow-lg'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Calculator className="w-5 h-5" />
            Value Analyzer
          </button>
        </div>

        {activeTab === 'scanner' ? <MultibaggerScanner /> : <StockAnalyzer />}
      </div>
    </main>
  );
}
