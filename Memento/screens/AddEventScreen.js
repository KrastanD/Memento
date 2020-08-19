import React, { useState } from "react";
import { Text, View, Alert } from "react-native";
import postEvent from "../server/postEventAxios";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import GetLocation from "react-native-get-location";

export default function AddEventScreen({ navigation }) {
  const [evTitle, setEvTitle] = useState("");
  const [evDesc, setEvDesc] = useState("");
  const [evLoc, setEvLoc] = useState("");
  const [date, setDate] = useState(Date.now());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  let numberOfLines = 0;
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        mode="outlined"
        theme={{
          colors: { primary: "#01a699" },
        }}
        label="Enter event title*"
        style={{
          height: 40,
        }}
        onChangeText={(text) => setEvTitle(text)}
        value={evTitle}
      />

      <TextInput
        label="Enter description"
        theme={{
          colors: { primary: "#01a699" },
        }}
        mode="outlined"
        multiline
        onContentSizeChange={(event) => {
          numberOfLines = event.nativeEvent.contentSize.height / 18;
        }}
        numberOfLines={numberOfLines}
        onChangeText={(text) => setEvDesc(text)}
        value={evDesc}
      />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          label="Enter location"
          theme={{
            colors: { primary: "#01a699" },
          }}
          mode="outlined"
          style={{
            height: 40,
            flex: 1,
          }}
          onChangeText={(text) => setEvLoc(text)}
        />
        <TouchableOpacity
          style={{ paddingHorizontal: 5 }}
          onPress={() => {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                setEvLoc(
                  position["coords"]["latitude"] +
                    " " +
                    position["coords"]["longitude"]
                );
              },
              (error) => Alert.alert(error.message),
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
            );
          }}
        >
          <Icon name="crosshairs-gps" size={40}></Icon>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 5 }}>
        <Text> Date and time: {getFormattedDate(date)}</Text>
        {evLoc ? <Text> {"Location: " + evLoc} </Text> : null}
      </View>
      <View style={{ paddingTop: 5 }}>
        <TouchableOpacity
          style={{
            height: 50,
            alignItems: "center",
            backgroundColor: "#01a699",
            elevation: 2,
          }}
          onPress={showDatepicker}
        >
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              color: "white",
            }}
          >
            Change date
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingTop: 5 }}>
        <TouchableOpacity
          onPress={showTimepicker}
          style={{
            height: 50,
            alignItems: "center",
            backgroundColor: "#01a699",
            elevation: 2,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              color: "white",
            }}
          >
            Change time
          </Text>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          maximumDate={Date.now()}
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
      <View style={{ paddingTop: 15 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#01a699",
            height: 50,
            alignSelf: "center",
            backgroundColor: "#01a699",
            elevation: 2,
          }}
          onPress={() => {
            const d = new Date(date);
            postEvent(evTitle, evDesc, evLoc, d.toString());
            navigation.navigate("Events");
          }}
        >
          <Text
            style={{
              fontSize: 20,
              padding: 10,
              color: "white",
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function getFormattedDate(date) {
  const d = new Date(date);
  const dtf = d.toDateString() + " " + d.toLocaleTimeString();
  return dtf;
}
