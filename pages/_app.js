import App, { Container } from "next/app";
import React from "react";
import { setCookie } from "nookies";
import URL from "url-parse";
import { IntlProvider, addLocaleData } from "react-intl";
import Router from "next/router";

import Layout from "../components/layout";

import en from "react-intl/locale-data/en.js";
import de from "react-intl/locale-data/de.js";
import fr from "react-intl/locale-data/fr.js";
import es from "react-intl/locale-data/es.js";

const fixPageHeight = () => {
  const header = document.getElementsByClassName("header");
  const footer = document.getElementsByClassName("footer");
  const page = document.getElementsByClassName("page");

  if (header.length && footer.length && page.length) {
    page[0].style.minHeight = `calc(100vh - ${header[0].clientHeight}px - ${
      footer[0].clientHeight
    }px)`;
  }
};

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req, res } = ctx;
    let { locale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();

    if (!locale) {
      const splittedUrl = req.originalUrl.split("/");
      if (
        splittedUrl.length > 0 &&
        ["en", "de", "fr", "es"].indexOf(splittedUrl[1]) > -1
      ) {
        locale = splittedUrl[1];
      } else {
        res.statusCode = 404;
        throw new Error("Page not found");
      }
    }

    if (locale) {
      setCookie(ctx, "lang", locale.toUpperCase(), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
    }

    return { pageProps, locale, messages, initialNow };
  }

  state = {
    loading: false
  };

  componentDidMount() {
    fixPageHeight();
    setTimeout(() => {
      fixPageHeight();
    }, 500);

    let timeoutIndicator;
    Router.events.on("routeChangeStart", url => {
      timeoutIndicator = setTimeout(() => {
        this.setState({
          loading: true
        });
      }, 1000);
    });
    Router.events.on("routeChangeComplete", () => {
      clearTimeout(timeoutIndicator);
      this.setState({
        loading: false
      });
    });
    Router.events.on("routeChangeError", () => {
      clearTimeout(timeoutIndicator);
      this.setState({
        loading: false
      });
    });
  }

  componentDidUpdate() {
    fixPageHeight();
  }

  render() {
    const { Component, pageProps, locale, messages, initialNow } = this.props;
    addLocaleData([...en, ...de, ...fr, ...es]);

    return (
      <Container>
        <IntlProvider
          locale={locale}
          messages={messages}
          initialNow={initialNow}
        >
          <Layout locale={locale} loading={this.state.loading}>
            <Component {...pageProps} />
          </Layout>
        </IntlProvider>
      </Container>
    );
  }
}
