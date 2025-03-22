"use client";

import React, { useState } from "react";
import { createJob } from "@/app/actions";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";

function PostJobForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    type: "",
    companyName: "",
    applicationURL: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value as string);
    });

    createJob(form);

    setFormData({
      title: "",
      description: "",
      location: "",
      salary: "",
      type: "",
      companyName: "",
      applicationURL: "",
    });

    toast.success("Your job has been created successfully");
  };

  return (
    <div className="flex flex-col items-center text-white">
      <p className="text-lg font-medium text-gray-300 mb-6">
        Help us find a suitable candidate for you
      </p>

      <Card className="w-full max-w-2xl mx-auto border border-[#1a2b4b] bg-[#071428]">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-medium">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange(e)}
                  placeholder="Eg. Software Engineer"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="location" className="font-medium">
                  Job location
                </label>
                <Input
                  name="location"
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange(e)}
                  placeholder="Eg. Chicago, IL"
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="salary" className="font-medium">
                  Salary
                </label>
                <Input
                  name="salary"
                  id="salary"
                  value={formData.salary}
                  onChange={(e) => handleChange(e)}
                  placeholder="Eg. $100,000"
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="type" className="font-medium">
                  Type of Job
                </label>
                <select
                  name="type"
                  id="type"
                  value={formData.type}
                  onChange={(e) => handleChange(e)}
                  className="file:text-white placeholder:text-gray-500 selection:bg-primary selection:text-primary-foreground bg-[#071428] border-[#1a2b4b] flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
                >
                  <option value="">Select Job Type</option>
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="companyName" className="font-medium">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <Input
                  name="companyName"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Eg. Google"
                  className="w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="applicationURL" className="font-medium">
                  Application URL <span className="text-red-500">*</span>
                </label>
                <Input
                  name="applicationURL"
                  id="applicationURL"
                  value={formData.applicationURL}
                  onChange={(e) => handleChange(e)}
                  placeholder="Application URL"
                  className="w-full"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <label htmlFor="description" className="font-medium">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={(e) => handleChange(e)}
                placeholder="Eg. We are looking for a software engineer with 3 years of experience in React and Node.js"
                className="file:text-white placeholder:text-gray-500 bg-[#071428] border-[#1a2b4b] flex w-full min-w-0 rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-white"
                rows={10}
                required
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" variant="linkedin" className="w-full">
                Post job
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PostJobForm;
