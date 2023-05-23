import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { z } from "zod";
import api from "../api/client";
import { useState } from "react";
import { bookSchema } from "../api/models";
import { FlexView } from "../components/themed/flex-view";
import { Label } from "../components/themed/label";

const paramsSchema = z.object({
  id: z.number().optional(),
});

export default function DetailScreen() {
  const params = useSearchParams() as z.infer<typeof paramsSchema>;
  const [book, setBook] = useState<z.infer<typeof bookSchema> | undefined>(
    undefined
  );
  if (!params.id) {
    return <Label>loading</Label>;
  }

  useQuery({
    queryKey: ["bookdetail"],
    queryFn: () => api.book(params.id ?? -1),
    onSuccess: (data) => {
      console.log("selam");

      setBook(data);
    },
  });

  return (
    <FlexView paddingBottom="20%">
      <Label
        size="xl"
        fontWeight="bold"
        marginVertical={10}
      >
        {book?.name ?? ""}
      </Label>
      <FlexView
        noFlex
        borderTopWidth={1}
        borderColor="white"
      />
      <InfoItem
        desc="Id"
        value={book?.id}
      />
      <InfoItem
        desc="Publishing House"
        value={book?.publishingHouse}
      />
      <InfoItem
        desc="Author Editor"
        value={book?.authorEditor}
      />
      <InfoItem
        desc="Page Count"
        value={book?.pageCount}
      />
      <InfoItem
        desc="Origin"
        value={book?.origin}
      />
      <InfoItem
        desc="Original Name"
        value={book?.originalName}
      />
      <InfoItem
        desc="Print"
        value={book?.print}
      />
      <InfoItem
        desc="Translator"
        value={book?.translator}
      />
      <InfoItem
        desc="Kind"
        value={book?.kind}
      />
      <InfoItem
        desc="Obtainedin"
        value={book?.obtainedin}
      />
      <InfoItem
        desc="IsRead"
        value={book?.isRead ? "ok" : "not"}
      />
      <InfoItem
        desc="Comment"
        value={book?.comment}
      />

      <StatusBar style="light" />
    </FlexView>
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
    <FlexView
      flexDirection="row"
      height={50}
    >
      <FlexView>
        <Label
          paddingLeft={5}
          textAlign="left"
          // size="l"
          // fontWeight="600"
        >
          {params.desc}
        </Label>
      </FlexView>
      <FlexView flex={3}>
        <Label
          paddingLeft={5}
          textAlign="left"
          // size="l"
          fontWeight="600"
        >
          {params.value}
        </Label>
      </FlexView>
    </FlexView>
  );
}
