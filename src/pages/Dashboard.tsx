import React from 'react';

// Custom Component Imports
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import WatchlistRow from '@/components/WatchlistRow';
import AdvancedInteractiveChart from '@/components/AdvancedInteractiveChart';
import PortfolioCard from '@/components/PortfolioCard';

// shadcn/ui Imports
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// --- Mock Data ---

// Helper function to generate simple sparkline data
const generateSparkline = (isPositive: boolean, points = 30) => {
  const data = [];
  let value = 100;
  for (let i = 0; i < points; i++) {
    const fluctuation = (Math.random() - (isPositive ? 0.45 : 0.55)) * 4;
    value += fluctuation;
    data.push({ time: i, value: Math.max(0, value) }); // Ensure value doesn't go below 0
  }
  return data;
};


const watchlistData = [
  {
    ticker: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 127.08,
    change: 6.12,
    changePercent: 5.06,
    sparklineData: generateSparkline(true),
  },
  {
    ticker: 'TSLA',
    name: 'Tesla, Inc.',
    price: 194.76,
    change: 11.55,
    changePercent: 6.30,
    sparklineData: generateSparkline(true),
  },
  {
    ticker: 'AAPL',
    name: 'Apple Inc.',
    price: 208.14,
    change: -2.51,
    changePercent: -1.19,
    sparklineData: generateSparkline(false),
  },
   {
    ticker: 'MSFT',
    name: 'Microsoft Corporation',
    price: 450.67,
    change: 3.98,
    changePercent: 0.89,
    sparklineData: generateSparkline(true),
  },
  {
    ticker: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 183.22,
    change: -0.89,
    changePercent: -0.48,
    sparklineData: generateSparkline(false),
  },
];

const portfolioData = {
    ticker: "NVDA",
    companyName: "NVIDIA Corporation",
    quantity: 150,
    totalValue: 19062,
    dayChange: 918,
    dayChangePercentage: 5.06,
}

const Dashboard = () => {
  console.log('Dashboard loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <DashboardSidebar />
      <div className="flex flex-col sm:pl-64">
        <Header />
        <main className="flex-1 space-y-8 p-4 pt-20 md:p-8">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Left Column: Portfolio and Watchlist */}
                <div className="lg:col-span-1 flex flex-col gap-8">
                     <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                        <CardHeader>
                            <CardTitle>Portfolio Snapshot</CardTitle>
                            <CardDescription>Your top holding today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <PortfolioCard {...portfolioData} />
                        </CardContent>
                    </Card>

                    <Card className="bg-card/80 backdrop-blur-sm border-border/20 shadow-lg">
                        <CardHeader>
                            <CardTitle>Watchlist</CardTitle>
                            <CardDescription>Your curated list of top stocks.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3">
                            {watchlistData.map((stock) => (
                                <WatchlistRow key={stock.ticker} {...stock} />
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Main Chart */}
                <div className="lg:col-span-2">
                    <AdvancedInteractiveChart />
                </div>
            </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;