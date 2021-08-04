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
        {/* <Space direction="vertical">
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
      </Space> */}
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
              //  width={"100%"}
              //   height={200}
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
        {/* <div style="text-align:center">
          <p>Similar Movies</p>
          <p>{movie.title}</p>
        </div> */}

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
