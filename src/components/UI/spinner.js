import styles from "./spinner.module.css";

// Component Spinner hiẻn thị khi chưa fetch xong API
const Spinner = () => {
  return (
    <div className={styles.wrap_spinner}>
      <div className={`${styles.sp} ${styles["sp-circle"]}`}></div>
      <h4 className={styles["spinner-text"]}> Loading</h4>
    </div>
  );
};

export default Spinner;
