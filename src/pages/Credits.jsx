import { useState, useEffect } from "react";

import React from "react";
import { Row, Col, Card } from "antd";

export default function Credits({ ID }) {
  const [credites, setCredits] = useState({});
  function fetchMovies() {
    console.log(
      "sal",
      `https://api.themoviedb.org/3/movie/${ID}/credits?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US`
    );
    fetch(
      `https://api.themoviedb.org/3/movie/${ID}/credits?api_key=86ba05b5b5ef9e6cd98405fff0572996&language=en-US`
    )
      .then((result) => result.json())
      .then((data) => setCredits(data));
  }
  useEffect(() => {
    fetchMovies();
  }, []);
  console.log("MATA", credites);
  return (
    <Row gutter={[16, 16]}>
      {credites?.cast?.map((movie, index) => {
        if (index > 9) {
          return null;
        }
        return (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
              hoverable
              cover={
                <img
                  alt={movie.original_title}
                  src={`https://image.tmdb.org/t/p/w500/${movie.profile_path}`}
                />
              }
            >
              <Card.Meta title={movie.name}></Card.Meta>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
