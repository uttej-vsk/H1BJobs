"use client";

import React, { useState } from "react";
import { createJob } from "@/app/actions";
import { toast } from "sonner";

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
    <div className="flex flex-col items-center">
      <h1 className="text-sm font-bold">
        Help us find a suitable candidate for you
      </h1>

      <div className="flex w-full max-w-2xl my-6 mx-auto justify-center border-2 border-gray-300 rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="title">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange(e)}
                placeholder="Eg. Software Engineer"
                className="border-2 border-gray-300 rounded-lg p-2 w-[300px]"
                required
              />
            </div>

            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="location">Job location</label>
              <input
                name="location"
                id="location"
                value={formData.location}
                onChange={(e) => handleChange(e)}
                placeholder="Eg. Chicago, IL"
                type="text"
                className="border-2 border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="salary">Salary</label>
              <input
                name="salary"
                id="salary"
                value={formData.salary}
                onChange={(e) => handleChange(e)}
                placeholder="Eg. $100,000"
                type="text"
                className="border-2 border-gray-300 rounded-lg p-2"
              />
            </div>

            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="type">Type of Job</label>
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={(e) => handleChange(e)}
                className="border-2 border-gray-300 rounded-lg p-2"
              >
                <option value="">Select Job Type</option>
                <option value="full-time">Full-Time</option>
                <option value="part-time">Part-Time</option>
                <option value="contract">Contract</option>
              </select>
            </div>

            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="companyName">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                name="companyName"
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleChange(e)}
                placeholder="Eg. Google"
                className="border-2 border-gray-300 rounded-lg p-2"
                required
              />
            </div>

            <div className="flex flex-col gap-[10px] mb-4">
              <label htmlFor="applicationURL">
                Application URL <span className="text-red-500">*</span>
              </label>
              <input
                name="applicationURL"
                id="applicationURL"
                value={formData.applicationURL}
                onChange={(e) => handleChange(e)}
                placeholder="Application URL"
                className="border-2 border-gray-300 rounded-lg p-2"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] mb-4">
            <label htmlFor="description">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={(e) => handleChange(e)}
              placeholder="Eg. We are looking for a software engineer with 3 years of experience in React and Node.js"
              className="border-2 border-gray-300 rounded-lg p-2"
              rows={10}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg w-full mx-auto"
            >
              Post job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJobForm;
