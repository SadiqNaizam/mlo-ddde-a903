import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Wallet, Settings, CandlestickChart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


const DashboardSidebar: React.FC = () => {
    console.log('DashboardSidebar loaded');

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary-foreground hover:bg-neutral-800",
            isActive && "bg-neutral-800 text-emerald-400"
        );

    const navItems = [
        { to: "/", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/portfoliopage", icon: Wallet, label: "Portfolio" },
        { to: "/settingspage", icon: Settings, label: "Settings" },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-neutral-800 bg-background pt-16 sm:flex">
             <div className="flex h-16 items-center border-b border-neutral-800 px-6 md:hidden">
                <Link to="/" className="flex items-center gap-2 font-semibold text-white">
                    <CandlestickChart className="h-6 w-6 text-emerald-400" />
                    <span>Stox</span>
                </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.to === "/"}
                        className={navLinkClass}
                    >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default DashboardSidebar;