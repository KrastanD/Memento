import React from "react";
import App from "../App";
import renderer from "react-test-renderer";

it("snapshots App screen correctly", () => {
  const tree = renderer.create(<App />);
  expect(tree.toJSON()).toMatchSnapshot();
});
