// import React from "react";

// import Container from "./components/Container";
// import { useParams } from "react-router-dom";
// import useMovieDb from "./hooks/useMovieDb";
// export default function TvShow() {
//   const { id } = useParams();

//   const { data = {} } = useMovieDb(`tv/${id}`);
//   // useEffect(() => {
//   //   fetch(
//   //     `https://api.themoviedb.org/3/movie/${id}?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US`
//   //   )
//   //     .then((r) => r.json())
//   //     .then((data) => setMovie(data));
//   // }, []);
//   return <Container>{data.name}</Container>;
// }
