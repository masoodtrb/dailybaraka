import Document, { Head, Main, NextScript } from "next/document";

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
                  <a href="https://instagram.com/">IN</a>
                </li>
                <li>
                  <a href="https://twitter.com/">TW</a>
                </li>
                <li>
                  <a href="https:/facebook.com/">FB</a>
                </li>
              </ul>

              <p className="copyright">
                2019 - All right reserved for daily baraka
              </p>
            </div>
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
