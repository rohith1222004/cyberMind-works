"use client"
import TopBar from "../components/TopBar";
import FilterCard from "../components/FilterCard";
import JobCard from "../components/JobCard";
import JobForm from "../components/Form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [getAllJobs, setGetAllJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/postFrom', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res);
      setGetAllJobs(res.data);
    })
    .catch(error => {
      console.error("There was an error fetching the jobs!", error);
    });
  }, []);
  return (
    <div className="relative min-h-screen">

      <div className="absolute inset-0 bg-gray-500/50  backdrop-opacity-60 z-20"></div>

      <div className="relative z-10">
  
        <div className="pt-3">
          <TopBar />
        </div>

        <div className="mt-5">
          <FilterCard jobs={getAllJobs} />
        </div>
      </div>

      <div className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="pointer-events-auto"> 
          <JobForm />
        </div>
      </div>
    </div>
  );
}
