import App, { Container } from "next/app";
import React from "react";
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

    return { pageProps, locale, messages, initialNow };
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
