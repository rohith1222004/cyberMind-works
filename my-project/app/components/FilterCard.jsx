"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { RangeSlider } from '@mantine/core';

export default function FilterCard({ jobs }) {
  const [filteredJobs, setFilteredJobs] = useState(jobs);
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryRange, setSalaryRange] = useState([1, 80]);
  const [searchQuery, setSearchQuery] = useState('')
  const filterJobs = () => {
    let filtered = jobs;

    if (location) {
      filtered = filtered.filter(job => job.location === location);
    }

    if (searchQuery) {
      filtered = filtered.filter(job =>
        (job.jobTitle && job.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())) || 
        (job.role && job.role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (jobType) {
      filtered = filtered.filter(job => job.jobType === jobType);
    }

    filtered = filtered.filter(job => {
      const salary = parseInt(job.salaryStart);
      return salary >= salaryRange[0] && salary <= salaryRange[1];
    });

    setFilteredJobs(filtered);
  };

  useEffect(() => {
    filterJobs();
  }, [searchQuery,location, jobType, salaryRange]);

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
    <div>
      <div className='w-full h-32 flex justify-evenly shadow-md items-center'>
      <div className='flex items-center space-x-5'>
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
        <div className='w-px h-12 bg-gray-300'></div>

        <div className='flex items-center space-x-5'>
          <div>
            <Image src={'/Location.png'} width={16} height={16} />
          </div>
          <select className='pr-16' value={location} onChange={handleLocationChange}>
            <option value="" disabled hidden>Choose Preferred Location</option>
            <option value="Coimbatore">Coimbatore</option>
            <option value="Chennai">Chennai</option>
            <option value="Trichy">Trichy</option>
            <option value="Madurai">Madurai</option>
          </select>
        </div>
        
        <div className='w-px h-12 bg-gray-300'></div>

        <div className='flex items-center space-x-5'>
          <select className='pr-16' value={jobType} onChange={handleTypeChange}>
            <option value="" disabled hidden>Job Type</option>
            <option value="Part-time">Part-time</option>
            <option value="Full-time">Full-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div className="w-px h-12 bg-gray-300"></div>

        <div className=''>
          <div className='flex gap-20'>
            <h2>Salary Per Month</h2>
            <h2>₹{salaryRange[0]}k - ₹{salaryRange[1]}k</h2>
          </div>

          <div className=''>
            <RangeSlider 
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
            <JobCard key={job.id} job={job}/>
          ))
        ) : (
          <p className='mt-10 text-gray-500 font-semibold'>No jobs found matching your criteria. Please select at least one filtering option.</p>
        )}
      </div>
    </div>
  );
}
