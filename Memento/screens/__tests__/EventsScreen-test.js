import React from "react";
import EventsScreen from "../EventsScreen";
import renderer from "react-test-renderer";

it("snapshots EventsScreen screen correctly", () => {
  const tree = renderer.create(<EventsScreen />);
  expect(tree.toJSON()).toMatchSnapshot();
});
