"use client";

import React, { useState } from "react";
import { shareJob } from "@/app/actions";
import { toast } from "sonner";

function ShareJobForm() {
  const [formData, setFormData] = useState({
    source: "linkedin",
    customSource: "",
    postURL: "",
  });

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
    form.append("companyName", "Shared Job");
    form.append("applicationURL", formData.postURL);

    shareJob(form);

    setFormData({
      source: "linkedin",
      customSource: "",
      postURL: "",
    });

    toast.success("Job post has been shared successfully");
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Share a Job Post</h1>

      <div className="w-full max-w-lg mx-auto border-2 border-gray-300 rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="source" className="block font-medium">
              Where is this job posted? <span className="text-red-500">*</span>
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

          <div className="space-y-3">
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

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
          >
            Share Job Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShareJobForm;
