import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    location.href = "/test/jobs";
  }, []);

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Loading...</h5>
    </div>
  );
}
