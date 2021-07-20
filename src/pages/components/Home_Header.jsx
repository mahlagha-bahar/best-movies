import { useState, useEffect } from "react";
import React from "react";
import { Row, Col, Card } from "antd";
export default function HomeHeader() {
  const [firstMovie, setFirstMovie] = useState();
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US`
    )
      .then((result) => result.json())
      .then((data) => setFirstMovie(data.results[0]));
  }, []);
  if (!firstMovie) {
    return null;
  }
  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <div className="viewout">
              <img
                className="viewimage"
                src={`https://image.tmdb.org/t/p/w500/${firstMovie.backdrop_path}`}
              />
              <div className="view">
                <h1>{firstMovie.title}</h1>
                {firstMovie.overview}
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card>
            <img
              className="viewimage-right"
              src={`https://image.tmdb.org/t/p/w500/${firstMovie.backdrop_path}`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
