let server = require("../src/server/index");
let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;

chai.use(chaiHttp);

describe("check home", () => {
  it("should return correct home string", (done) => {
    chai
      .request(server)
      .get("/api")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal("Welcome to the Memento Api");
        done();
      });
  });
});

describe("get events", () => {
  it("should return list of events", (done) => {
    chai
      .request(server)
      .get("/api/events")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});

describe("post and delete events", () => {
  let targetEventId = "";

  it("should create an event", (done) => {
    let event = {
      eventTitle: "Mocha Test Event",
      description: "Mocha test event description",
      timePosted: Date.now(),
    };
    chai
      .request(server)
      .post("/api/event")
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should find _id of created event", (done) => {
    chai
      .request(server)
      .get("/api/events")
      .end((err, res) => {
        for (let i = 0; i < res.body.length; i++) {
          if (
            res.body[i].eventTitle === "Mocha Test Event" &&
            res.body[i].description === "Mocha test event description"
          ) {
            targetEventId = res.body[i]._id;
            break;
          }
        }
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(targetEventId).to.be.length.greaterThan(0);
        done();
      });
  });

  it("Should get event by id of created event", (done) => {
    chai
      .request(server)
      .get("/api/event/" + targetEventId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.eventTitle).to.equal("Mocha Test Event");
        expect(res.body.description).to.equal("Mocha test event description");
        done();
      });
  });

  it("deleted the created event", (done) => {
    chai
      .request(server)
      .delete("/api/event/" + targetEventId)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.text).to.equal(
          "Success: deleted event _id = " + targetEventId
        );
        done();
      });
  });
});
