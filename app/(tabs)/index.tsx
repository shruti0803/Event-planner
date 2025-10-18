import { useEffect, useState } from "react";
import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter, useFocusEffect } from "expo-router";

type EventType = {
  id: number;
  title: string;
  date: string;
  time: string;
  desc: string;
};

export default function HomeScreen() {
  const [events, setEvents] = useState<EventType[]>([]);
  const router = useRouter();

  // ✅ Load events when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const loadEvents = async () => {
        const stored = await AsyncStorage.getItem("events");
        if (stored) {
          setEvents(JSON.parse(stored));
        } else {
          setEvents([]);
        }
      };
      loadEvents();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Events</Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/${item.id}`)}>
            <View style={styles.eventItem}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text>
                {item.date} | {item.time}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No events yet.</Text>}
      />

      <Button title="Add Event" onPress={() => router.push("/add")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  eventItem: {
    padding: 15,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    marginBottom: 10,
  },
  eventTitle: { fontSize: 18, fontWeight: "bold" },
});
