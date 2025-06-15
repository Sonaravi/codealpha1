import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, ComposedChart, Bar } from 'recharts';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const stockData = [
  { date: '2024-01', AAPL: 150, GOOGL: 2800, MSFT: 300, volume: 45000000 },
  { date: '2024-02', AAPL: 155, GOOGL: 2750, MSFT: 310, volume: 52000000 },
  { date: '2024-03', AAPL: 148, GOOGL: 2900, MSFT: 305, volume: 48000000 },
  { date: '2024-04', AAPL: 162, GOOGL: 2950, MSFT: 320, volume: 55000000 },
  { date: '2024-05', AAPL: 158, GOOGL: 2850, MSFT: 315, volume: 50000000 },
  { date: '2024-06', AAPL: 165, GOOGL: 3000, MSFT: 325, volume: 58000000 },
];

const volatilityData = [
  { date: '2024-01', volatility: 0.25 },
  { date: '2024-02', volatility: 0.32 },
  { date: '2024-03', volatility: 0.28 },
  { date: '2024-04', volatility: 0.35 },
  { date: '2024-05', volatility: 0.30 },
  { date: '2024-06', volatility: 0.27 },
];

const StockCharts = () => {
  const [activeChart, setActiveChart] = useState('prices');

  return (
    <div className="space-y-6">
      <div className="flex gap-2 mb-4">
        <Button 
          variant={activeChart === 'prices' ? 'default' : 'outline'}
          onClick={() => setActiveChart('prices')}
        >
          Stock Prices
        </Button>
        <Button 
          variant={activeChart === 'volume' ? 'default' : 'outline'}
          onClick={() => setActiveChart('volume')}
        >
          Price & Volume
        </Button>
        <Button 
          variant={activeChart === 'volatility' ? 'default' : 'outline'}
          onClick={() => setActiveChart('volatility')}
        >
          Volatility
        </Button>
      </div>

      {activeChart === 'prices' && (
        <div className="h-96">
          <h3 className="text-lg font-semibold mb-4">Tech Stock Price Movements</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value, name) => [$${value}, name]} />
              <Legend />
              <Line type="monotone" dataKey="AAPL" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="GOOGL" stroke="#82ca9d" strokeWidth={2} />
              <Line type="monotone" dataKey="MSFT" stroke="#ffc658" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeChart === 'volume' && (
        <div className="h-96">
          <h3 className="text-lg font-semibold mb-4">Apple Stock Price with Trading Volume</h3>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="right" dataKey="volume" fill="#8884d8" opacity={0.3} name="Volume" />
              <Line yAxisId="left" type="monotone" dataKey="AAPL" stroke="#ff7300" strokeWidth={3} name="AAPL Price" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      {activeChart === 'volatility' && (
        <div className="h-96">
          <h3 className="text-lg font-semibold mb-4">Market Volatility Index</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={volatilityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => [${(Number(value) * 100).toFixed(1)}%, 'Volatility']} />
              <Area type="monotone" dataKey="volatility" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default StockCharts;
