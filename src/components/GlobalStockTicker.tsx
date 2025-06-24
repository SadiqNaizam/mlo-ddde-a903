import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';

type TickerItemData = {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  isUp: boolean;
};

// Mock data representing major indices and popular stocks
const tickerData: TickerItemData[] = [
  { symbol: 'SPX', price: '5,467.89', change: '+21.43', changePercent: '(+0.39%)', isUp: true },
  { symbol: 'NDQ', price: '19,700.43', change: '+18.88', changePercent: '(+0.10%)', isUp: true },
  { symbol: 'DJI', price: '39,150.33', change: '-61.82', changePercent: '(-0.16%)', isUp: false },
  { symbol: 'AAPL', price: '208.14', change: '-2.51', changePercent: '(-1.19%)', isUp: false },
  { symbol: 'MSFT', price: '450.67', change: '+3.98', changePercent: '(+0.89%)', isUp: true },
  { symbol: 'NVDA', price: '127.08', change: '+6.12', changePercent: '(+5.06%)', isUp: true },
  { symbol: 'GOOGL', price: '183.22', change: '-0.89', changePercent: '(-0.48%)', isUp: false },
  { symbol: 'TSLA', price: '194.76', change: '+11.55', changePercent: '(+6.30%)', isUp: true },
];

const TickerItem: React.FC<{ item: TickerItemData }> = ({ item }) => {
  const colorClass = item.isUp ? 'text-emerald-400' : 'text-red-500';
  const glowClass = item.isUp ? 'drop-shadow-[0_0_3px_rgba(16,185,129,0.5)]' : 'drop-shadow-[0_0_3px_rgba(239,68,68,0.5)]';

  return (
    <div className="flex items-center flex-shrink-0 mx-6">
      <span className="text-sm font-bold text-neutral-300 tracking-wider">{item.symbol}</span>
      <span className="ml-4 text-sm font-medium text-white">{item.price}</span>
      <div className={`ml-3 flex items-center text-xs font-semibold ${colorClass} ${glowClass}`}>
        {item.isUp ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
        <span>{item.change}</span>
        <span className="ml-2">{item.changePercent}</span>
      </div>
    </div>
  );
};

const GlobalStockTicker: React.FC = () => {
  console.log('GlobalStockTicker loaded');

  // Duplicate the data to create a seamless loop
  const duplicatedData = [...tickerData, ...tickerData, ...tickerData, ...tickerData];

  return (
    <div className="w-full bg-neutral-900/50 backdrop-blur-sm border-y border-neutral-800 py-2.5 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: '-50%' }}
        transition={{
          x: {
            duration: 60, // Slower, more elegant speed
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          },
        }}
      >
        {duplicatedData.map((item, index) => (
          <React.Fragment key={index}>
            <TickerItem item={item} />
            <div className="border-l border-neutral-700 h-6 self-center" />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};

export default GlobalStockTicker;