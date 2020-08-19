import React from "react";
import ExpandableCard from "../ExpandableCard";
import renderer from "react-test-renderer";
import Event from "../../models/Event";

mockedJson = {
  _id: "123",
  eventTitle: "Mocked Event",
  description: "Mocked Description",
  timePosted: "Wed Apr 1 2020 13:11:13 GMT-0500 (CDT)",
};

it("snapshots expandable card component correctly", () => {
  var ev = new Event(mockedJson);
  const tree = renderer.create(<ExpandableCard event={ev} />);
  expect(tree.toJSON()).toMatchSnapshot();
});

mockedJson2 = {
  _id: "134",
  eventTitle: "Mocking missing description",
  timePosted: "Wed Apr 1 2020 13:11:13 GMT-0500 (CDT)",
};

it("snapshots expendable card component with missing description", () => {
  var ev = new Event(mockedJson2);
  const tree = renderer.create(<ExpandableCard event={ev} />);
  expect(tree.toJSON()).toMatchSnapshot();
});

mockedJson3 = {
  _id: "134",
  eventTitle: "Mocking with location and no description",
  timePosted: "Wed Apr 1 2020 13:11:13 GMT-0500 (CDT)",
  location: "Siebel",
};

it("snapshots expendable card component with location and without description", () => {
  var ev = new Event(mockedJson3);
  const tree = renderer.create(<ExpandableCard event={ev} />);
  expect(tree.toJSON()).toMatchSnapshot();
});

mockedJson4 = {
  _id: "134",
  eventTitle: "Mocking with location and description",
  description: "Mocked Description",
  timePosted: "Wed Apr 1 2020 13:11:13 GMT-0500 (CDT)",
  location: "Siebel",
};

it("snapshots expendable card component with location and without description", () => {
  var ev = new Event(mockedJson4);
  const tree = renderer.create(<ExpandableCard event={ev} />);
  expect(tree.toJSON()).toMatchSnapshot();
});
