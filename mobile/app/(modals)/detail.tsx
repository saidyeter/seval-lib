import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet } from "react-native";
import { z } from "zod";
import { View, Text } from "../../components/Themed";
import api from "../../api/client";

const paramsSchema = z.object({
  id: z.number().optional(),
});

export default function DetailScreen() {
  const params = useSearchParams() as z.infer<typeof paramsSchema>;

  if (!params.id) {
    return <Text>loading</Text>;
  }

  const {
    isLoading,
    data: book,
    error,
  } = useQuery({
    queryKey: ["bookdetail"],
    queryFn: () => api.book(params.id ?? -1),
  });
  if (isLoading) return <Text>loading</Text>;

  if (error) {
    console.log("book detail fetch erro ", error);
    return <Text>loading</Text>;
  }

  if (!book) {
    return <Text>loading</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <InfoItem
        desc="Id"
        value={book.id}
      />
      <InfoItem
        desc="Publishing House"
        value={book.publishingHouse}
      />
      <InfoItem
        desc="Author Editor"
        value={book.authorEditor}
      />
      <InfoItem
        desc="Page Count"
        value={book.pageCount}
      />
      <InfoItem
        desc="Origin"
        value={book.origin}
      />
      <InfoItem
        desc="Original Name"
        value={book.originalName}
      />
      <InfoItem
        desc="Print"
        value={book.print}
      />
      <InfoItem
        desc="Translator"
        value={book.translator}
      />
      <InfoItem
        desc="Kind"
        value={book.kind}
      />
      <InfoItem
        desc="Obtainedin"
        value={book.obtainedin}
      />
      <InfoItem
        desc="IsRead"
        value={book.isRead ? "ok" : "not"}
      />
      <InfoItem
        desc="Comment"
        value={book.comment}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
function InfoItem(params: {
  desc: string;
  value: string | number | undefined;
}) {
  if (!params.value) {
    return <></>;
  }
  return (
    <>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 10 }}>
        <View style={{ width: 100, justifyContent: "center" }}>
          <Text style={{ fontSize: 16 }}>{params.desc}</Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "600" }}>
            {params.value}
          </Text>
        </View>
      </View>

      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "normal",
  },
  regular: {
    fontSize: 24,
  },
  separator: {
    // marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
