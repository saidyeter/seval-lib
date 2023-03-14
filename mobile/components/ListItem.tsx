import { Text, View } from "./Themed";
import { bookSchema } from "../api/models";
import { StyleSheet } from "react-native";
import { z } from "zod";
import { Icon } from "./Icon";

export default function ListItem(params: z.infer<typeof bookSchema>) {
  return (
    <View style={styles.container}>
      <View style={styles.num}>
        <Text style={{ fontWeight: "600", color: "#4C3A51" }}>{params.id}</Text>
      </View>
      <View style={styles.info}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Icon
            name="book"
            color="#4C3A51"
            iconsize="sm"
          />
          <Text
            numberOfLines={1}
            style={{ fontWeight: "600", color: "#4C3A51" }}
          >
            {' '+params.name}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
        <Icon
            name="user"
            color="#4C3A51"
            iconsize="sm"
          />
          <Text
            numberOfLines={1}
            style={{ color: "#774360" }}
          >
            {' '+params.authorEditor+' '} 
          </Text>
          <Icon
            name="file-text-o"
            color="#4C3A51"
            iconsize="sm"
          />
          <Text
            numberOfLines={1}
            style={{ color: "#774360" }}
          >
            {' '+params.pageCount}
          </Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Icon
            name="home"
            color="#B25068"
            iconsize="sm"
          />
          <Text style={{ color: "#B25068", fontStyle: "italic" }}>
            {' '+params.publishingHouse}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subinfo: {
    flex: 1,
    height: 20,
    flexDirection: "row",
    // alignItems: "flex-start",
    // justifyContent: "flex-start",
    backgroundColor: "#ECF2FF",
  },
  num: {
    backgroundColor: "#ECF2FF",
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    margin: 5,
  },
  info: {
    width: "85%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 70,
    margin: 5,
    gap: 5,
    padding: 5,
    borderRadius: 5,
    shadowColor: "#5371A2",
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
