import React from "react";
import Navbar from "../../components/layout/navbar";
import requests from "../../data/requests";
import Banner from "../../components/browse/banner";
import MovieList from "../../components/browse/movieList";

function Browse() {
  // Khởi tạo dummyMovieList lấy dữ liệu từ request.js
  const dummyMovieList = [
    { title: "Original", API_Endpoint: requests.fetchNetflixOriginals },
    { title: "Xu hướng", API_Endpoint: requests.fetchTrending },
    { title: "Xếp hạng cao", API_Endpoint: requests.fetchTopRated },
    { title: "Hành động", API_Endpoint: requests.fetchActionMovies },
    { title: "Hài", API_Endpoint: requests.fetchComedyMovies },
    { title: "Kinh dị", API_Endpoint: requests.fetchHorrorMovies },
    { title: "Lãng mạn", API_Endpoint: requests.fetchRomanceMovies },
    { title: "Tài liệu", API_Endpoint: requests.fetchDocumentaries },
  ];

  // Sử dụng dữ liệu từ dummyMovieList để render ra các MovieList theo title tương ứng
  const movieList = dummyMovieList.map((list) => (
    <MovieList
      key={list.title}
      title={list.title}
      API_Endpoint={list.API_Endpoint}
    />
  ));

  return (
    <div className="app">
      <Navbar />
      <Banner />
      {/* Hiển thị các movieList */}
      {movieList}
    </div>
  );
}

export default Browse;
