import { Text, View } from "./Themed";
import { bookSchema } from "../api/models";
import { StyleSheet } from "react-native";
import { z } from "zod";

export default function ListItem(params : z.infer<typeof bookSchema>) {
    return <View style={styles.container}>
        <Text>{params.name}</Text>
    </View>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      justifyContent: "center",
      height: 60,
      borderColor:'red',
      borderWidth:1,
      margin:5,
      gap:5,
      padding:5
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
  });
  