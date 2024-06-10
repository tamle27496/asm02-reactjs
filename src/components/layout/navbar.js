import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  // state activeNavbar xác định điều kiện để thiết lập class active
  const [activeNavbar, setActiveNavbar] = useState(false);

  // useEffect để add even scroll khi render navbar
  useEffect(() => {
    const handleScroll = () => {
      // Nếu window scroll > 100px thì setState activeNavbar = true
      if (window.scrollY > 100) setActiveNavbar(true);
      // Không thuộc điều kiện trên thì setState activeNavbar = false
      else setActiveNavbar(false);
    };

    // Add even handle scroll vào window
    window.addEventListener("scroll", handleScroll);

    return () => {
      // remove even handle scroll khỏi window khi window scroll trở về vị trí ban đầu
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Nêú activeNavbar = true hay khi window scroll > 100px thì set class active để đổi màu nền navbar
    <div className={`${styles.navbar} ${activeNavbar ? styles.active : ""}`}>
      <div className={styles["navbar-wrap"]}>
        <Link className={styles.logo} to="/">
          Movie App
        </Link>
        <Link className={styles.search} to="/search">
          <i className="fa-solid fa-magnifying-glass"></i>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
