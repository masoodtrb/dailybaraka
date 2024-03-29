import React from "react";
import createComponentWithIntl from "../../utils/createComponentWithIntl";

import IndexPage from "../__test__/index";

describe("With Snapshot Testing", () => {
  it("Index Page shows as the snapshot", () => {
    const component = createComponentWithIntl(<IndexPage />);

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
