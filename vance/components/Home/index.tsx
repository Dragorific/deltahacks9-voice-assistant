import { useState, useEffect } from "react";
import Tts from 'react-native-tts';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import Record from "../Record";
import axios from "axios";
export default function Home() {
  const [speechText, setSpeechText] = useState("");
  const [code, setCode] = useState("");
  const [disableRec, setDisableRec] = useState(false);

  const callApi = async(prompt: string) => {
    const {data} = await axios.post("http://192.168.0.7:3000/api/voice-chat", { question: prompt });
    console.log(data);
    console.log(data.response);
    Tts.speak(data.response);
    return data;
  }

  Tts.getInitStatus().then(() => {
    Tts.setDefaultVoice('en-us-x-tpd-network');
  });
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Speech Text</Text>
        <TextInput
          multiline
          style={styles.textInput}
          numberOfLines={3}
          value={speechText}
          maxLength={500}
          editable={false}
        />
        <Text style={styles.label}>Code</Text>
        <TextInput
          multiline
          style={styles.textInput}
          numberOfLines={6}
          value={code}
          maxLength={500}
          editable={false}          
        />
        <View
          style={{
            alignItems: "flex-end",
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            title="Clear"
            color={"#007AFF"}
            onPress={() => {
              setSpeechText("");
            }}
          />
        </View>
      </View>
      <View style={styles.voiceContainer}>
        <Record
          onSpeechEnd={(value) => {
            setSpeechText(value[0]);
            const result = callApi(value[0]);
          }}
          onSpeechStart={() => {
            setSpeechText("");
          }}
          recDisabled={disableRec}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F5FCFF",
  },
  label: {
    fontWeight: "bold",
    fontSize: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    height: "50%",
    width: "100%",
    flex: 1,
    padding: 10,
    //justifyContent: "center",
  },
  textInput: {
    padding: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
    height: 200,
    borderRadius: 5,
  },
  saveButton: {
    right: 0,
  },
  voiceContainer: {
    height: "20%",
    width: "25%",
    alignItems: "center",
    //justifyContent: "space-around",
  },
});