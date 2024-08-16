"use client";
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';

function JobCard({ job }) {
  const router = useRouter();
  function hoursDifference(createdAt) {
    const now = new Date();
    const createdDate = new Date(createdAt);
    const timeDifference = now - createdDate;
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return hoursDifference;
  }

  return (
    <div className='bg-white w-full max-w-sm md:w-1/3 lg:w-1/4 h-auto flex flex-col rounded-xl shadow-md'>
      <div className='m-4'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div
            className='w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-lg'
            style={{ background: 'linear-gradient(to bottom, #FEFEFD 0%, #F1F1F1 100%)' }}
          >
            <div>
              <Image src={'/amazonLogo.png'} width={50} height={50} />
            </div>
          </div>
          <div className='bg-custom-blue w-16 h-8 flex items-center justify-center rounded-lg mt-2 md:mt-0'>
            <h2 className='text-xs md:text-sm'>{hoursDifference(job.createdAt)}hrs</h2>
          </div>
        </div>
        <h1 className='font-medium text-lg md:text-xl mt-4'>{job.jobTitle}</h1>

        <div className='flex flex-wrap md:flex-nowrap items-center space-x-4 mt-4'>
          <div className='flex items-center space-x-2'>
            <Image src={'/profile.png'} width={20} height={20} alt='Profile Icon' />
            <span className='text-sm'>{job.jobType}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Image src={'/org.png'} width={20} height={20} alt='Organization Icon' />
            <span className='text-sm'>{job.location}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Image src={'/package.png'} width={20} height={20} alt='Salary Icon' />
            <span className='text-sm'>{job.salaryEnd} LPA</span>
          </div>
        </div>
        <ul className='list-disc pl-5 mt-4 text-sm'>
          <li className='text-gray-700'>{job.jobDescription}</li>
        </ul>
      </div>
      <div className='flex justify-center mt-2 mb-5'>
        <button className='bg-custom-buttom-blue w-5/6 h-12 rounded-xl text-white text-sm' onClick={() => router.push('/applied')} >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;
