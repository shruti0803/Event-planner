import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const router = useRouter();

  const saveEvent = async () => {
    const newEvent = {
      id: Date.now(),
      title,
      date,
      time,
      desc,
    };

    const stored = await AsyncStorage.getItem("events");
    const events = stored ? JSON.parse(stored) : [];
    events.push(newEvent);
    await AsyncStorage.setItem("events", JSON.stringify(events));
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="e.g., 2025-10-18"
      />

      <Text style={styles.label}>Time</Text>
      <TextInput
        style={styles.input}
        value={time}
        onChangeText={setTime}
        placeholder="e.g., 5:00 PM"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput style={styles.input} value={desc} onChangeText={setDesc} multiline />

      <Button title="Save Event" onPress={saveEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
  },
});
