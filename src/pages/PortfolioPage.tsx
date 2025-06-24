import React from 'react';
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import AdvancedInteractiveChart from '@/components/AdvancedInteractiveChart';
import PortfolioCard from '@/components/PortfolioCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Mock data for individual holdings
const mockHoldings = [
  {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    quantity: 50,
    totalValue: 10407,
    dayChange: -251.50,
    dayChangePercentage: -1.19,
  },
  {
    ticker: 'NVDA',
    companyName: 'NVIDIA Corporation',
    quantity: 100,
    totalValue: 12708,
    dayChange: 612.00,
    dayChangePercentage: 5.06,
  },
  {
    ticker: 'TSLA',
    companyName: 'Tesla, Inc.',
    quantity: 75,
    totalValue: 14607,
    dayChange: 866.25,
    dayChangePercentage: 6.30,
  },
  {
    ticker: 'GOOGL',
    companyName: 'Alphabet Inc.',
    quantity: 30,
    totalValue: 5496.60,
    dayChange: -26.70,
    dayChangePercentage: -0.48,
  },
  {
    ticker: 'MSFT',
    companyName: 'Microsoft Corporation',
    quantity: 40,
    totalValue: 18026.80,
    dayChange: 159.20,
    dayChangePercentage: 0.89,
  },
];

// Calculate summary statistics from the mock data
const totalPortfolioValue = mockHoldings.reduce((acc, holding) => acc + holding.totalValue, 0);
const totalDayChange = mockHoldings.reduce((acc, holding) => acc + holding.dayChange, 0);
const isTotalPositive = totalDayChange >= 0;

const PortfolioPage = () => {
  console.log('PortfolioPage loaded');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background font-body text-foreground">
      <Header />
      <div className="flex flex-1">
        <DashboardSidebar />
        <main className="flex flex-1 flex-col gap-4 p-4 pt-20 sm:pl-64 md:gap-8 md:p-8">
          
          {/* Page Header */}
          <h1 className="text-4xl font-bold font-heading">My Portfolio</h1>

          {/* Portfolio Summary Card */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-4xl font-bold tracking-tight">
                  {totalPortfolioValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Gain/Loss</p>
                <div className={`flex items-center gap-2 text-3xl font-bold ${isTotalPositive ? 'text-emerald-400' : 'text-red-500'}`}>
                  {isTotalPositive ? <ArrowUp size={28} /> : <ArrowDown size={28} />}
                  <span>{totalDayChange.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historical Performance Chart */}
          <section>
            <h2 className="text-2xl font-bold font-heading mb-4">Historical Performance</h2>
            {/* The AdvancedInteractiveChart can represent the overall portfolio value over time. */}
            <AdvancedInteractiveChart />
          </section>

          {/* Holdings Section */}
          <section>
            <h2 className="text-2xl font-bold font-heading mb-4">Your Holdings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {mockHoldings.map((holding) => (
                <PortfolioCard key={holding.ticker} {...holding} />
              ))}
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default PortfolioPage;