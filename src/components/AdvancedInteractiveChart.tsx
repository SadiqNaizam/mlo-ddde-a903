import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LineChart, BarChart, Candlestick, Waves, LayoutGrid } from 'lucide-react';
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// --- Mock Data Generation ---
// In a real application, this data would come from an API.
const generateMockStockData = () => {
  const data = [];
  let lastClose = 150;
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 2);

  for (let i = 0; i < 730; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const open = lastClose + (Math.random() - 0.5) * 5;
    const close = open + (Math.random() - 0.5) * 8;
    const high = Math.max(open, close) + Math.random() * 4;
    const low = Math.min(open, close) - Math.random() * 4;
    lastClose = close;

    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
    });
  }
  return data;
};

const mockStockData = generateMockStockData();

// --- Component Definition ---
type ChartType = 'line' | 'candlestick' | 'surface' | 'heatmap';
type Timeframe = '1M' | '6M' | '1Y' | 'ALL';

export const AdvancedInteractiveChart: React.FC = () => {
  console.log('AdvancedInteractiveChart loaded');
  const [chartType, setChartType] = useState<ChartType>('line');
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');

  const filteredData = useMemo(() => {
    const now = new Date();
    let daysToFilter;
    switch (timeframe) {
      case '1M':
        daysToFilter = 30;
        break;
      case '6M':
        daysToFilter = 180;
        break;
      case '1Y':
        daysToFilter = 365;
        break;
      case 'ALL':
      default:
        return mockStockData;
    }
    return mockStockData.slice(-daysToFilter);
  }, [timeframe]);

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <motion.div key="line" variants={chartVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
                  content={<ChartTooltipContent indicator="dot" labelClassName="text-background" className="bg-foreground" />}
                />
                <Legend />
                <Line type="monotone" dataKey="close" name="Close Price" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </motion.div>
        );
      case 'candlestick':
        // NOTE: Recharts doesn't have a native candlestick. This is a placeholder using another line chart.
        // A real implementation would use a different library or custom SVG rendering.
        return (
          <motion.div key="candlestick" variants={chartVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-full">
            <ResponsiveContainer width="100%" height={400}>
              <RechartsLineChart data={filteredData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted-foreground) / 0.2)" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={['dataMin - 10', 'dataMax + 10']} tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={{ stroke: 'hsl(var(--primary-foreground))', strokeWidth: 1, strokeDasharray: '5 5' }}
                  content={<ChartTooltipContent indicator="line" labelClassName="text-background" className="bg-foreground" />}
                />
                <Legend />
                <Line type="monotone" dataKey="high" name="High" stroke="hsl(120 60% 50%)" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="low" name="Low" stroke="hsl(0 70% 50%)" strokeWidth={1} dot={false} />
              </RechartsLineChart>
            </ResponsiveContainer>
          </motion.div>
        );
      case 'surface':
        // Placeholder for 3D Surface Plot
        return (
          <motion.div key="surface" variants={chartVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-[400px] flex items-center justify-center p-4">
             <div className="text-center">
                <Waves className="w-16 h-16 mx-auto text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Volatility Surface</h3>
                <p className="text-muted-foreground">3D visualization is in development.</p>
             </div>
          </motion.div>
        );
      case 'heatmap':
        // Placeholder for Correlation Heatmap
        return (
          <motion.div key="heatmap" variants={chartVariants} initial="hidden" animate="visible" exit="exit" className="w-full h-[400px] flex items-center justify-center p-4">
             <div className="text-center">
                <LayoutGrid className="w-16 h-16 mx-auto text-primary" />
                <h3 className="mt-4 text-xl font-semibold">Correlation Heatmap</h3>
                <p className="text-muted-foreground">Heatmap visualization is in development.</p>
             </div>
          </motion.div>
        );
    }
  };

  return (
    <Card className="w-full bg-card/80 backdrop-blur-sm border-border/20 shadow-xl">
      <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <CardTitle className="text-2xl font-bold">Price Action</CardTitle>
          <CardDescription>Interactive chart for AAPL</CardDescription>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <ToggleGroup type="single" value={timeframe} onValueChange={(value: Timeframe) => value && setTimeframe(value)} variant="outline" size="sm">
            <ToggleGroupItem value="1M" aria-label="1 Month">1M</ToggleGroupItem>
            <ToggleGroupItem value="6M" aria-label="6 Months">6M</ToggleGroupItem>
            <ToggleGroupItem value="1Y" aria-label="1 Year">1Y</ToggleGroupItem>
            <ToggleGroupItem value="ALL" aria-label="All time">ALL</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent className="relative">
         <div className="absolute top-0 left-4 z-10">
            <ToggleGroup type="single" value={chartType} onValueChange={(value: ChartType) => value && setChartType(value)} variant="outline" size="sm">
                <ToggleGroupItem value="line" aria-label="Line chart"><LineChart className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="candlestick" aria-label="Candlestick chart"><BarChart className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="surface" aria-label="3D Surface plot"><Waves className="h-4 w-4" /></ToggleGroupItem>
                <ToggleGroupItem value="heatmap" aria-label="Heatmap"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
        </div>
        <ChartContainer config={{}} className="w-full">
            <AnimatePresence mode="wait">
                {renderChart()}
            </AnimatePresence>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AdvancedInteractiveChart;