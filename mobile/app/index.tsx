import { FlatList } from "react-native";
import api, { booksParams, booksResultSchema } from "../api/client";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import ListItem from "../components/ListItem";
import { FlexView } from "../components/themed/flex-view";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { Label } from "../components/themed/label";
import { Icon } from "../components/Icon";
import { useContext, useEffect, useState } from "react";
import { FilterContext, FilterParamsSchema } from "../api/filter-context";
import { z } from "zod";
import { bookSchema } from "../api/models";

const booksSchema = bookSchema.array();

export default function HomeScreen() {
  const [filterParams, setFilterParams] = useContext(FilterContext);
  const [nextPageNumber, setNextPageNumber] = useState(1);
  const [finished, setFinished] = useState(false);
  const [books, setBooks] = useState<z.infer<typeof booksSchema> | undefined>(
    undefined
  );

  function getBooks(pageNumber: number) {
    api
      .books({ pageNumber: pageNumber, ...filterParams })
      .then((apiResponse) => {
        if (apiResponse?.hasNextPage) {
          setNextPageNumber(apiResponse?.currentPage + 1);
        } else {
          setFinished(true);
        }
        if (apiResponse?.currentPage === 1) {
          setBooks(apiResponse?.items ?? []);
        } else {
          setBooks((oldBooks) => [
            ...(oldBooks ?? []),
            ...(apiResponse?.items ?? []),
          ]);
        }
      });
  }

  useEffect(() => {
    getBooks(nextPageNumber);
  }, []);
  useEffect(() => {
    getBooks(1);
  }, [filterParams]);

  function loadMore() {
    if (!finished) {
      getBooks(nextPageNumber);
    }
  }

  function extractKey(_: object, r: number) {
    // console.log(e,r,t);
    return r.toString();
  }

  return (
    <FlexView
      paddingBottom="10%"
      paddingHorizontal={5}
      flex={1}
      width="100%"
    >
      <FlexView
        flexDirection="row"
        justifyContent="space-around"
      >
        <Link href={"new"}>
          <Icon name="plus" />
        </Link>
        <Link href={"filter"}>
          <Icon
            name="filter"
            color={JSON.stringify(filterParams).length > 2 ? "tomato" : "white"}
          />
        </Link>
      </FlexView>

      <FlexView flex={25}>
        {books && (
          <FlatList
            data={books.flat() as ReadonlyArray<any> | null | undefined}
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
      <StatusBar style="light" />
    </FlexView>
  );
}
