import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { Space, Card } from "antd";

import PopularMoviesSwiper from "./PopularMoviesSwiper";
import { Rate } from "antd";
import Container from "./components/Container";
import Credits from "./Credits";
export default function MoviesPage() {
  const { id } = useParams();

  const [movie, setMovie] = useState();
  console.log(movie);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US`
    )
      .then((r) => r.json())
      .then((data) => setMovie(data));
  }, []);
  if (!movie) {
    return <h1>loading..</h1>;
  }

  return (
    <Container>
      <Space direction="vertical">
        <Card title={movie.title}>
          <div style={{ width: 250, height: 200 }}>
            <div className="viewout" style={{ width: 600, height: 200 }}>
              <img
                className="viewimage"
                src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
              />
              <div className="view" style={{ width: 200, height: 200 }}>
                <Image
                  width={200}
                  height={200}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
                ;
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ width: 600 }}>
          <div>
            <p>${movie?.overview}</p>
          </div>
          <div><Credits ID={id}/></div>
          <div>
            <Rate allowHalf defaultValue={movie.vote_average} />
          </div>
        </Card>
        <PopularMoviesSwiper  ID={id} />
      </Space>
    </Container>
  );
}
