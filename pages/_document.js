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
              <ul className="social">
                <li>
                  <a
                    className="social__instagram"
                    href="https://instagram.com/"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li>
                  <a className="social__twitter" href="https://twitter.com/">
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li>
                  <a className="social__facebook" href="https:/facebook.com/">
                    <i className="fab fa-facebook" />
                  </a>
                </li>
              </ul>

              <p className="copyright">
                2019 - All right reserved for daily baraka
              </p>

              <ul class="footer__links">
                <li>
                  <Link href="/terms">Terms &amp; Condition</Link>
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
