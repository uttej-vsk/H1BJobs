"use server";
import { insertDb, getAllJobs as getJobsFromDb } from "@/lib/db";

export async function createJob(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const location = formData.get("location");
  const salary = formData.get("salary");
  const type = formData.get("type");
  const companyName = formData.get("companyName");
  const applicationURL = formData.get("applicationURL");

  console.log({
    title,
    description,
    location,
    salary,
    type,
    companyName,
    applicationURL,
  });

  await insertDb({
    title,
    description,
    location,
    salary,
    type,
    companyName,
    applicationURL,
  });
  // Update data
  // Revalidate cache
}

// Server action to get all jobs
export { getJobsFromDb as getAllJobs };
