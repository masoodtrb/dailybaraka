import React, { Component } from "react";
import Link from "next/link";

import { FormattedMessage, FormattedHTMLMessage } from "react-intl";

class Layout extends Component {
  render() {
    const { locale, loading } = this.props;

    return (
      <React.Fragment>
        {this.props.children}

        {loading && (
          <div className="loading">
            <div className="loading__modal">
              <div className="loading__indicator">
                <i class="fas fa-spinner" />
              </div>
              <h4>
                <FormattedMessage
                  id="common.loading"
                  defaultMessage="Loading..."
                />
              </h4>
            </div>
          </div>
        )}
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
                  <FormattedMessage
                    id="footer.copy-rights"
                    defaultMessage="© 2019 All Rights Reserved. DailyBaraka Holdings Ltd"
                  />
                  <Link
                    href={`/page?slug=terms&lang=${locale}`}
                    as={`/${locale}/page/terms`}
                  >
                    <a>
                      <FormattedHTMLMessage
                        id="footer.terms"
                        defaultMessage="Terms &amp; Conditions"
                      />
                    </a>
                  </Link>
                  <Link
                    href={`/page?slug=privacy&lang=${locale}`}
                    as={`/${locale}/page/privacy`}
                  >
                    <a>
                      <FormattedMessage
                        id="footer.privacy"
                        defaultMessage="Privacy policy"
                      />
                    </a>
                  </Link>
                </p>
              </div>

              <div className="column is-narrow">
                <div className="footer__links">
                  <h3>
                    <FormattedMessage
                      id="footer.business-enquiries"
                      defaultMessage="Privacy policy"
                    />
                  </h3>
                  <ul>
                    <li>
                      <Link
                        href={`/page?slug=services&lang=${locale}`}
                        as={`/${locale}/page/services`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.services"
                            defaultMessage="Services"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/commercial-enquiries?lang=${locale}`}
                        as={`/${locale}/commercial-enquiries`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.suppliers"
                            defaultMessage="Suppliers"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/commercial-enquiries?lang=${locale}`}
                        as={`/${locale}/commercial-enquiries`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.store-providers"
                            defaultMessage="Local stores/Service providers"
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="column is-narrow">
                <div className="footer__links">
                  <h3>
                    <FormattedMessage
                      id="footer.consumer"
                      defaultMessage="Consumer"
                    />
                  </h3>
                  <ul>
                    <li>
                      <Link
                        href={`/user-feeds?lang=${locale}`}
                        as={`/${locale}/user-feeds`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.user-feed"
                            defaultMessage="Your feed"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/page?slug=contact-us&lang=${locale}`}
                        as={`/${locale}/page/contact-us`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.support"
                            defaultMessage="Support"
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href={`/sectors?lang=${locale}`}
                        as={`/${locale}/sectors`}
                      >
                        <a>
                          <FormattedMessage
                            id="footer.explore"
                            defaultMessage="Explore"
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
export default Layout;
