
import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';
import StatsSummary, { StatItem } from '@/components/admin/analytics/StatsSummary';
import TimeRangeSelector from '@/components/admin/analytics/TimeRangeSelector';
import SalesOverviewChart from '@/components/admin/analytics/SalesOverviewChart';
import ProductCategoriesChart from '@/components/admin/analytics/ProductCategoriesChart';
import DailySalesChart from '@/components/admin/analytics/DailySalesChart';
import { 
  getSalesData, 
  getProductCategoryData, 
  getDailySalesData,
  CHART_COLORS
} from '@/components/admin/analytics/AnalyticsData';

const AnalyticsAdmin: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Stats summary
  const stats: StatItem[] = [
    {
      title: "Total Revenue",
      value: "$24,532.95",
      change: "+12.5%",
      icon: <DollarSign className="h-8 w-8 text-green-500" />
    },
    {
      title: "Total Orders",
      value: "235",
      change: "+8.2%",
      icon: <ShoppingBag className="h-8 w-8 text-blue-500" />
    },
    {
      title: "New Customers",
      value: "48",
      change: "+5.7%",
      icon: <Users className="h-8 w-8 text-purple-500" />
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+1.1%",
      icon: <TrendingUp className="h-8 w-8 text-orange-500" />
    }
  ];
  
  // Get data for charts
  const salesData = getSalesData();
  const productCategoryData = getProductCategoryData();
  const dailySalesData = getDailySalesData();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
      </div>
      
      <StatsSummary stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <SalesOverviewChart salesData={salesData} />
        <ProductCategoriesChart 
          categoryData={productCategoryData} 
          colors={CHART_COLORS} 
        />
        <DailySalesChart dailyData={dailySalesData} />
      </div>
    </div>
  );
};

export default AnalyticsAdmin;
