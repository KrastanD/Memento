import React, { useEffect, useState } from "react";
import { Card } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Text, View, TouchableOpacity, Linking } from "react-native";

export default function ExpandableCard({ event }) {
  const [isOpen, setOpen] = useState(false);

  return (
    <Card>
      <View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 15 }}>{event.eventTitle}</Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 15, textAlign: "right" }}>
              {getTime(event)}
            </Text>
            {!isOpen ? (
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  setOpen(!isOpen);
                }}
              >
                <Icon name="chevron-down" size={20} color="#01a699"></Icon>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => {
                  setOpen(!isOpen);
                }}
              >
                <Icon name="chevron-up" size={20} color="#01a699"></Icon>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {isOpen && (
          <View>
            {event.description ? (
              <Text style={{ fontSize: 14 }}>
                {"Description: " + event.description}
              </Text>
            ) : null}
            {event.location ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(
                    "https://www.google.com/maps/search/?api=1&query=" +
                      event.location
                  );
                }}
              >
                <Text style={{ fontSize: 14, textDecorationLine: "underline" }}>
                  {"Location: " + event.location}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        )}
      </View>
    </Card>
  );
}

function getTime(event) {
  var hours = event.timePostedDate.getHours();
  var minutes = event.timePostedDate.getMinutes();
  if (minutes == "0") {
    minutes = "00";
  }
  if (hours == "0") {
    hours = "00";
  }
  return hours + ":" + minutes;
}
