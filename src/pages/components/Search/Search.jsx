import { useState, useEffect } from "react";
import { Row, Col } from "antd";
import classes from "./Search.module.scss";
import useDebounce from "./useDebounce";
import { Input, AutoComplete } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";
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

const renderItem = (title, id) => ({
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
        <UserOutlined /> {id}
      </span>
    </div>
  ),
  
});

export default function search() {
  const [searchedItems, setSearchedItems] = useState([]);
  const [latestMovieData, setLatestMovieData] = useState({});
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);

  // function handleSearch(query) {
  //   const timer = setTimeout(() => {
  //     fetch(
  //       `https://api.themoviedb.org/3/search/multi?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=1&include_adult=false&query=${query}`
  //     )
  //       .then((r) => r.json())
  //       .then((data) => setSearchedItems(data.results));
  //   }, 3000);
  // }
  // function fetchMovies(page) {
  //   fetch(
  //     `https://api.themoviedb.org/3/movie/upcoming?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=${page}`
  //   )
  //     .then((result) => result.json())
  //     .then((data)=>setLatestMovieData(data));
  // }
  // useEffect(() => {
  //   fetchMovies(1);
  // }, []);

  useEffect(() => {
    if (debouncedQuery) {
      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=1&include_adult=false&query=${query}`
      )
        .then((r) => r.json())
        .then((data) => {
          setSearchedItems(data.results);
          console.log("hi", data.results);
        });
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
          style={{
            width: 250,
          }}
          options={makeOptions()}
          onSearch={(e) => setQuery(e)}
        >
          <Input.Search size="large" placeholder="input here" />
        </AutoComplete>
      </div>

      {/* <Row gutter={[16, 16]}>
        {results.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Link to={`/Home/${movie}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={movie.original_title}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  />
                }
              >
                <Meta
                  title={movie.original_title}
                  description="www.instagram.com"
                />
              </Card>
            </Link>
          </Col>
        ))}
      </Row> */}
    </>
  );
}
