'use client';

import { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  marketCap: number;
  revenueGrowth: number;
  profitGrowth: number;
  roe: number;
  debtToEquity: number;
  peRatio: number;
  score: number;
  intrinsicValue: number;
  upside: number;
}

export default function MultibaggerScanner() {
  const [scanning, setScanning] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const scanStocks = () => {
    setScanning(true);

    setTimeout(() => {
      const mockStocks: Stock[] = [
        {
          symbol: 'TECH1',
          name: 'TechGrowth Industries',
          currentPrice: 245.50,
          marketCap: 12500,
          revenueGrowth: 45.2,
          profitGrowth: 52.8,
          roe: 28.5,
          debtToEquity: 0.35,
          peRatio: 22.4,
          score: 92,
          intrinsicValue: 385.20,
          upside: 56.9,
        },
        {
          symbol: 'INNOV',
          name: 'InnovateCorp',
          currentPrice: 128.75,
          marketCap: 8200,
          revenueGrowth: 38.5,
          profitGrowth: 41.2,
          roe: 24.8,
          debtToEquity: 0.45,
          peRatio: 18.6,
          score: 88,
          intrinsicValue: 198.50,
          upside: 54.2,
        },
        {
          symbol: 'GROW',
          name: 'GrowthMax Solutions',
          currentPrice: 89.30,
          marketCap: 5600,
          revenueGrowth: 42.1,
          profitGrowth: 48.5,
          roe: 31.2,
          debtToEquity: 0.28,
          peRatio: 20.1,
          score: 90,
          intrinsicValue: 155.80,
          upside: 74.5,
        },
        {
          symbol: 'DIGIT',
          name: 'Digital Dynamics',
          currentPrice: 312.40,
          marketCap: 18900,
          revenueGrowth: 35.8,
          profitGrowth: 38.9,
          roe: 26.4,
          debtToEquity: 0.52,
          peRatio: 24.8,
          score: 85,
          intrinsicValue: 445.60,
          upside: 42.6,
        },
        {
          symbol: 'SCALE',
          name: 'ScaleUp Tech',
          currentPrice: 67.85,
          marketCap: 3400,
          revenueGrowth: 51.3,
          profitGrowth: 58.7,
          roe: 33.6,
          debtToEquity: 0.22,
          peRatio: 16.9,
          score: 94,
          intrinsicValue: 125.40,
          upside: 84.8,
        },
        {
          symbol: 'CLOUD',
          name: 'CloudVision Systems',
          currentPrice: 178.60,
          marketCap: 9800,
          revenueGrowth: 39.7,
          profitGrowth: 44.3,
          roe: 27.9,
          debtToEquity: 0.38,
          peRatio: 21.2,
          score: 87,
          intrinsicValue: 268.90,
          upside: 50.6,
        },
      ];

      setStocks(mockStocks.sort((a, b) => b.score - a.score));
      setScanning(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getUpsideColor = (upside: number) => {
    if (upside >= 50) return 'text-green-400';
    if (upside >= 30) return 'text-blue-400';
    return 'text-yellow-400';
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-800 rounded-xl shadow-2xl p-8 mb-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            AI-Powered Stock Scanner
          </h2>
          <p className="text-slate-300 mb-6">
            Our algorithm analyzes stocks based on growth metrics, profitability, and valuation
          </p>
          <button
            onClick={scanStocks}
            disabled={scanning}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {scanning ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Scanning Markets...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Scan for Multibaggers
              </span>
            )}
          </button>
        </div>
      </div>

      {stocks.length > 0 && (
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
              Top Multibagger Candidates
            </h3>
            <div className="grid gap-4">
              {stocks.map((stock, idx) => (
                <div
                  key={stock.symbol}
                  className="bg-slate-700 rounded-lg p-6 hover:bg-slate-650 transition-all border-l-4 border-green-400"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl font-bold text-white">
                          #{idx + 1}
                        </span>
                        <div>
                          <h4 className="text-xl font-bold text-white">
                            {stock.symbol}
                          </h4>
                          <p className="text-slate-400">{stock.name}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-slate-400 text-sm">Current Price</p>
                          <p className="text-white font-bold text-lg">
                            ${stock.currentPrice.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Intrinsic Value</p>
                          <p className="text-green-400 font-bold text-lg">
                            ${stock.intrinsicValue.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Upside Potential</p>
                          <p className={`font-bold text-lg ${getUpsideColor(stock.upside)}`}>
                            +{stock.upside.toFixed(1)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Score</p>
                          <p className={`font-bold text-lg ${getScoreColor(stock.score)}`}>
                            {stock.score}/100
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:border-l lg:border-slate-600 lg:pl-6">
                      <p className="text-slate-400 text-sm mb-2">Key Metrics</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-slate-500 text-xs">Revenue Growth</p>
                          <p className="text-green-400 font-semibold">
                            +{stock.revenueGrowth}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">Profit Growth</p>
                          <p className="text-green-400 font-semibold">
                            +{stock.profitGrowth}%
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">ROE</p>
                          <p className="text-blue-400 font-semibold">{stock.roe}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">P/E Ratio</p>
                          <p className="text-yellow-400 font-semibold">{stock.peRatio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-900/50 rounded-xl shadow-xl p-6 border border-blue-700">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="text-white font-bold mb-2">Scanning Criteria</h4>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>✓ Revenue growth &gt; 30% annually</li>
                  <li>✓ Profit growth &gt; 30% annually</li>
                  <li>✓ Return on Equity (ROE) &gt; 20%</li>
                  <li>✓ Debt-to-Equity ratio &lt; 0.6</li>
                  <li>✓ P/E ratio below industry average</li>
                  <li>✓ Strong competitive moat and market position</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
