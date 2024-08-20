"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { RangeSlider } from '@mantine/core';
import axios from 'axios';

export default function FilterCard({ jobs }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([1, 80]);
  const [searchQuery, setSearchQuery] = useState('');

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const filterJobs = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/filter`, {
        params: {
          location,
          jobType,
          minSalary: salaryRange[0],
          maxSalary: salaryRange[1],
          searchQuery,
        },
      });
      setFilteredJobs(data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    filterJobs();
  }, [searchQuery, location, jobType, salaryRange]);
  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, location, jobType, salaryRange]);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleSalaryChange = (value) => {
    setSalaryRange(value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className=''>
      <div className='w-full h-48 md:h-32 space-y-4 xl:p-10 flex flex-col md:flex-row md:justify-between md:items-center md:space-x-4 shadow-md rounded-md'>
        <div className='flex items-center space-x-5 justify-center mt-5'>
          <div>
            <Image src={'/search.png'} width={20} height={20} />
          </div>
          <input
            type="text"
            placeholder="Search By Job Title, Role"
            className="text-gray-500 bg-transparent border-none focus:outline-none"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className='hidden md:block w-px h-12 bg-gray-300'></div>

        <div className='flex items-center space-x-5 justify-center'>
          <div>
            <Image src={'/Location.png'} width={16} height={16} />
          </div>
          <select className='xl:pr-16 text-gray-700' value={location} onChange={handleLocationChange}>
            <option value="" disabled hidden>Choose Preferred Location</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Chennai">Chennai</option>
            <option value="Trichy">Trichy</option>
            <option value="Madurai">Madurai</option>
          </select>
        </div>
        
        <div className='hidden md:block w-px h-12 bg-gray-300'></div>

        <div className='flex items-center space-x-5 justify-center'>
          <select className='xl:pr-16 text-gray-700' value={jobType} onChange={handleTypeChange}>
            <option value="" disabled hidden>Job Type</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div className='hidden md:block w-px h-12 bg-gray-300'></div>

        <div className='justify-center'>
          <div className='flex justify-between m-2 sm:gap-20'>
            <h2 className='text-gray-700'>Salary Per Month</h2>
            <h2 className='text-gray-700'>₹{salaryRange[0]}k - ₹{salaryRange[1]}k</h2>
          </div>

          <div className='justify-center flex'>
            <RangeSlider 
              w={'80%'}
              color='black' 
              minRange={1} 
              min={1} 
              max={80} 
              step={1} 
              value={salaryRange} 
              onChange={handleSalaryChange} 
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 mt-5 justify-center">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <p className='mt-10 text-gray-500 font-semibold text-center'>No jobs found matching your criteria. Please select at least one filtering option.</p>
        )}
      </div>
    </div>
  );
}