import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../../styles/JobItem.module.css";

const JobItem = (props) => {
  return (
    <a key={props?.jobId} className={styles["job-item"]} href="#">
      <div style={{ flex: 1, marginBottom: 16, height: 70 }}>
        <div className={styles["job-item-image"]}>
          {props?.companyLogo ? (
            <img
              src={props?.companyLogo}
              alt={props?.companyName}
              width="100%"
              loading="true"
            />
          ) : (
            <div className={styles["job-item-image-alt"]}>
              {props?.companyInitial}
            </div>
          )}
        </div>
        <div className={styles["job-item-company"]}>{props?.companyName}</div>
        <div className={styles["job-item-location"]}>
          <FontAwesomeIcon icon={faMapMarkerAlt} /> {props?.location}
        </div>
        <div className={styles["job-item-title"]}>{props?.jobTitle}</div>
        {/* Still thinking about should I use markdown renderer here */}
        {/* <ReactMarkdown className={styles["job-item-description"]}>
          {props?.shortDesc}
        </ReactMarkdown> */}
        <div className={styles["job-item-description"]}>{props?.shortDesc}</div>
      </div>
      <div className={styles["addition-info"]}>
        <div className={styles["job-created-date"]}>{props?.postedDate}</div>
        <div className={styles["job-est-salary"]}>{props?.estimatedSalary}</div>
      </div>
    </a>
  );
};

export default JobItem;
