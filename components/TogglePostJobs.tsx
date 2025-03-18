"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostJobForm from "./PostJobForm";
import ShareJobForm from "./ShareJobForm";
export function TogglePostJobs() {
  return (
    <Tabs defaultValue="post-job" className="w-full">
      <TabsList className="grid w-1/4 grid-cols-2 mx-auto">
        <TabsTrigger
          value="post-job"
          className="data-[state=active]:bg-blue-100
           data-[state=active]:text-black
          data-[state=inactive]:bg-white-transparent
          data-[state=inactive]:text-blue-800 transition-colors"
        >
          Post a Job
        </TabsTrigger>
        <TabsTrigger
          value="share-job"
          className="data-[state=active]:bg-blue-100
           data-[state=active]:text-black
            data-[state=inactive]:bg-white-transparent
             data-[state=inactive]:text-blue-800 transition-colors"
        >
          Share a Job
        </TabsTrigger>
      </TabsList>
      <TabsContent value="post-job">
        <PostJobForm />
      </TabsContent>
      <TabsContent value="share-job">
        <ShareJobForm />
      </TabsContent>
    </Tabs>
  );
}
