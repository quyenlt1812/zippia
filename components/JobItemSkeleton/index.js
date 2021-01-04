import React from "react";
import styles from "../../styles/JobSkeleton.module.css";

const JobItemSkeletion = () => {
  return (
    <div className={styles["job-skeleton"]}>
      <div style={{ flex: 1, marginBottom: 16, height: 70 }}>
        <div className={styles["skeleton-circle"]} />
        <div className={styles["skeleton-line-small"]} />
        <div className={styles["skeleton-line-small"]} />
        <div className={styles["skeleton-line-big"]} />
        <div className={styles["skeleton-para-small"]} />
        <div className={styles["skeleton-para-small"]} />
      </div>
      <div className={styles["job-skeleton-row"]}>
        <div className={styles["skeleton-line-small"]} />
        <div className={styles["skeleton-line-small"]} />
      </div>
    </div>
  );
};

export default JobItemSkeletion;
