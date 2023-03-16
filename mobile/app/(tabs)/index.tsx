import { FlatList, StyleSheet } from "react-native";
import api from "../../api/client";
import { Text, View } from "../../components/Themed";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListItem from "../../components/ListItem";
export default function HomeScreen() {
  const { isLoading, hasNextPage, data, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["repoData"],
      queryFn: ({ pageParam = 1 }) =>
        api.books({ pageNumber: parseInt(pageParam) }),
      getNextPageParam: (lastPage, allPages) =>
        lastPage?.pageCount ?? 0 > allPages.length
          ? allPages.length + 1
          : undefined,
    });
  if (!isLoading) {
    // console.log(data?.pages.length);

    // console.log(data?.pages[data?.pages.length - 1]?.items.length);
    // console.log(data?.pages[data?.pages.length - 1]?.items[0]);
  }
  function loadMore() {
    // console.log(hasNextPage);

    if (hasNextPage) {
      fetchNextPage();
    }
  }

  function extractKey(_: object, r: number) {
    // console.log(e,r,t);
    return r.toString();
  }

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text>loading</Text>
        </>
      ) : (
        <View style={styles.listWrapper}>
          <FlatList
            data={data?.pages.map(p=>p?.items).flat() as  ReadonlyArray<any> | null | undefined}
            renderItem={({ item }) => <ListItem {...item} />}
            keyExtractor={extractKey}
            onEndReached={loadMore}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  listWrapper: {
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: "80%",
  },
});
