import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import JobItem from "../../components/JobItem";
import JobItemSkeletion from "../../components/JobItemSkeleton";
import styles from "../../styles/Jobs.module.css";

// const REQUEST_PAYLOAD = {
//   companySkills: true,
//   dismissedListingHashes: [],
//   fetchJobDesc: true,
//   locations: [],
//   numJobs: 10,
//   previousListingHashes: [],
//   jobTitle: "Business Analyst",
// };

const Jobs = () => {
  const REQUEST_PAYLOAD = {
    fetchJobDesc: true,
    numJobs: 10,
    dismissedListingHashes: [],
    previousListingHashes: [],
    jobTitle: "Developer",
  };
  const URL = "https://www.zippia.com/api/jobs";

  const [jobs, setJobs] = useState(null);
  const [recently, setRecently] = useState(false);

  const fetchJobs = () => {
    axios
      .post(URL, REQUEST_PAYLOAD)
      .then((resp) => {
        const jobList = resp.data?.jobs;
        console.log("[Jobs] First fetching", jobList);
        if (Array.isArray(jobList)) {
          setJobs(jobList);
        }
      })
      .catch((error) => {
        console.log("[Jobs] First fetching error", error);
      });
  };

  useEffect(() => {
    if (recently) {
      axios
        .post(URL, { ...REQUEST_PAYLOAD, postingDateRange: "7d" })
        .then((resp) => {
          const jobList = resp.data?.jobs;
          console.log("[Jobs] 7 days fetching", jobList);
          if (Array.isArray(jobList)) {
            setJobs(jobList);
          }
        })
        .catch((error) => {
          console.log("[Jobs] 7 days fetching error", error);
        });
    } else {
      fetchJobs();
    }
  }, [recently]);

  const loadJobs7Days = () => {
    setJobs(null);
    setRecently(!recently);
  };

  return (
    <div className={styles.jobs}>
      <Head>
        <title>Zippia Jobs</title>
        <meta
          name="description"
          content="This is the test of Quyen for Zippia"
        />
      </Head>
      {/* Start Header */}
      <div className={styles["jobs-header"]}>
        <h1 className={styles["page-title"]}>
          Zippia<span>Jobs</span>
        </h1>
        <div className={styles["button-group"]}>
          <button disabled className={styles.button}>
            Offer by company name
          </button>
          <button
            className={recently ? styles["button-selected"] : styles.button}
            onClick={loadJobs7Days}
          >
            Published in the last 7 days
          </button>
        </div>
      </div>
      {/* End Header */}
      {/* Start Job List */}
      <div className={styles["job-list"]}>
        {/* Map jobs to job item */}
        {!Array.isArray(jobs)
          ? [...new Array(4)].map((_, index) => (
              <JobItemSkeletion key={index} />
            ))
          : jobs.map((job) => <JobItem key={job.jobId} {...job} />)}
      </div>
      {/* End Job List */}
    </div>
  );
};

export default Jobs;
