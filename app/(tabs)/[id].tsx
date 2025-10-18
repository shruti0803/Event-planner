import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type EventType = {
  id: number;
  title: string;
  date: string;
  time: string;
  desc: string;
};

export default function EventDetails() {
  const { id } = useLocalSearchParams<{ id: string }>(); // ✅ explicitly type id
  const [event, setEvent] = useState<EventType | null>(null); // ✅ type state
  const router = useRouter();

  useEffect(() => {
    const loadEvent = async () => {
      const stored = await AsyncStorage.getItem("events");
      if (stored) {
        const events: EventType[] = JSON.parse(stored);
        const found = events.find((e) => e.id.toString() === id);
        setEvent(found || null);
      }
    };
    loadEvent();
  }, [id]);

  const deleteEvent = async () => {
    const stored = await AsyncStorage.getItem("events");
    const events: EventType[] = stored ? JSON.parse(stored) : [];
    const filtered = events.filter((e) => e.id.toString() !== id);
    await AsyncStorage.setItem("events", JSON.stringify(filtered));
    router.back();
  };

  if (!event) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.title}</Text>
      <Text>
        {event.date} | {event.time}
      </Text>
      <Text style={styles.desc}>{event.desc}</Text>
      <Button title="Delete Event" color="red" onPress={deleteEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  desc: { marginTop: 15, fontSize: 16 },
});
