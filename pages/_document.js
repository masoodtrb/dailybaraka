import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head />
        <body>
          <Main />
          <NextScript />

          <div className="footer">
            <div className="container">
              <ul className="social">
                <li>
                  <a href="">IN</a>
                </li>
                <li>
                  <a href="">TW</a>
                </li>
                <li>
                  <a href="">FB</a>
                </li>
              </ul>

              <p className="copyright">
                2019 - All right reserved for daily baraka
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
