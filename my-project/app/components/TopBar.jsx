"use client";
import Image from 'next/image';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import JobForm from './Form';

function TopBar() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className='justify-center flex p-4'>
        <div className='w-full md:w-3/5 h-20 flex items-center justify-between rounded-full border-2 px-4'>
          <div className='flex items-center'>
            <Image src={'/logo.png'} width={40} height={40} alt="Logo" />
          </div>
          <div className='hidden xl:flex items-center space-x-8'>
            <h2 className="text-sm md:text-base">Home</h2>
            <h2 className="text-sm md:text-base">Find Jobs</h2>
            <h2 className="text-sm md:text-base">Find Talents</h2>
            <h2 className="text-sm md:text-base">About us</h2>
            <h2 className="text-sm md:text-base">Testimonials</h2>
          </div>
          <button 
            className='w-32 bg-gradient-to-b from-purple-500 to-purple-800 h-10 rounded-full text-white' 
            onClick={open}
          >
            Create Jobs
          </button>
        </div>
      </div>

      <Modal opened={opened} onClose={close} size="auto">
        <JobForm close={close} />
      </Modal>
    </>
  );
}

export default TopBar;


