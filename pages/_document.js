import Document, { Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default class MyDocument extends Document {
  render() {
    const { query } = this.props.__NEXT_DATA__;
    return (
      <html>
        <Head />
        <body>
          <Main />

          <div className="footer">
            <div className="container">
              <div className="columns">
                <div className="column is-7">
                  <a href="#" target="_blank" rel="noreferrer noopener">
                    <img
                      src="/static/images/appstore.png"
                      alt="Download from AppStore"
                    />
                  </a>
                  &nbsp;
                  <a href="#" target="_blank" rel="noreferrer noopener">
                    <img
                      src="/static/images/playstore.png"
                      alt="Download from PlayStore"
                    />
                  </a>
                  <hr />
                  <p className="copyright">
                    © 2019 All Rights Reserved. DailyBaraka Holdings Ltd
                    <Link
                      href={`/page?slug=terms&lang=${query.lang}`}
                      as={`/${query.lang}/page/terms`}
                    >
                      <a>Terms &amp; Conditions</a>
                    </Link>
                    <Link
                      href={`/page?slug=privacy&lang=${query.lang}`}
                      as={`/${query.lang}/page/privacy`}
                    >
                      <a>Privacy policy</a>
                    </Link>
                  </p>
                </div>
                <div className="column is-narrow">
                  <div className="footer__links">
                    <h3>Business Enquiries</h3>
                    <ul>
                      <li>
                        <Link
                          href={`/page?slug=services&lang=${query.lang}`}
                          as={`/${query.lang}/page/services`}
                        >
                          <a>Services</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/page?slug=commercial-enquiries&lang=${
                            query.lang
                          }`}
                          as={`/${query.lang}/page/commercial-enquiries`}
                        >
                          <a>Suppliers</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/page?slug=commercial-enquiries&lang=${
                            query.lang
                          }`}
                          as={`/${query.lang}/page/commercial-enquiries`}
                        >
                          <a>Local stores/Service providers</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="column is-narrow">
                  <div className="footer__links">
                    <h3>Consumer</h3>
                    <ul>
                      <li>
                        <Link
                          href={`/page?slug=services&lang=${query.lang}`}
                          as={`/${query.lang}/page/services`}
                        >
                          <a>Your feed</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/page?slug=contact-us&lang=${query.lang}`}
                          as={`/${query.lang}/page/contact-us`}
                        >
                          <a>Support</a>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={`/sections?lang=${query.lang}`}
                          as={`/${query.lang}/sections`}
                        >
                          <a>Explore</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}
