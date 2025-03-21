"use client";

import React, { useState, useEffect } from "react";
import { shareJob } from "@/app/actions";
import { toast } from "sonner";

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
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold">Share a job and help a peer</h1>

      <div className="w-full max-w-2xl mx-auto border-2 border-gray-300 rounded-lg p-6 mt-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3 flex flex-col gap-2 mb-4">
              <label htmlFor="source" className="block font-medium">
                Where is this job posted?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="source"
                id="source"
                value={formData.source}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
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
                  <input
                    name="customSource"
                    id="customSource"
                    value={formData.customSource}
                    onChange={handleChange}
                    placeholder="e.g. Company website, Monster, etc."
                    className="w-full border-2 border-gray-300 rounded-lg p-2.5 mt-1"
                    required={formData.source === "other"}
                  />
                </div>
              )}
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label htmlFor="postURL" className="block font-medium">
                Post URL <span className="text-red-500">*</span>
              </label>
              <input
                name="postURL"
                id="postURL"
                type="url"
                value={formData.postURL}
                onChange={handleChange}
                placeholder="Enter the post URL"
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
                required
              />
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label
                htmlFor="hiring-manager-profile"
                className="block font-medium"
              >
                Hiring Manager Profile URL{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                name="hiringManagerProfileURL"
                id="hiringManagerProfileURL"
                type="url"
                value={formData.hiringManagerProfileURL}
                onChange={handleChange}
                placeholder="Enter the hiring manager profile URL"
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
                required
              />
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label htmlFor="jobTitle" className="block font-medium">
                Job Title
              </label>
              <input
                name="jobTitle"
                id="jobTitle"
                type="text"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter the job title"
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label htmlFor="companyName" className="block font-medium">
                Company Name
              </label>
              <input
                name="companyName"
                id="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter the company name"
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
              />
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label htmlFor="jobType" className="block font-medium">
                Job Type
              </label>
              <select
                name="jobType"
                id="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
              >
                <option value="full-time">Full-Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="space-y-3 flex flex-col gap-2">
              <label
                htmlFor="recruiterProfileURL"
                className="block font-medium"
              >
                Recruiter Profile URL
              </label>
              <input
                name="recruiterProfileURL"
                id="recruiterProfileURL"
                type="url"
                value={formData.recruiterProfileURL}
                onChange={handleChange}
                placeholder="Enter the recruiter profile URL"
                className="w-full border-2 border-gray-300 rounded-lg p-2.5"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 mx-auto rounded-lg hover:bg-blue-600 transition-colors"
          >
            Share job
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShareJobForm;
