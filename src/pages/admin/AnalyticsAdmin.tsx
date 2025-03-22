
import React, { useState } from 'react';
import { DollarSign, ShoppingBag, Users, TrendingUp, ArrowUpRight, Clock, PercentIcon } from 'lucide-react';
import StatsSummary, { StatItem } from '@/components/admin/analytics/StatsSummary';
import TimeRangeSelector from '@/components/admin/analytics/TimeRangeSelector';
import SalesOverviewChart from '@/components/admin/analytics/SalesOverviewChart';
import ProductCategoriesChart from '@/components/admin/analytics/ProductCategoriesChart';
import DailySalesChart from '@/components/admin/analytics/DailySalesChart';
import SalesReportChart from '@/components/admin/analytics/SalesReportChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  getSalesData, 
  getProductCategoryData, 
  getDailySalesData,
  getRevenueBySalesChannel,
  getTopProducts,
  CHART_COLORS,
  getCustomerAcquisitionData
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

  // Additional KPIs
  const additionalStats: StatItem[] = [
    {
      title: "Average Order Value",
      value: "$104.39",
      change: "+3.2%",
      icon: <ArrowUpRight className="h-8 w-8 text-emerald-500" />
    },
    {
      title: "Repeat Purchase Rate",
      value: "27.5%",
      change: "+2.1%",
      icon: <PercentIcon className="h-8 w-8 text-indigo-500" />
    },
    {
      title: "Avg. Time on Site",
      value: "4m 23s",
      change: "+0.8%",
      icon: <Clock className="h-8 w-8 text-amber-500" />
    }
  ];
  
  // Get data for charts
  const salesData = getSalesData();
  const productCategoryData = getProductCategoryData();
  const dailySalesData = getDailySalesData();
  const topProducts = getTopProducts();
  const customerAcquisition = getCustomerAcquisitionData();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <TimeRangeSelector value={timeRange} onValueChange={setTimeRange} />
      </div>
      
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-6">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="sales">Sales Reports</TabsTrigger>
          <TabsTrigger value="customers">Customer Analytics</TabsTrigger>
          <TabsTrigger value="products">Product Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard">
          <StatsSummary stats={stats} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalesOverviewChart salesData={salesData} />
            <ProductCategoriesChart 
              categoryData={productCategoryData} 
              colors={CHART_COLORS} 
            />
            <DailySalesChart dailyData={dailySalesData} />
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <StatsSummary stats={[...stats, ...additionalStats]} />
          
          <div className="mb-8">
            <SalesReportChart />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Best performing products by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">Units Sold</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-right">{product.sales}</TableCell>
                        <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales Trends</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average items per order</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">2.4</span>
                      <span className="text-xs text-green-500">+0.3</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Cart abandonment rate</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">68.2%</span>
                      <span className="text-xs text-red-500">+2.1%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Purchase conversion rate</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">3.2%</span>
                      <span className="text-xs text-green-500">+0.5%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Year over year growth</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">24.3%</span>
                      <span className="text-xs text-green-500">+5.7%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Promotion redemption rate</span>
                    <div className="flex items-center">
                      <span className="font-bold mr-2">32.5%</span>
                      <span className="text-xs text-green-500">+7.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Acquisition</CardTitle>
                <CardDescription>How customers find your store</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {customerAcquisition.map((source, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full" 
                            style={{ 
                              width: `${source.value}%`, 
                              backgroundColor: CHART_COLORS[index % CHART_COLORS.length] 
                            }} 
                          />
                        </div>
                        <span className="text-xs font-medium">{source.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Retention</CardTitle>
                <CardDescription>Repeat purchase patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">First-time customers</span>
                    <span className="font-bold">72.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Returning customers</span>
                    <span className="font-bold">27.5%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average purchases per customer</span>
                    <span className="font-bold">1.4</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Customer lifetime value</span>
                    <span className="font-bold">$247.50</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Demographics</CardTitle>
                <CardDescription>Customer age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">18-24</span>
                      <span className="text-xs">12%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '12%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">25-34</span>
                      <span className="text-xs">38%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '38%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">35-44</span>
                      <span className="text-xs">27%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '27%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">45-54</span>
                      <span className="text-xs">15%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '15%' }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">55+</span>
                      <span className="text-xs">8%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '8%' }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Product Categories</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductCategoriesChart 
                  categoryData={productCategoryData} 
                  colors={CHART_COLORS} 
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
                <CardDescription>Current inventory levels</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead className="text-right">In Stock</TableHead>
                      <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Classic Chronograph</TableCell>
                      <TableCell className="text-right">24</TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Good</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Diver Watch</TableCell>
                      <TableCell className="text-right">8</TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded text-xs bg-yellow-100 text-yellow-800">Low</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Minimalist Watch</TableCell>
                      <TableCell className="text-right">16</TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Good</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Bamboo Leather Strap</TableCell>
                      <TableCell className="text-right">3</TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded text-xs bg-red-100 text-red-800">Critical</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rose Gold Case</TableCell>
                      <TableCell className="text-right">12</TableCell>
                      <TableCell className="text-right">
                        <span className="px-2 py-1 rounded text-xs bg-green-100 text-green-800">Good</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsAdmin;
