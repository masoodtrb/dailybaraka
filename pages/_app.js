import App, { Container } from "next/app";
import React from "react";
import { setCookie } from "nookies";
import URL from "url-parse";
import { IntlProvider, addLocaleData } from "react-intl";

import en from "react-intl/locale-data/en.js";
import de from "react-intl/locale-data/de.js";
import fr from "react-intl/locale-data/fr.js";
import es from "react-intl/locale-data/es.js";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    // Get the `locale` and `messages` from the request object on the server.
    // In the browser, use the same values that the server serialized.
    const { req } = ctx;
    const { locale, messages } = req || window.__NEXT_DATA__.props;
    const initialNow = Date.now();

    if (!locale) {
      const splittedUrl = req.originalUrl.split("/");
      if (splittedUrl.length > 0) locale = splittedUrl[1];
      else locale = "en";
    }

    if (locale) {
      setCookie(ctx, "lang", locale.toUpperCase(), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/"
      });
    }

    return { pageProps, locale, messages, initialNow };
  }

  componentDidUpdate() {
    const header = document.getElementsByClassName("header");
    const footer = document.getElementsByClassName("footer");
    const page = document.getElementsByClassName("page");

    if (header.length && footer.length && page.length) {
      page[0].style.minHeight = `calc(100vh - ${header[0].clientHeight}px - ${
        footer[0].clientHeight
      }px)`;
    }
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
          <Component {...pageProps} />
        </IntlProvider>
      </Container>
    );
  }
}
