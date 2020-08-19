class Event {
  constructor(json) {
    if (json == "{}") {
      this.id = "";
      this.eventTitle = "";
      this.description = "";
      this.timePostedString = "";
      this.timePostedDate = "";
    } else {
      this.id = json["_id"];
      this.eventTitle = json["eventTitle"];
      this.description = json["description"];
      var d = json["timePosted"];
      this.timePostedDate = new Date(d);
      this.timePostedString = this.timePostedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
      this.location = json["location"];
    }
  }
}
export default Event;
