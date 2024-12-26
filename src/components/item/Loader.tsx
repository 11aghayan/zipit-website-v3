import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";


export default function Loader() {
  
  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-1 flex-col md:flex-row gap-6">
          <section className="w-full max-w-sm space-y-2">
            <Skeleton className="w-full aspect-square rounded-md" />
            <div className="flex gap-1 flex-wrap">
              {
                new Array(4).fill(1).map((val, i) => (
                  <Skeleton 
                    key={val + i}
                    className="w-full rounded-md max-w-20 aspect-square"
                  />
                ))
              }
            </div>
          </section>
          <section className="flex flex-col gap-2 w-full">
            <Skeleton className="h-9" />
            <>
              <div className="space-y-1">
                <Skeleton className="h-3 w-32" />
                <Skeleton className="h-5 w-60" />
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-6 w-52" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-6 w-52" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-6 w-52" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-6 w-52" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-6 w-52" />
                </div>
              </div>
            </>
            <div className="flex justify-start mt-2">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex gap-2 w-full">
                  <Skeleton className="w-1/3 h-9" />
                  <Skeleton className="w-full" />
                  <Skeleton className="w-1/3 h-9" />
                </div>
                <Skeleton className="w-full h-9" />
              </div>
            </div>
          </section>
        </div>
        <section className="xl:flex-1 border-t sm:border-t-0 sm:border-l sm:mt-0 sm:pl-3">
          <Skeleton className="w-full h-full" />
        </section>
      </div>
    </div>
  );
}