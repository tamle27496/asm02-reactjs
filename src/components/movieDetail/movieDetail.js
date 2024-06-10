import { useState, useEffect } from "react";
import { API_KEY } from "../../data/requests";

import styles from "./movieDetail.module.css";

const MovieDetail = (props) => {
  // Tajo biến movieData nhận dữ liệu từ component cha truyền xuống
  const movieData = props.movieData;

  // Tạo state result nhận dữ liệu trả về sau khi fetch
  const [results, setResults] = useState(null);

  // Tạo 1 useEffetch để fetchData truyền vào, useEffetch này được gọi lại mỗi khi movieData thay đổi
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieData.id}/videos?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        // Nếu fetch lỗi thì trả về thông báo này ở console
        console.log(
          "Error Fetch:",
          response.status,
          "Không thể tìm thấy results theo id => return backdrop hoặc chọn phim khác "
        );
      }

      const data = await response.json();

      // Truyền data vào state results khi fetch xong
      setResults(data.results);
    };

    fetchData();
  }, [movieData]);

  // Tạo biến filterResults để tìm trong state results các thông tin có type = Trailer hoặc Teaser
  // Điều kiện là phải tồn tại state detail thì mới thực hiện filter
  const filterResults =
    results &&
    results.filter(
      (movie) =>
        (movie.type === "Trailer" && movie.site === "YouTube") ||
        (movie.type === "Teaser" && movie.site === "YouTube")
    );

  // Tìm kiếm trong array filterResults phần tử đầu tiên có chứa type = "Trailer" || "Teaser", ưu tiên Trailer hơn
  // Điều kiện tìm kiếm tiên quyết là filterResults tồn tại, sau đó tìm phần từ đầu tiên chứa type = "Trailer" (ưu tiên) theo đúng yêu cầu
  // Nếu như không có type = "Trailer" tương đương -1 thì mới chuyển sang tìm phần tử đầu tiên có type="Teaser"
  // Không có cả 2 type Trailer và Teaser return -1
  let indexResults;
  if (filterResults)
    indexResults = filterResults.findIndex((index) => index.type === "Trailer");

  if (
    filterResults &&
    filterResults.findIndex((index) => index.type === "Trailer") === -1
  )
    indexResults = filterResults.findIndex((index) => index.type === "Teaser");

  return (
    <div className={styles.wrap_movie_detail}>
      <div className={styles.information}>
        <h2>{movieData.original_title || movieData.original_name}</h2>
        <p>Release Date: {movieData.release_date}</p>
        <p className={styles.vote}>Vote: {movieData.vote_average}/10</p>
        <p className={styles.overview}>{movieData.overview}</p>
      </div>

      {/*Điều kiện là results, filterResults và indexResults khác -1  */}
      {results && filterResults && indexResults !== -1 ? (
        // Trả về iframe youtube
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${filterResults[indexResults].key}`}
        ></iframe>
      ) : (
        // Nếu không thỏa mãn bất kì điều kiện nào thì trả về backdrop
        <img
          src={`https://image.tmdb.org/t/p/w500${movieData.backdrop_path}`}
        />
      )}
    </div>
  );
};

export default MovieDetail;
