
import React from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const StatsCard = ({ title, value, icon, description, trend, className }: StatsCardProps) => {
  return (
    <div className={cn("dashboard-section", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
          {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
          {trend && (
            <div className="flex items-center mt-2 text-sm">
              <span className={cn(
                trend.isPositive ? "text-green-500" : "text-red-500",
                "font-medium"
              )}>
                {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
              </span>
              <span className="ml-1 text-muted-foreground">vs mes anterior</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
