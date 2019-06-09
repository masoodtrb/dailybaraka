import Document, { Head, Main, NextScript } from "next/document";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export default class MyDocument extends Document {
  render() {
    const { query } = this.props.__NEXT_DATA__;
    return (
      <html>
        <Head />
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}
