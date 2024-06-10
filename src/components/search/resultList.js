import { useState, useEffect } from "react";
import { API_KEY } from "../../data/requests";
import MovieItem from "../UI/movieItem";
import MovieDetail from "../movieDetail/movieDetail";

const ResultList = (props) => {
  // tạo state search nhận dữ liệu sau khi fetch API
  const [search, setSearch] = useState(null);

  // tạo state movieData nhận dữ liệu truyền vào cho MovieDetail
  const [movieData, setMovieData] = useState(null);

  // tạo state showMovieDetail làm trạng thái modal MovieDetail
  const [showMovieDetail, setShowMovieDetail] = useState(false);

  // Sử dụng useEffect để fetch API mỗi khi load component MovieList
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${props.value}&api_key=${API_KEY}&language=en-US?`
      );

      //// Nếu như fetch lỗi thì throw error thông báo lỗi

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      // Thành công thì set state movieList với trường data.results vừa fetch
      setSearch(data.results);
    };

    fetchData();
  }, [props]);

  const onToggleMovieItem = (movie) => () => {
    // Nếu như state movieData tồn tại và movieData.id trùng với value được truyền từ MovieItem ra thì đóng modal MovieDetail
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
    <>
      <div className="wrap-search">
        {/* Nếu search có tồn tại thì hiển thị MovieItem và truyền dữ liệu vào cho nó */}
        {search &&
          search.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              onToggleMovieItem={onToggleMovieItem}
              title="Original"
              active={showMovieDetail}
            />
          ))}
      </div>

      {/* Nếu showMovieDetail = true thì mới hiển thị modal MovieDetail */}
      {showMovieDetail && <MovieDetail movieData={movieData} />}
    </>
  );
};

export default ResultList;
