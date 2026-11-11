export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 animate-pulse flex flex-col justify-between">
      <div>
        <div className="w-full aspect-square bg-slate-100 dark:bg-slate-800 rounded-xl mb-4" />
        <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mb-2" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-1.5" />
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3 mb-3" />
      </div>
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
        <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}
