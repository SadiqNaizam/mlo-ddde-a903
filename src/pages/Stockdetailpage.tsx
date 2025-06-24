import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

// Custom Components
import Header from '@/components/layout/Header';
import DashboardSidebar from '@/components/layout/DashboardSidebar';
import Footer from '@/components/layout/Footer';
import AdvancedInteractiveChart from '@/components/AdvancedInteractiveChart';

// shadcn/ui Components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight } from 'lucide-react';

// Placeholder Data
const keyStats = [
  { metric: 'Market Cap', value: '$2.98T' },
  { metric: 'P/E Ratio (TTM)', value: '30.5' },
  { metric: 'EPS (TTM)', value: '$6.43' },
  { metric: 'Volume', value: '68.2M' },
  { metric: 'Avg. Volume', value: '75.1M' },
  { metric: 'Dividend Yield', value: '0.49%' },
  { metric: 'Beta', value: '1.25' },
  { metric: '52-Week High', value: '$220.20' },
  { metric: '52-Week Low', value: '$164.08' },
];

const newsItems = [
  {
    source: 'Reuters',
    title: 'Apple supplier Foxconn\'s May revenue up 22% on strong AI server demand',
    time: '3 hours ago',
  },
  {
    source: 'Bloomberg',
    title: 'Apple\'s Vision Pro to Launch in New Countries, Including China and Japan',
    time: '8 hours ago',
  },
  {
    source: 'The Verge',
    title: 'A deep dive into the new \'Apple Intelligence\' features coming soon',
    time: '1 day ago',
  },
    {
    source: 'Wall Street Journal',
    title: 'Analysts weigh in on Apple\'s new partnership with OpenAI',
    time: '2 days ago',
  },
];

const StockDetailPage = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [companyName, setCompanyName] = useState('Apple Inc.');
  const location = useLocation();

  useEffect(() => {
    console.log('StockDetailPage loaded');
    if (location.state && location.state.ticker) {
      setTicker(location.state.ticker);
      // In a real app, you would fetch company name based on ticker
      setCompanyName(location.state.ticker === 'AAPL' ? 'Apple Inc.' : 'A Ticker');
    }
  }, [location.state]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <DashboardSidebar />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 sm:pl-72 pt-16">
        <header>
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{ticker}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-heading text-foreground">{companyName} ({ticker})</h1>
                    <p className="text-muted-foreground">NASDAQ</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                    <p className="text-3xl font-bold">$207.15</p>
                    <div className="flex items-center gap-1 text-lg text-emerald-400 font-semibold">
                        <ArrowUpRight className="h-5 w-5"/>
                        <span>+$1.25 (0.61%)</span>
                    </div>
                </div>
            </div>
        </header>

        <AdvancedInteractiveChart />

        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="stats">Key Statistics</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="ratings">Analyst Ratings</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <Card className="bg-card/80 border-border/20">
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    {keyStats.map((stat) => (
                      <TableRow key={stat.metric}>
                        <TableCell className="font-medium text-muted-foreground">{stat.metric}</TableCell>
                        <TableCell className="text-right font-semibold text-foreground">{stat.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card className="bg-card/80 border-border/20">
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((item, index) => (
                    <div key={index} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                      <p className="font-semibold text-foreground hover:text-primary cursor-pointer">{item.title}</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        <span>{item.source}</span> &bull; <span>{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ratings">
            <Card className="bg-card/80 border-border/20">
              <CardHeader>
                <CardTitle>Analyst Ratings</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4 text-center">
                 <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-bold text-accent">8.8</p>
                    <p className="text-xl text-muted-foreground">/ 10</p>
                 </div>
                 <Badge variant="secondary" className="text-lg bg-accent text-accent-foreground">Strong Buy</Badge>
                 <p className="text-muted-foreground">Based on 32 analyst ratings.</p>
                 <div className="flex gap-4 pt-4">
                    <div>
                        <p className="text-2xl font-bold text-emerald-400">25</p>
                        <p className="text-sm text-muted-foreground">Buy</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-foreground">6</p>
                        <p className="text-sm text-muted-foreground">Hold</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold text-destructive">1</p>
                        <p className="text-sm text-muted-foreground">Sell</p>
                    </div>
                 </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <Footer />
      </main>
    </div>
  );
};

export default StockDetailPage;