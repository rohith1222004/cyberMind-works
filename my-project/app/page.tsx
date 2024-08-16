"use client";
import TopBar from "./components/TopBar";
import FilterCard from "./components/FilterCard";
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
