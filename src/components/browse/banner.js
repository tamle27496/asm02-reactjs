import styles from "./banner.module.css";
import { useEffect, useState } from "react";
import requests from "../../data/requests";
import Spinner from "../UI/spinner";

const Banner = () => {
  // Tạo state banner để nhận dữ liệu sau khi fetch API
  const [banner, setBanner] = useState([]);

  // Tạo state isLoading để hiển thị tạm nội dung khi chờ fetch API
  const [isLoading, setIsLoading] = useState(true);

  // Sử dụng useEffect để fetch API mỗi khi load component Banner
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3${requests.fetchNetflixOriginals}`
      );
      // Nếu như fetch lỗi thì throw error thông báo lỗi
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      // Thành công thì set state Banner với trường data.results vừa fetch
      setBanner(data.results);

      // set state isLoading = false để hiển thị dữ liệu vừa được fetch
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Tạo biến indexRandomBanner lấy random 1 index trong state banner
  //  Ở đây k làm theo hướng dẫn của bài vì hướng dẫn của bài bị sai, hướng dẫn của bài theo kiểu
  // const indexRandomBanner = Math.floor(Math.random() * banner.length - 1); => ví dụ banner.length = 2 và random ra 0 thì banner.length - 1 = -1, index = -1 sẽ là undefined mặc dù có fetch thành công dữ liệu
  const indexRandomBanner = Math.floor(Math.random() * banner.length);

  // Tạo biến randomBanner để lấy 1 phần tử trong banner theo index vừa được random
  const randomBanner = banner[indexRandomBanner];

  // Function này dùng để rút gọn phần overview, khi overview quá dài sẽ ảnh hưởng đến hiển thị, cắt chuỗi khi đạt 200 kí tự, sau 200 kí tự sẽ hiển thị ...
  const subString = (string) => {
    return string.substr(0, 200).concat("...");
  };

  return (
    <div>
      {/* Nếu isLoading = true hay chưa fetch xong API thì hiển thị component Spinner, fetch xong thì hiển thị banner */}
      {isLoading ? (
        <Spinner />
      ) : (
        <section
          className={styles.banner}
          style={{
            backgroundImage: `url(
        "https://image.tmdb.org/t/p/original${randomBanner.backdrop_path}"
      )`,
          }}
        >
          <div className={styles.info_movie}>
            <div className={styles["original_name"]}>
              <h1>{randomBanner.original_name}</h1>
            </div>
            <div className={styles["group-navigate_button"]}>
              <button className={`btn ${styles["btn-play"]}`}>Play</button>
              <button className={`btn ${styles["btn-my_list"]}`}>
                My List
              </button>
            </div>
            <p className={styles.overview}>
              {/* Gọi funtion subString để cắt khi overview vượt quá 200 kí tự */}
              {subString(randomBanner.overview)}
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Banner;
