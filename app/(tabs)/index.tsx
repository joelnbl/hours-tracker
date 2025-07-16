import { ScrollView, StyleSheet, View } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function SummaryScreen() {
  const me = { name: "Joel" };

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16 }}
      style={{ backgroundColor: "#fff" }}
    >
      <ThemedView style={styles.titleContainer}>
        <HelloWave />
        <ThemedText type="title">
          Bienvenido a tu registro de tiempo {me?.name || "Anonimo"!}!
        </ThemedText>
      </ThemedView>
      <View style={styles.spacer} />

      <ThemedView style={styles.summaryContainer}>
        <ThemedText type="subtitle" style={styles.summaryContainerText}>
          📊 Resumen Total
        </ThemedText>
        <ThemedText type="title" style={styles.summaryContainerTime}>
          0H 0M{" "}
        </ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.summaryContainerText}>
          (0.00 horas en decimal)
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },
    spacer: {
    height: 220, 
  },
  summaryContainer: {
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  summaryContainerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  summaryContainerTime: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center",
  },
});
