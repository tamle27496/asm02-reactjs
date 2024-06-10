import styles from "./searchForm.module.css";
import { useState } from "react";

const SearchForm = (props) => {
  // Tạo state value làm giá trị cho input
  const [value, setValue] = useState("");

  // Function clearInputForm đặt value của input về ""
  const clearInputForm = (event) => {
    // Gọi preventDefault để tránh load lại trang
    event.preventDefault();

    //set value về ""
    setValue("");
  };

  // function onHandleChange nhận biết sự thay đổi của input
  const onHandleChange = (event) => {
    // set value theo mỗi lần thay đổi của input
    setValue(event.target.value);
  };

  // function submitHandle truyền value ra component cha của nó
  const submitHandle = (event) => {
    // gọi preventDefault để tránh load lại trang
    event.preventDefault();

    // truyền value ra component cha của nó
    props.onSubmitForm(value);
  };

  return (
    <div className={styles.search_form}>
      <form className={styles.form}>
        <input
          type="text"
          className={styles.input}
          placeholder="batman"
          onChange={onHandleChange}
          value={value}
        ></input>
        <div className={styles.group_button}>
          {/* button reset form */}
          <button className={styles.button_reset} onClick={clearInputForm}>
            Reset
          </button>

          {/* button submitHandle */}
          <button onClick={submitHandle}>Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
