import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioCardProps {
  /** The stock ticker symbol (e.g., AAPL) */
  ticker: string;
  /** The full company name (e.g., Apple Inc.) */
  companyName: string;
  /** The number of shares held */
  quantity: number;
  /** The total current market value of the holding */
  totalValue: number;
  /** The dollar change for the day */
  dayChange: number;
  /** The percentage change for the day */
  dayChangePercentage: number;
}

const PortfolioCard: React.FC<PortfolioCardProps> = ({
  ticker,
  companyName,
  quantity,
  totalValue,
  dayChange,
  dayChangePercentage,
}) => {
  console.log('PortfolioCard loaded for:', ticker);

  const isPositive = dayChange >= 0;

  return (
    <Link to="/stockdetailpage" className="block group" aria-label={`View details for ${ticker}`}>
      {/* Outer container for metallic border and hover glow effect */}
      <div
        className={cn(
          "rounded-2xl p-px bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900",
          "transition-all duration-300",
          "group-hover:shadow-2xl group-hover:shadow-cyan-500/20",
          "group-hover:bg-gradient-to-b group-hover:from-cyan-400/70 group-hover:via-cyan-500/50 group-hover:to-cyan-600/70"
        )}
      >
        {/* Inner container for glassmorphism effect and content */}
        <div className="rounded-[15px] p-5 h-full w-full bg-slate-900/70 backdrop-blur-xl">
          {/* Top Section: Ticker, Name, Quantity */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-2xl font-bold text-white">{ticker}</p>
              <p className="text-sm text-slate-400">{companyName}</p>
            </div>
            <div className="text-right">
              <p className="text-base font-medium text-white">{quantity}</p>
              <p className="text-xs text-slate-400">Shares</p>
            </div>
          </div>

          {/* Middle Section: Total Value */}
          <div className="mb-5 text-center">
            <p className="text-sm text-slate-300 mb-1">Total Value</p>
            <p className="text-4xl font-semibold text-white tracking-tight">
              {totalValue.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
            </p>
          </div>

          {/* Bottom Section: Daily P/L */}
          <div>
            <p className="text-sm text-slate-300 mb-1">Today's P/L</p>
            <div
              className={cn(
                'flex items-center gap-2 text-lg font-medium',
                isPositive ? 'text-emerald-400' : 'text-red-500'
              )}
            >
              {isPositive ? <ArrowUpRight size={20} strokeWidth={2.5}/> : <ArrowDownRight size={20} strokeWidth={2.5}/>}
              <span>
                {isPositive ? '+' : ''}
                {dayChange.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </span>
              <span className="text-base">
                ({isPositive ? '+' : ''}
                {dayChangePercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PortfolioCard;