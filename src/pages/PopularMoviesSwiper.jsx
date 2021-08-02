import React from "react";
import SimpleSwiper from "./components/SimpleSwiper";
import useMovieDb from "./hooks/useMovieDb";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const PopularMoviesSwiper = ({ ID }) => {
  // const { id } = useParams();
  const [states, setState] = useState({});
  console.log(states);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${ID}/similar?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=1`
    )
      .then((r) => r.json())
      .then((data) => setState(data));
  }, []);

  // const { data = { results: [] } } = useMovieDb("Movie/popularMovie");
  return <SimpleSwiper slides={states.results} />;
};
export default PopularMoviesSwiper;
