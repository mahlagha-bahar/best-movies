import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
import { Space, Card } from "antd";
import { Row, Col } from "antd";
import PopularMoviesSwiper from "./PopularMoviesSwiper";
import { Rate } from "antd";
import Container from "./components/Container";
import Credits from "./Credits";
import { Divider } from "antd";
import { Typography } from "antd";

const { Title } = Typography;
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
    <>
      <div>
        <Row>
          <Col span={8}>
            <img
              width={200}
              height={200}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <div style={{ marginTop: "20px" }}>
              <Rate allowHalf defaultValue={movie.vote_average} />
            </div>
          </Col>
          <Col span={16}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            />

            <div style={{ marginTop: "30px" }}>
              <Divider orientation="left">{movie.title}</Divider>
              <p>${movie?.overview}</p>
            </div>
          </Col>
        </Row>

        <div style={{ marginTop: "30px" }}>
          <Credits ID={id} />
        </div>

        <Divider style={{ marginTop: "30px" }}>
          <Title level={2}>Similar Movies</Title>
        </Divider>
        <div style={{ marginTop: "30px" }}>
          <PopularMoviesSwiper ID={id} />
        </div>
      </div>
    </>
  );
}
