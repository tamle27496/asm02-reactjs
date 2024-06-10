const MovieItem = (props) => {
  // Tạo biến movie nhận giá trị từ props.movie
  const movie = props.movie;

  // Tạo biến imgPath
  let imgPath;

  // Nếu props movie có trường backdrop_path tồn tại và props.title !== Original thì trả về img có kiểu là backdrop
  if (movie.backdrop_path && props.title !== "Original") {
    imgPath = (
      <img
        className={props.active ? "active" : ""}
        src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
        alt={movie.original_title}
      />
    );
  } // Nếu props.title === Original và props movie có tồn tại trường poster_path thì trả về img có kiểu là poster
  else if (props.title === "Original" && movie.poster_path) {
    imgPath = (
      <img
        className={props.active ? "active" : ""}
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.original_title}
      />
    );
  } // Không thuộc điều kiện nào vd như src bị lỗi thì trả về thẻ p chứa tên của movie
  else {
    imgPath = <p>{movie.original_title}</p>;
  }

  return (
    <div
      className="movie-item backdrop"
      // Truyền ra component cha movie để làm điều kiện hiển thị modal
      onClick={props.onToggleMovieItem(movie)}
    >
      {/* Hiển thị imgPath theo điều kiện */}
      {imgPath}
    </div>
  );
};

export default MovieItem;
