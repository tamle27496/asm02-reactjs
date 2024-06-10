import { useState, useEffect } from "react";

import MovieItem from "../UI/movieItem";
import MovieDetail from "../movieDetail/movieDetail";
import Spinner from "../UI/spinner";

const MovieList = (props) => {
  // Tạo state movieList để nhận dữ liệu sau khi fetch API
  const [movieList, setMovieList] = useState([]);

  // Tạo state isLoading để hiển thị tạm nội dung khi chờ fetch API
  const [isLoading, setIsLoading] = useState(true);

  // Tạo state movieData để nhận dữ liệu sau khi so sánh logic và truyền vào làm props cho MovieItem
  const [movieData, setMovieData] = useState(null);

  // Tạo state để biểu thị trạng thái cho modal MovieDetail
  const [showMovieDetail, setShowMovieDetail] = useState(false);

  // Sử dụng useEffect để fetch API mỗi khi load component MovieList
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3${props.API_Endpoint}`
      );

      // Nếu như fetch lỗi thì throw error thông báo lỗi
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      // Thành công thì set state movieList với trường data.results vừa fetch
      setMovieList(data.results);

      // set state isLoading = false để hiển thị dữ liệu vừa được fetch
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Function onToggleMovieItem nhận movie được truyền từ component con MovieItem
  const onToggleMovieItem = (movie) => () => {
    // Nếu như state movieData tồn tại và movieData.id trùng với movie.id được truyền từ MovieItem ra thì đóng modal MovieDetail
    if (movieData && movieData.id === movie.id) {
      // setState movieData về trạng thái ban đầu
      setMovieData(null);

      // setState showMovieDetail = false để đóng modal
      setShowMovieDetail(false);
    }

    // Trường hợp nếu state movieData không tồn tại hoặc có tồn tại nhưng movieData không trùng với movie.id được truyền từ MovieItem ra
    if (!movieData || (movieData && movieData.id !== movie.id)) {
      // set MovieData = movie để truyền vào làm dữ liệu cho MovieDetail
      setMovieData(movie);

      // set showMovieDetail = true để hiển thị MovieDetail
      setShowMovieDetail(true);
    }
  };

  return (
    <section>
      <h2 className="section-title">{props.title}</h2>

      {/* isLoading có tồn tại hay chưa fetch xong API thì hiển thị Spinner, ngược lại fetch xong rồi thì hiển thị MovieList và truyền các dữ liệu vào cho nó */}
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="wrap-item scroll-bar">
          {movieList.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              title={props.title}
              onToggleMovieItem={onToggleMovieItem}
            />
          ))}
        </div>
      )}

      {/* Popup Movie Detail */}
      {/* Vì đề bài không nói rõ là popup này là chung của toàn bộ trang hay là popup riêng của từng section nên mình sẽ để movieDetail hoạt động theo từng component, và vẫn có logic đúng như yêu cầu đề bài */}
      {showMovieDetail && <MovieDetail movieData={movieData} />}
    </section>
  );
};

export default MovieList;
