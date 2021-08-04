import React, { useState } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Row, Col } from "antd";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/components/Search/Search";
import "./assets/css/global.css";
const { Header, Content, Footer } = Layout;
import Nav from "./pages/components/Nav";
import Auth from "./pages/Auth.jsx";
import MoviesPage from "./pages/MoviesPage";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <Nav />
      </Header>
      <Content
        className="site-layout"
        style={{ padding: "0 50px", marginTop: 64 }}
      >
        {/* <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          className="site-layout-background"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Row>
            <Col span={24}>
              <Search />
            </Col>
          </Row>
          <Switch>
            <Route exact path="/Home/:id">
              <MoviesPage />
            </Route>

            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/auth">
              <Auth />
            </Route>
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  );
}

export default App;
