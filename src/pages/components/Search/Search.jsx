import React, { useState, useEffect } from "react";

import classes from "./Search.module.scss";
import useDebounce from "../useDebounce";

import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";

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

const renderItem = (title, count) => ({
  value: title,
  label: (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {title}
      <span>
        <UserOutlined /> {count}
      </span>
    </div>
  ),
});

const options = [
  {
    label: renderTitle("Libraries"),
    options: [
      renderItem("AntDesign", 10000),
      renderItem("AntDesign UI", 10600),
    ],
  },
  {
    label: renderTitle("Solutions"),
    options: [
      renderItem("AntDesign UI FAQ", 60100),
      renderItem("AntDesign FAQ", 30010),
    ],
  },
  {
    label: renderTitle("Articles"),
    options: [renderItem("AntDesign design language", 100000)],
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchedItems, setSearchedItems] = useState([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=1&include_adult=false&query=${query}`
      )
        .then((result) => result.json())
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
            .map((i) => renderItem(i.title, 100000)),
        },
        {
          label: renderTitle("Tv Shows"),
          options: searchedItems
            .filter((item) => item.media_type === "tv")
            .map((i) => renderItem(i.title, 100000)),
        },
        {
          label: renderTitle("People"),
          options: searchedItems
            .filter((item) => item.media_type === "person")
            .map((i) => renderItem(i.title, 100000)),
        },
      ].filter((type) => type.options.length);
    }
    return null;
  }

  return (
    <div className={classes.root}>
      <AutoComplete options={makeOptions()} onSearch={(e) => setQuery(e)}>
        <Input.Search size="large" placeholder="input here" />
      </AutoComplete>
    </div>
  );
}
