import { Row, Col } from "antd";
import React from "react";
export default function Container({ children }) {
  return (
    <Row justify="center">
      <Col xs={24} sm={20} md={18} lg={16} xl={14}>
        {children}
      </Col>
    </Row>
  );
}
