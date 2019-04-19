import Document, { Head, Main, NextScript } from "next/document";
import Link from "next/link";

import * as sectorService from "../services/sector";
export default class MyDocument extends Document {
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
