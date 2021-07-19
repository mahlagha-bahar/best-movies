import { Row, Col, Card } from "antd";
import React from "react";
import { useState, useEffect } from "react";
const { Meta } = Card;
export default function Home() {
  const [latestMovieData, setLatestMovieData] = useState({});

  const { page, results = [], total_page, total_results } = latestMovieData;
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US"
    )
      .then((result) => result.json())
      .then(setLatestMovieData);
  }, []);
  return (
    <Row gutter={[16, 16]}>
      {results.map((movie) => (
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
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
        </Col>
      ))}
    </Row>
  );
}
