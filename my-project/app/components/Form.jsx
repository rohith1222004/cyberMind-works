"use client";
import { Button } from '@mantine/core';
import axios from 'axios';
import React from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaAnglesDown } from "react-icons/fa6";

const JobForm = ({ close }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${baseUrl}/postFrom`, data, {
        headers: {
          "Content-Type": "application/json",
        }
      });
      toast('Job Created Successfully 🎉', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      reset();
      close();
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Error creating job. Please try again.', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="xl:max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg overflow-auto">
      <h1 className="text-xl font-semibold mb-6 text-center ">Create Job Opening</h1>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>  
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
            <input
              {...register("jobTitle")}
              type="text"
              id="jobTitle"
              name="jobTitle"
              className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter job title"
            />
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
            <input
              {...register("companyName")}
              type="text"
              id="companyName"
              name="companyName"
              className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter company name"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <select
              {...register("location")}
              id="location"
              name="location"
              className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            > 
              <option value="" disabled hidden>Choose Preferred Location</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Chennai">Chennai</option>
              <option value="Trichy">Trichy</option>
              <option value="Madurai">Madurai</option>
            </select>
          </div>
          <div className="flex-1 mt-4 md:mt-0">
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              {...register("jobType")}
              id="jobType"
              name="jobType"
              className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="salaryRange" className="block text-sm font-medium text-gray-700">Salary Range</label>
            <div className="flex space-x-1">
              <input
                {...register("salaryStart")}
                type="text"
                id="salaryStart"
                name="salaryStart"
                className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="₹0"
              />
              <input
                {...register("salaryEnd")}
                type="text"
                id="salaryEnd"
                name="salaryEnd"
                className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="₹12,00,000"
              />
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="applicationDeadLine" className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <input
              {...register("applicationDeadline")}
              type="date"
              name="applicationDeadline"
              className="mt-1 border-2 p-3 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            {...register("jobDescription")}
            id="jobDescription"
            name="jobDescription"
            rows="4"
            className="mt-1 border-2 p-2 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Please share a description to let the candidate know more about the job role"
          />
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center space-x-2">
            <Button variant="outline" color='dark'>Save Draft
              <FaAnglesDown className='ml-2' />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button className='py-2 px-4' type='submit'>Publish
              <FaAngleDoubleRight className='ml-2' />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
