import React from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';
import clsx from 'clsx';

/**
 * Props for the WatchlistRow component.
 */
interface WatchlistRowProps {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  // An array of data points for the sparkline chart.
  sparklineData: { time: number; value: number }[];
}

/**
 * A component for one row in a watchlist table. Displays ticker, company name,
 * current price, and price/percentage change with color-coding. It includes
 * a micro-chart (sparkline) and a subtle neon glow on hover.
 */
const WatchlistRow: React.FC<WatchlistRowProps> = ({
  ticker,
  name,
  price,
  change,
  changePercent,
  sparklineData,
}) => {
  console.log('WatchlistRow loaded for:', ticker);

  const isPositive = change >= 0;

  // Format numbers for consistent display
  const formattedPrice = price.toFixed(2);
  const formattedChange = (isPositive ? '+' : '') + change.toFixed(2);
  const formattedChangePercent = `(${(isPositive ? '+' : '')}${changePercent.toFixed(2)}%)`;

  // Define neon glow effect for hover state based on performance
  const hoverGlowClass = isPositive
    ? 'hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]' // Neon Green
    : 'hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]'; // Neon Red

  return (
    <Link
      to="/stockdetailpage"
      state={{ ticker: ticker }} // Pass ticker via state for the detail page to use
      className={clsx(
        'grid grid-cols-12 items-center gap-4 px-4 py-3 rounded-lg border border-transparent',
        'transition-all duration-300 ease-in-out',
        'bg-gray-900/50 hover:bg-gray-800/70',
        hoverGlowClass
      )}
      aria-label={`View details for ${name}`}
    >
      {/* Ticker and Company Name (4/12 columns) */}
      <div className="col-span-12 md:col-span-4 flex flex-col">
        <p className="font-bold text-lg text-white">{ticker}</p>
        <p className="text-sm text-gray-400 truncate">{name}</p>
      </div>

      {/* Sparkline Chart (3/12 columns) */}
      <div className="col-span-12 md:col-span-3 h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={isPositive ? '#22c55e' /* green-500 */ : '#ef4444' /* red-500 */}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false} // Recommended for performance in lists
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Price and Change Data (5/12 columns) */}
      <div className="col-span-12 md:col-span-5 flex flex-col items-start md:items-end">
        <p className="font-semibold text-lg text-white">${formattedPrice}</p>
        <div className={clsx(
            'flex items-center gap-2 text-md font-medium',
            isPositive ? 'text-green-500' : 'text-red-500'
        )}>
          {isPositive ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
          <span>{formattedChange}</span>
          <span>{formattedChangePercent}</span>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistRow;