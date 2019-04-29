import Document, { Head, Main, NextScript } from "next/document";
import { defineMessages, injectIntl } from "react-intl";
import Link from "next/link";

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const props = await super.getInitialProps(context);
    const {
      req: { locale }
    } = context;
    return {
      ...props,
      locale
    };
  }

  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />

          <div className="footer">
            <div className="container">
              <p className="copyright">
                2019 - All right reserved for daily baraka
              </p>

              <ul className="footer__links">
                <li>
                  <Link href="/page/terms">
                    <a>Terms &amp; Conditions</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
