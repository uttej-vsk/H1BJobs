"use client";

import React, { useState, useEffect } from "react";
import { shareJob } from "@/app/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

function ShareJobForm() {
  const [formData, setFormData] = useState({
    source: "linkedin",
    customSource: "",
    postURL: "",
    hiringManagerProfileURL: "",
    jobTitle: "",
    companyName: "",
    jobType: "",
    recruiterProfileURL: "",
  });

  // Debug log to confirm component mounting
  useEffect(() => {
    console.log("ShareJobForm mounted");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const actualSource =
      formData.source === "other" ? formData.customSource : formData.source;

    const form = new FormData();
    form.append("title", `Job shared from ${actualSource}`);
    form.append("postURL", formData.postURL);
    form.append("source", actualSource);

    form.append(
      "description",
      `This is a job shared from ${actualSource}. Visit the original post for details.`
    );
    form.append("companyName", formData.companyName);
    form.append("applicationURL", formData.postURL);
    form.append("recruiterProfileURL", formData.recruiterProfileURL);
    form.append("hiringManagerProfileURL", formData.hiringManagerProfileURL);
    form.append("jobTitle", formData.jobTitle);
    form.append("jobType", formData.jobType);

    shareJob(form);

    setFormData({
      source: "linkedin",
      customSource: "",
      postURL: "",
      hiringManagerProfileURL: "",
      jobTitle: "",
      companyName: "",
      jobType: "",
      recruiterProfileURL: "",
    });

    toast.success("Job post has been shared successfully");
  };

  return (
    <div className="flex flex-col items-center text-white">
      <p className="text-lg font-medium text-gray-300 mb-6">
        Share a job and help a peer
      </p>

      <Card className="w-full max-w-2xl mx-auto border border-[#1a2b4b] bg-[#071428]">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="source" className="font-medium">
                  Where is this job posted?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <select
                  name="source"
                  id="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="file:text-white placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground bg-[#071428] border-[#1a2b4b] flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
                  required
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="twitter">Twitter</option>
                  <option value="reddit">Reddit</option>
                  <option value="others">Other</option>
                </select>

                {formData.source === "other" && (
                  <div className="mt-3">
                    <label htmlFor="customSource" className="block font-medium">
                      Specify platform <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="customSource"
                      id="customSource"
                      value={formData.customSource}
                      onChange={handleChange}
                      placeholder="e.g. Company website, Monster, etc."
                      className="w-full mt-1"
                      required={formData.source === "other"}
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="postURL" className="font-medium">
                  Post URL <span className="text-red-500">*</span>
                </label>
                <Input
                  name="postURL"
                  id="postURL"
                  type="url"
                  value={formData.postURL}
                  onChange={handleChange}
                  placeholder="Enter the post URL"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="hiringManagerProfileURL"
                  className="font-medium"
                >
                  Hiring Manager Profile URL{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  name="hiringManagerProfileURL"
                  id="hiringManagerProfileURL"
                  type="url"
                  value={formData.hiringManagerProfileURL}
                  onChange={handleChange}
                  placeholder="Enter the hiring manager profile URL"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="jobTitle" className="font-medium">
                  Job Title
                </label>
                <Input
                  name="jobTitle"
                  id="jobTitle"
                  type="text"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter the job title"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="companyName" className="font-medium">
                  Company Name
                </label>
                <Input
                  name="companyName"
                  id="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter the company name"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="jobType" className="font-medium">
                  Job Type
                </label>
                <select
                  name="jobType"
                  id="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  className="file:text-white placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground bg-[#071428] border-[#1a2b4b] flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="recruiterProfileURL" className="font-medium">
                  Recruiter Profile URL
                </label>
                <Input
                  name="recruiterProfileURL"
                  id="recruiterProfileURL"
                  type="url"
                  value={formData.recruiterProfileURL}
                  onChange={handleChange}
                  placeholder="Enter the recruiter profile URL"
                  className="w-full"
                />
              </div>
            </div>
            <Button type="submit" variant="linkedin" className="w-full mt-6">
              Share job
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default ShareJobForm;
