import React from "react";
import AddEventScreen from "../AddEventScreen";
import renderer from "react-test-renderer";

beforeAll(() => {
  global.Date.now = jest.fn(() => new Date("2020-04-07T10:20:30Z").getTime());
});

it("snapshots AddEvent screen correctly", () => {
  const tree = renderer.create(<AddEventScreen />);
  expect(tree.toJSON()).toMatchSnapshot();
});

afterAll(() => {
  global.Date.now = Date.now();
});
