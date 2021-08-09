import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import classes from "./Search.module.scss";
import useDebounce from "./useDebounce";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
import { useHistory } from "react-router-dom";

const renderTitle = (title) => (
  <span>
    {title}
    <a
      style={{
        float: "right",
      }}
      href="https://www.google.com/search?q=antd"
      target="_blank"
      rel="noopener noreferrer"
    >
      more
    </a>
  </span>
);

const renderItem = (title, id, label) => ({
  value: String(id),
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>{label}</span>
    </div>
  ),
});

export default function Search() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  function handleLoadMovie(id) {
    const data = searchedItems.find((d) => d.id == id);
    console.log("data", data);
    setInputValue("");
    switch (data.media_type) {
      case "movie":
        return history.push(`/movies/${data.id}`);
      case "tv":
        return history.push(`/tv-shows/${data.id}`);
      case "person":
        return history.push(`/celebrities/${data.id}`);
    }
  }

  useEffect(() => {
    if (debouncedQuery) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=1&include_adult=false&query=${query}`
      )
        .then((r) => r.json())
        .then((data) => setSearchedItems(data.results));
    }
  }, [debouncedQuery]);

  function makeOptions() {
    if (searchedItems.length && query) {
      return [
        {
          label: renderTitle("movies"),
          options: searchedItems
            .filter((item) => item.media_type === "movie")
            .map((i) => renderItem(i.title, i.id)),
        },
        {
          label: renderTitle("Tv Shows"),
          options: searchedItems
            .filter((item) => item.media_type === "tv")
            .map((i) => renderItem(i.name, 100000)),
        },
        {
          label: renderTitle("People"),
          options: searchedItems
            .filter((item) => item.media_type === "person")
            .map((i) => renderItem(i.name, 100000)),
        },
      ].filter((type) => type.options.length);
    }
    return null;
  }

  return (
    <>
      <div className={classes.root}>
        <AutoComplete
          onSearch={(e) => setQuery(e)}
          onSelect={handleLoadMovie}
          onChange={(e) => setInputValue(e)}
          options={makeOptions()}
          value={inputValue}
        >
          <Input.Search size="large" placeholder="input here" />
        </AutoComplete>
      </div>
    </>
  );
}
