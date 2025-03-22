"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostJobForm from "./PostJobForm";
import ShareJobForm from "./ShareJobForm";

export function TogglePostJobs() {
  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto">
        <Tabs defaultValue="post-job" className="w-full">
          <div className="px-6 md:px-20 lg:px-50 mb-10">
            <TabsList className="w-full grid grid-cols-2 p-[2px] rounded-md h-[42px] bg-[#101827] border border-[#1f2a3c]">
              <TabsTrigger
                value="post-job"
                className="relative rounded-sm text-sm font-medium tracking-wide
                  data-[state=active]:bg-[#162744] 
                  data-[state=active]:text-white
                  data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.1)]
                  data-[state=inactive]:bg-transparent
                  data-[state=inactive]:text-slate-400
                  transition-all duration-150 ease-in-out focus:outline-none"
              >
                Post a Job
              </TabsTrigger>
              <TabsTrigger
                value="share-job"
                className="relative rounded-sm text-sm font-medium tracking-wide
                  data-[state=active]:bg-[#162744]
                  data-[state=active]:text-white
                  data-[state=active]:shadow-[0_0_10px_rgba(59,130,246,0.1)]
                  data-[state=inactive]:bg-transparent
                  data-[state=inactive]:text-slate-400
                  transition-all duration-150 ease-in-out focus:outline-none"
              >
                Share a Job
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="px-4 md:px-0">
            <TabsContent value="post-job" className="focus:outline-none">
              <PostJobForm />
            </TabsContent>
            <TabsContent value="share-job" className="focus:outline-none">
              <ShareJobForm />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
