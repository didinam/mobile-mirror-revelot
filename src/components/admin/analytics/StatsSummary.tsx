
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
}

interface StatsSummaryProps {
  stats: StatItem[];
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
                <div className={`text-sm mt-1 ${
                  stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.change} from previous period
                </div>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsSummary;
