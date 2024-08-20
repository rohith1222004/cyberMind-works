"use client";
import TopBar from "./components/TopBar";
import FilterCard from "./components/FilterCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [getAllJobs, setGetAllJobs] = useState([]);

  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  console.log(baseUrl);
  
  useEffect(() => {
    axios.get(`${baseUrl}/postFrom`, {
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
  console.log(getAllJobs);
  return (
    <div>
      <div className="pt-3">
        <TopBar />
      </div>

      <div className="mt-5">
        <FilterCard jobs={getAllJobs}/>
      </div>
    </div>
  );
}
