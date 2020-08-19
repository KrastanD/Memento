import getEventsJson from "../eventsAxios";

it("resolves resolves", () => {
  getEventsJson().resolves;
});

it("is not undefined", () => {
  getEventsJson().then((resp) => {
    expect(resp).not.toBeUndefined();
  });
});

it("is a list", () => {
  getEventsJson().then((resp) => {
    expect(resp).toMatchObject([]);
  });
});
