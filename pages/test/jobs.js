import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
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
    jobTitle: "Business Analyst",
  };
  const URL = "https://www.zippia.com/api/jobs";

  const [jobs, setJobs] = useState([]);
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
    setRecently(!recently);
    // axios
    //   .post(URL, { ...REQUEST_PAYLOAD, postingDateRange: "7d" })
    //   .then((resp) => {
    //     const jobList = resp.data?.jobs;
    //     console.log("[Jobs] 7 days fetching", jobList);
    //     if (Array.isArray(jobList)) {
    //       setJobs(jobList);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("[Jobs] 7 days fetching error", error);
    //   });
  };

  return (
    <div className={styles.jobs}>
      {/* Start Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 24,
        }}
      >
        <h1 className={styles["page-title"]}>
          Zippia<span>Jobs</span>
        </h1>
        <div className={styles["button-group"]}>
          <button className={styles.button}>Company name</button>
          <button
            className={recently ? styles["button-selected"] : styles.button}
            onClick={loadJobs7Days}
          >
            Last 7 days
          </button>
        </div>
      </div>
      {/* End Header */}
      {/* Start Job List */}
      <div className={styles["job-list"]}>
        {jobs.map((job) => (
          // Start Job Item
          <a key={job.jobId} className={styles["jobs-item"]} href="#">
            <div style={{ flex: 1, marginBottom: 16, height: 70 }}>
              <div className={styles["jobs-item-image"]}>
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={job.companyName}
                    width="100%"
                    loading="true"
                  />
                ) : (
                  <div className={styles["jobs-item-image-alt"]}>
                    {job.companyInitial}
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div className={styles["jobs-item-company"]}>
                  {job.companyName}
                </div>
                <div className={styles["jobs-item-location"]}>
                  <FontAwesomeIcon icon={faMapMarkerAlt} /> {job.location}
                </div>
              </div>
              {/* <div className={styles["jobs-item-title"]}>{job.OBJtitle}</div> */}
              <div className={styles["jobs-item-title"]}>{job.jobTitle}</div>
              {/* Still thinking about should I use markdown renderer here */}
              {/* <ReactMarkdown className={styles["jobs-item-skills"]}>
                {job.shortDesc}
              </ReactMarkdown> */}
              <div className={styles["jobs-item-skills"]}>{job.shortDesc}</div>
            </div>
            <div className={[styles["addition-info"]]}>
              <div className={styles["jobs-created-date"]}>
                {job.postedDate}
              </div>
              <div className={styles["jobs-est-salary"]}>
                {job.estimatedSalary}
              </div>
            </div>
          </a>
          // End Job Item
        ))}
      </div>
      {/* End Job List */}
    </div>
  );
};

export default Jobs;
