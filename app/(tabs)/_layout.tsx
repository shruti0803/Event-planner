import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Events" }} />
      <Stack.Screen name="add" options={{ title: "Add Event" }} />
      <Stack.Screen name="[id]" options={{ title: "Event Details" }} />
    </Stack>
  );
}
