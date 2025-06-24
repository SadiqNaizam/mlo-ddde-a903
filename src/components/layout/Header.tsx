import React from 'react';
import { Link } from 'react-router-dom';
import { CandlestickChart, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import GlobalStockTicker from '../GlobalStockTicker';

const Header: React.FC = () => {
  console.log('Header loaded');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b border-neutral-800 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6">
      <div className="flex w-full items-center justify-between gap-4">
        {/* Left Side - Logo and Name (Hidden on small screens, shown in sidebar) */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/" className="flex items-center gap-2">
            <CandlestickChart className="h-6 w-6 text-emerald-400" />
            <span className="font-bold text-lg text-white">Stox</span>
          </Link>
        </div>

        {/* Center - Ticker and Search */}
        <div className="flex-1 flex items-center justify-center gap-4">
            <div className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <GlobalStockTicker />
            </div>
            <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search stocks..."
                    className="w-full rounded-lg bg-neutral-800 pl-8 md:w-[200px] lg:w-[320px] text-white border-neutral-700 focus:border-emerald-400"
                />
            </div>
        </div>

        {/* Right Side - User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full border-2 border-neutral-700 hover:border-emerald-400"
            >
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>
                    <User className="h-5 w-5 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-700 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-neutral-700"/>
            <DropdownMenuItem asChild>
                <Link to="/settingspage">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-neutral-700"/>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;