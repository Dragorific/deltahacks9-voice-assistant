import { useState, useEffect } from "react";
import Tts from 'react-native-tts';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Pressable,
} from "react-native";
import Record from "../Record";
import axios from "axios";
export default function Home() {
  const [speechText, setSpeechText] = useState("");
  const [code, setCode] = useState("");
  const [disableRec, setDisableRec] = useState(false);

  const callApi = async(prompt: string) => {
    const {data} = await axios.post("http://192.168.0.103:3000/api/voice-chat", { question: prompt });
    let response = data.response;
    console.log(data);
    console.log(response);

    // Segmenting the code and speech seperately
    response = response.split("\n");
    let bool = false;
    let code = "";
    let speech = "";

    // Iterate over each line and seperate out the code blocks from the speech text
    for (let line of response){
      if(line.trim().startsWith("```") && !bool){
        bool = true;
        continue;
      } else if (line.trim().startsWith("```") && bool){
        bool = false;
        code += "\n\n"
        continue;
      }
    
      if(bool){
        code += line + "\n";
      } else {
        speech += line + "\n";
      }
    }

    // Speak without saying code
    Tts.speak(speech);
    
    // Set the boxes to the speech and code texts accordingly
    setSpeechText(speech);
    setCode(code);

    return data;
  }

  Tts.getInitStatus().then(() => {
    //Tts.setDefaultVoice('en-us-x-tpd-network');
  });
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.inputContainer}>
        <Text style={styles.label}>Speech Text</Text>
        <ScrollView style={styles.textInput}>
          <Text>
            {speechText}
          </Text>
        </ScrollView>
        <Text style={styles.label}>Code</Text>
        <ScrollView style={styles.textInput}>
          <Text>
            {code}        
          </Text>
        </ScrollView>
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
              setCode("");
            }}
          />
        </View>
      </ScrollView>
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
    height: 150,
    padding: 10,
    borderColor: "#d1d5db",
    borderWidth: 1,
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