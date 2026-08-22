import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div aria-hidden className={`animate-pulse rounded-lg bg-neutral-200 ${className}`} />
);

export const ListingCardSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="space-y-3 p-5">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center justify-between border-t border-neutral-100 pt-3.5">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </div>
);

export const ListingGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <ListingCardSkeleton key={i} />
    ))}
  </div>
);
