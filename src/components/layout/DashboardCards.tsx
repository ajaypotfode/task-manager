import { ArrowRight, Calendar, LucideProps, Plus, Zap } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface DashboardCardsProps {
    text: string;
    icon: string;
    route: string;
    color: string;
}

const Icon = ({ iconName, color }: { iconName: string, color: string }) => {
    const iconRef: { [key: string]: React.FC<LucideProps> } = {
        Add: Plus,
        Summary: Zap,
        Calendar: Calendar,
        SeeAll: ArrowRight,
    };

    const IconComponent = iconRef[iconName];

    return (
        <div
            className={`w-12 h-12 flex items-center justify-center rounded-full`}
            style={{
                backgroundColor: `${color}22`,
                boxShadow: `0 0 10px ${color}55`
            }}
        >
            <IconComponent size={28} color={color} />
        </div>
    );
};

const DashboardCards: React.FC<DashboardCardsProps> = ({ icon, route, text, color }) => {
    return (
        <Link href={route || '#'}>
            <div
                className="glass-card w-full aspect-4/3 md:h-40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 rounded-2xl flex flex-col justify-center items-center gap-4 transition-all duration-300 cursor-pointer group border border-white/60 hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
                <Icon iconName={icon} color={color} />

                <h1 className="text-gray-700 font-semibold text-base tracking-tight group-hover:text-violate transition-colors">
                    {text}
                </h1>
            </div>
        </Link>
    );
};

export default DashboardCards;
