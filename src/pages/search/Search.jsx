import React from "react";
import Navbar from "../../components/layout/navbar";
import SearchForm from "../../components/search/searchForm";
import ResultList from "../../components/search/resultList";
import { useState } from "react";

const Search = () => {
  // Khởi tạo state value nhận value từ SearchForm truyền ra
  const [value, setValue] = useState(null);

  // Function nhận props value từ SearchForm truyền ra và setState
  const onSubmitForm = (value) => {
    setValue(value);
  };

  return (
    <section className="search">
      <Navbar />
      <SearchForm onSubmitForm={onSubmitForm} />
      <h2 className="section-title">Search Results </h2>
      {/* state value có tồn tại và có length > 0 thì hiển thị resultList, ngược lại thì hiển thị thẻ p */}
      {value && value.length > 0 ? (
        <ResultList value={value} />
      ) : (
        <p>There are no movies to display!</p>
      )}
    </section>
  );
};

export default Search;
