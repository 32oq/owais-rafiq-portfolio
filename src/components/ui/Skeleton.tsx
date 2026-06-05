import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("skeleton h-4 w-full", className)} {...props} />;
}

export function SkeletonText({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4", i === lines - 1 && lines > 1 && "w-4/5")}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("card-base p-6 space-y-4", className)}>
      <Skeleton className="h-48 w-full rounded-lg" />
      <Skeleton className="h-5 w-3/4" />
      <SkeletonText lines={3} />
      <div className="flex gap-2">
        <Skeleton className="h-7 w-16 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-14 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonAvatar({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = { sm: "h-8 w-8", md: "h-12 w-12", lg: "h-16 w-16" };
  return <Skeleton className={cn("rounded-full", sizeMap[size])} />;
}
