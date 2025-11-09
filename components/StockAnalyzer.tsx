'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ValuationInputs {
  symbol: string;
  currentPrice: number;
  eps: number;
  bookValue: number;
  fcf: number;
  growthRate: number;
  discountRate: number;
  terminalGrowthRate: number;
  years: number;
}

interface ValuationResults {
  dcfValue: number;
  peValue: number;
  pbValue: number;
  fcfValue: number;
  fairValue: number;
  upside: number;
  projections: Array<{
    year: number;
    conservative: number;
    moderate: number;
    optimistic: number;
  }>;
}

export default function StockAnalyzer() {
  const [inputs, setInputs] = useState<ValuationInputs>({
    symbol: 'EXAMPLE',
    currentPrice: 100,
    eps: 5.5,
    bookValue: 45,
    fcf: 6.2,
    growthRate: 15,
    discountRate: 10,
    terminalGrowthRate: 3,
    years: 5,
  });

  const [results, setResults] = useState<ValuationResults | null>(null);

  const calculateValuation = () => {
    // DCF Valuation
    const { eps, growthRate, discountRate, terminalGrowthRate, years } = inputs;

    let dcfValue = 0;
    let futureEPS = eps;

    for (let i = 1; i <= years; i++) {
      futureEPS = futureEPS * (1 + growthRate / 100);
      const presentValue = futureEPS / Math.pow(1 + discountRate / 100, i);
      dcfValue += presentValue;
    }

    // Terminal value
    const terminalEPS = futureEPS * (1 + terminalGrowthRate / 100);
    const terminalValue = (terminalEPS * 15) / Math.pow(1 + discountRate / 100, years);
    dcfValue += terminalValue;

    // P/E Based Valuation (using industry average P/E of 20)
    const peValue = eps * 20;

    // P/B Based Valuation (assuming 2x book value for growth stocks)
    const pbValue = inputs.bookValue * 2;

    // FCF Based Valuation
    const fcfValue = inputs.fcf * 18;

    // Weighted Fair Value
    const fairValue = (dcfValue * 0.4) + (peValue * 0.3) + (pbValue * 0.15) + (fcfValue * 0.15);

    const upside = ((fairValue - inputs.currentPrice) / inputs.currentPrice) * 100;

    // Future projections
    const projections = [];
    for (let year = 1; year <= 10; year++) {
      const conservative = inputs.currentPrice * Math.pow(1 + 0.12, year);
      const moderate = inputs.currentPrice * Math.pow(1 + 0.18, year);
      const optimistic = inputs.currentPrice * Math.pow(1 + 0.25, year);

      projections.push({
        year,
        conservative: Math.round(conservative * 100) / 100,
        moderate: Math.round(moderate * 100) / 100,
        optimistic: Math.round(optimistic * 100) / 100,
      });
    }

    setResults({
      dcfValue,
      peValue,
      pbValue,
      fcfValue,
      fairValue,
      upside,
      projections,
    });
  };

  const handleInputChange = (field: keyof ValuationInputs, value: string) => {
    setInputs({
      ...inputs,
      [field]: field === 'symbol' ? value : parseFloat(value) || 0,
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-400" />
            Valuation Inputs
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Stock Symbol
              </label>
              <input
                type="text"
                value={inputs.symbol}
                onChange={(e) => handleInputChange('symbol', e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Current Price ($)
              </label>
              <input
                type="number"
                value={inputs.currentPrice}
                onChange={(e) => handleInputChange('currentPrice', e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  EPS ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.eps}
                  onChange={(e) => handleInputChange('eps', e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Book Value ($)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={inputs.bookValue}
                  onChange={(e) => handleInputChange('bookValue', e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Free Cash Flow per Share ($)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.fcf}
                onChange={(e) => handleInputChange('fcf', e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2">
                Expected Growth Rate (%)
              </label>
              <input
                type="number"
                value={inputs.growthRate}
                onChange={(e) => handleInputChange('growthRate', e.target.value)}
                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Discount Rate (%)
                </label>
                <input
                  type="number"
                  value={inputs.discountRate}
                  onChange={(e) => handleInputChange('discountRate', e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm font-semibold mb-2">
                  Terminal Growth (%)
                </label>
                <input
                  type="number"
                  value={inputs.terminalGrowthRate}
                  onChange={(e) => handleInputChange('terminalGrowthRate', e.target.value)}
                  className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={calculateValuation}
              className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 rounded-lg font-bold hover:from-blue-600 hover:to-green-600 transition-all shadow-lg"
            >
              Calculate Intrinsic Value
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              Valuation Results
            </h2>

            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-400 text-sm mb-1">Fair Value (Weighted)</p>
                <p className="text-3xl font-bold text-green-400">
                  ${results.fairValue.toFixed(2)}
                </p>
                <p className={`text-lg font-semibold mt-1 ${
                  results.upside > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {results.upside > 0 ? '+' : ''}{results.upside.toFixed(2)}% from current price
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">DCF Value</p>
                  <p className="text-xl font-bold text-white">
                    ${results.dcfValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">40% weight</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">P/E Value</p>
                  <p className="text-xl font-bold text-white">
                    ${results.peValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">30% weight</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">P/B Value</p>
                  <p className="text-xl font-bold text-white">
                    ${results.pbValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">15% weight</p>
                </div>

                <div className="bg-slate-700 rounded-lg p-3">
                  <p className="text-slate-400 text-xs mb-1">FCF Value</p>
                  <p className="text-xl font-bold text-white">
                    ${results.fcfValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-slate-500">15% weight</p>
                </div>
              </div>

              <div className="bg-blue-900/50 rounded-lg p-4 border border-blue-700">
                <h3 className="text-white font-bold mb-2">Investment Recommendation</h3>
                {results.upside > 30 ? (
                  <p className="text-green-400 text-sm">
                    <strong>STRONG BUY:</strong> Significant upside potential with margin of safety
                  </p>
                ) : results.upside > 15 ? (
                  <p className="text-blue-400 text-sm">
                    <strong>BUY:</strong> Good value with reasonable upside
                  </p>
                ) : results.upside > 0 ? (
                  <p className="text-yellow-400 text-sm">
                    <strong>HOLD:</strong> Fairly valued, limited upside
                  </p>
                ) : (
                  <p className="text-red-400 text-sm">
                    <strong>AVOID:</strong> Overvalued based on fundamentals
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {results && (
        <div className="bg-slate-800 rounded-xl shadow-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            10-Year Price Projections
          </h2>

          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={results.projections}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="year"
                  stroke="#9CA3AF"
                  label={{ value: 'Years', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
                />
                <YAxis
                  stroke="#9CA3AF"
                  label={{ value: 'Price ($)', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="conservative"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  name="Conservative (12% CAGR)"
                />
                <Line
                  type="monotone"
                  dataKey="moderate"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  name="Moderate (18% CAGR)"
                />
                <Line
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Optimistic (25% CAGR)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-yellow-400 font-bold mb-2">Conservative Scenario</h3>
              <p className="text-slate-300 text-sm mb-3">12% annual growth</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">5 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[4].conservative.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">10 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[9].conservative.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-blue-400 font-bold mb-2">Moderate Scenario</h3>
              <p className="text-slate-300 text-sm mb-3">18% annual growth</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">5 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[4].moderate.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">10 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[9].moderate.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-700 rounded-lg p-4">
              <h3 className="text-green-400 font-bold mb-2">Optimistic Scenario</h3>
              <p className="text-slate-300 text-sm mb-3">25% annual growth</p>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">5 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[4].optimistic.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 text-sm">10 Years:</span>
                  <span className="text-white font-semibold">
                    ${results.projections[9].optimistic.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
