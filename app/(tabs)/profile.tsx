import { StyleSheet, View } from "react-native";

import { Grid, GridItem } from "@/components/ui/grid";
import { Text } from "@/components/ui/text";

export default function TabTwoScreen() {
  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#fff" }} >
      <Grid
      className="gap-5 bg-white min-h-screen"
      _extra={{
        className: "grid-cols-8",
      }}
    >
      <GridItem className="bg-red-100 p-6 rounded-md" _extra={{ className: "col-span-6" }}>
        <Text className="text-black">Item 1</Text>
      </GridItem>
      <GridItem className="bg-red-100 p-6 rounded-md" _extra={{ className: "col-span-6" }}>
        <Text className="text-black">Item 2</Text>
      </GridItem>
      <GridItem className="bg-red-100 p-6 rounded-md" _extra={{ className: "col-span-12" }}>
        <Text className="text-black">Item 3</Text>
      </GridItem>
    </Grid>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "column",
    gap: 8,
  },
  avatarImage: {
    textAlign: "center",
    height: 80,
    width: 80,
  },
});
