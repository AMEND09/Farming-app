import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Card = ({ children, className = '' }) => (
  <div className={`p-4 rounded-lg border border-gray-200 bg-white ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, className = '' }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 ${className}`}
  >
    {children}
  </button>
);

const FarmDashboard = () => {
  // Same state management as before
  const [metrics, setMetrics] = useState({
    waterUsage: [
      { month: 'Jan', usage: 2500 },
      { month: 'Feb', usage: 2700 },
      { month: 'Mar', usage: 3000 },
    ],
    fertilizer: [
      { month: 'Jan', amount: 150 },
      { month: 'Feb', amount: 180 },
      { month: 'Mar', amount: 200 },
    ],
    yields: [
      { month: 'Jan', amount: 1200 },
      { month: 'Feb', amount: 1400 },
      { month: 'Mar', amount: 1600 },
    ]
  });

  const [weather] = useState({
    temp: 72,
    condition: 'Sunny',
    humidity: 45,
    forecast: 'Clear skies expected for the next 3 days. Consider irrigation.'
  });

  const [sustainabilityScore] = useState(85);
  const [showForm, setShowForm] = useState('');

  const handleSubmit = (type, data) => {
    console.log(`Submitting ${type} data:`, data);
    setShowForm('');
  };

  const DataForm = ({ type, onSubmit }) => (
    <div className="p-4 border rounded-lg bg-white">
      <h3 className="text-lg font-semibold mb-4">Add {type} Data</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input type="date" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input type="number" className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes</label>
          <input type="text" className="w-full p-2 border rounded" />
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => onSubmit({ type, date: new Date() })}>Submit</Button>
          <button
            onClick={() => setShowForm('')}
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Weather Card */}
        <Card>
          <div className="text-sm font-medium text-gray-600">Weather</div>
          <div className="text-2xl font-bold">{weather.temp}°F</div>
          <div className="text-sm text-gray-500">
            {weather.condition}, {weather.humidity}% Humidity
          </div>
        </Card>

        {/* Sustainability Score */}
        <Card>
          <div className="text-sm font-medium text-gray-600">Sustainability Score</div>
          <div className="text-2xl font-bold">{sustainabilityScore}/100</div>
          <div className="text-sm text-gray-500">
            Based on resource efficiency
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="col-span-2">
          <div className="text-sm font-medium text-gray-600 mb-3">Quick Actions</div>
          <div className="flex gap-2">
            <Button onClick={() => setShowForm('water')}>Log Water</Button>
            <Button onClick={() => setShowForm('fertilizer')}>Log Fertilizer</Button>
            <Button onClick={() => setShowForm('yield')}>Log Yield</Button>
          </div>
        </Card>
      </div>

      {/* Form Display Area */}
      {showForm && (
        <Card className="mb-6">
          <DataForm type={showForm} onSubmit={handleSubmit} />
        </Card>
      )}

      {/* Metrics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h3 className="text-lg font-semibold mb-4">Water Usage Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.waterUsage}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="usage" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold mb-4">Crop Yields</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metrics.yields}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#16a34a" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FarmDashboard;