
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { CHART_COLORS } from '@/components/admin/analytics/AnalyticsData';

// Sample data - in a real app, this would come from your API
const revenueBySalesChannel = [
  { name: 'Online Store', value: 4800 },
  { name: 'Mobile App', value: 3200 },
  { name: 'Marketplace', value: 2400 },
  { name: 'Social Media', value: 1800 }
];

const topProducts = [
  { name: 'Classic Chronograph', sales: 84, revenue: 16800 },
  { name: 'Diver Watch', sales: 65, revenue: 11050 },
  { name: 'Minimalist Watch', sales: 59, revenue: 7670 },
  { name: 'Bamboo Leather Strap', sales: 42, revenue: 2100 },
  { name: 'Rose Gold Case', sales: 32, revenue: 1920 }
];

const monthlySalesData = [
  { name: 'Jan', revenue: 4500, orders: 45 },
  { name: 'Feb', revenue: 5200, orders: 52 },
  { name: 'Mar', revenue: 6100, orders: 57 },
  { name: 'Apr', revenue: 7800, orders: 72 },
  { name: 'May', revenue: 8500, orders: 83 },
  { name: 'Jun', revenue: 9200, orders: 89 },
  { name: 'Jul', revenue: 10800, orders: 101 },
  { name: 'Aug', revenue: 11200, orders: 107 },
  { name: 'Sep', revenue: 10500, orders: 98 },
  { name: 'Oct', revenue: 9800, orders: 92 },
  { name: 'Nov', revenue: 11400, orders: 112 },
  { name: 'Dec', revenue: 13200, orders: 131 }
];

const dailySalesData = [
  { name: 'Mon', revenue: 1500, orders: 15 },
  { name: 'Tue', revenue: 1350, orders: 12 },
  { name: 'Wed', revenue: 1780, orders: 18 },
  { name: 'Thu', revenue: 2100, orders: 22 },
  { name: 'Fri', revenue: 2400, orders: 25 },
  { name: 'Sat', revenue: 1950, orders: 19 },
  { name: 'Sun', revenue: 1690, orders: 16 }
];

const salesByCategory = [
  { name: 'Watches', value: 70 },
  { name: 'Straps', value: 15 },
  { name: 'Accessories', value: 10 },
  { name: 'Gift Cards', value: 5 }
];

const SalesReportChart: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('month');
  const [chartType, setChartType] = useState('revenue');
  
  const data = timePeriod === 'week' ? dailySalesData : monthlySalesData;
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Sales Report</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Chart Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="orders">Orders</SelectItem>
              <SelectItem value="channels">Channels</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="categories">Categories</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={timePeriod} onValueChange={setTimePeriod}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          {chartType === 'revenue' && (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  name="Revenue ($)" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'orders' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" name="Number of Orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'channels' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueBySalesChannel}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueBySalesChannel.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'products' && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topProducts}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip formatter={(value, name) => [
                  name === 'revenue' ? `$${value}` : value,
                  name === 'revenue' ? 'Revenue' : 'Units Sold'
                ]} />
                <Legend />
                <Bar dataKey="revenue" name="Revenue ($)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          )}
          
          {chartType === 'categories' && (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesReportChart;
