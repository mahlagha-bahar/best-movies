import { Row, Col, Card, Pagination, Spin } from "antd";
import React from "react";
import { useState, useEffect } from "react";
import HomeHeader from "./components/Home_Header";

const { Meta } = Card;
export default function Home() {
  const [latestMovieData, setLatestMovieData] = useState({});
  console.log(latestMovieData);
  const { page, results = [], total_page, total_results } = latestMovieData;
  const [loading, setLoading] = useState(false);

  function fetchMovies(page) {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US&page=${page}`
    )
      .then((result) => result.json())
      .then(setLatestMovieData)
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    fetchMovies(1);
  }, []);

  return (
    <>
      <Spin spinning={loading}>
        <HomeHeader />

        <Row gutter={[16, 16]}>
          {results.map((movie) => (
            <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
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
        <Row style={{ marginTop: 32 }} justify="center">
          <Col>
            <Pagination
              current={latestMovieData.page}
              defaultCurrent={1}
              defaultPageSize={20}
              total={latestMovieData.total_results}
              showSizeChanger={false}
              onChange={fetchMovies}
            />
          </Col>
        </Row>
      </Spin>
    </>
  );
}
