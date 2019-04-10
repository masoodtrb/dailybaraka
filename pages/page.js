import React, { Component } from "react";
import parse from "html-react-parser";
import * as pageService from "../services/page";

import Head from "../components/head";
import Nav from "../components/nav";

import "../styles/main.scss";

class Page extends Component {
  static async getInitialProps({ query }) {
    return {
      page: await pageService.getPageContent(query.slug)
    };
  }

  render() {
    const { page } = this.props;
    return (
      <div>
        <Head title="Sector" />
        <Nav />

        <div className="page rich-content">
          <div className="container">
            <h1>{page.title}</h1>
            <div className="rich-content__content">{parse(page.body)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
