import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import getEventsJson from "../server/eventsAxios";
import { ScrollView } from "react-native-gesture-handler";
import Event from "../models/Event";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-paper";
import ExpandableCard from "../components/ExpandableCard";
const axios = require("axios");

export default function EventsScreen({ navigation, route }) {
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    getEventsJson(source)
      .then((resp) => {
        var events = [];
        resp.forEach((element) => {
          events.push(new Event(element));
        });
        events = events.filter(function (event) {
          return (
            event.eventTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !=
              -1 ||
            event.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !=
              -1
          );
        });
        var dict = {};
        events.forEach((item) => {
          if (item.timePostedString in dict) {
            dict[item.timePostedString].push(item);
          } else {
            dict[item.timePostedString] = [item];
          }
        });
        setEvents(dict);
        var dateArr = Object.keys(dict);
        var dateArr = dateArr.sort(
          (a, b) => dict[b][0].timePostedDate - dict[a][0].timePostedDate
        );
        setDates(dateArr);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
        } else {
          console.log(error);
        }
      });

    return function cleanup() {
      source.cancel();
    };
  }, [searchTerm, events]);

  return (
    <View style={{ flex: 1 }}>
      <React.Fragment>
        <ScrollView style={styles.container}>
          <View style={{ paddingHorizontal: 10, flexDirection: "row" }}>
            <TextInput
              label="Search"
              mode="outlined"
              theme={{
                colors: { primary: "#01a699" },
              }}
              style={{ flex: 1 }}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          {events != undefined &&
            dates != undefined &&
            dates.map(
              (date) =>
                events[date] != undefined &&
                events[date]
                  .slice(0)
                  .reverse()
                  .map((event, i) => (
                    <View key={i}>
                      {event == events[date][events[date].length - 1] ? (
                        <Text
                          style={{
                            fontSize: 14,
                            color: "gray",
                            paddingTop: 15,
                            paddingLeft: 15,
                          }}
                        >
                          {date}
                        </Text>
                      ) : null}
                      <ExpandableCard key={event.id} event={event} />
                    </View>
                  ))
            )}
        </ScrollView>
        <TouchableOpacity
          style={styles.addEventStyle}
          onPress={() => navigation.navigate("AddEvent")}
        >
          <Icon name="plus" size={30} color="white" />
        </TouchableOpacity>
      </React.Fragment>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fafafa",
  },
  addEventStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: "#01a699",
    borderRadius: 120,
    elevation: 2,
  },
});
