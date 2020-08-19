import postEvent from "../postEventAxios";

it("is falsy if no arguments", () => {
  expect(postEvent()).toBeFalsy();
});

it("incorrectly posts a test example", () => {
  expect(postEvent("Test title", "Test Description")).toBeFalsy();
});

// it("posts a test example", () => {
//   act(() => {
//     var st = postEvent("Test title", "Test Description", Date.now());
//     console.log(st);
//   });
// });
