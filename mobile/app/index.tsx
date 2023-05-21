import { FlatList } from "react-native";
import api from "../api/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import ListItem from "../components/ListItem";
import { FlexView } from "../components/themed/flex-view";
import { StatusBar } from "expo-status-bar";
export default function HomeScreen() {
  const { isLoading, hasNextPage, data, fetchNextPage } = useInfiniteQuery({
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
    <FlexView
      paddingBottom="10%"
      paddingHorizontal="5%"
      flex={1}
      width="100%"
    >
      <StatusBar style="light" />
      {data?.pages && (
        <FlatList
          data={
            data?.pages.map((p) => p?.items).flat() as
              | ReadonlyArray<any>
              | null
              | undefined
          }
          style={{
            width: "100%",
          }}
          renderItem={({ item }) => <ListItem {...item} />}
          keyExtractor={extractKey}
          onEndReached={loadMore}
          ItemSeparatorComponent={() => {
            return (
              <FlexView
                padding={0}
                margin={0}
                borderTopWidth={1}
                borderColor="white"
              />
            );
          }}
        />
      )}
    </FlexView>
  );
}
