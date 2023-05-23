import { bookSchema } from "../api/models";
import { Pressable } from "react-native";
import { z } from "zod";
import { Icon } from "./Icon";
import { Link } from "expo-router";
import { FlexView } from "./themed/flex-view";
import { Label } from "./themed/label";

export default function ListItem(params: z.infer<typeof bookSchema>) {
  const iconcolor = "white"; //"#92B4EC";
  const numbercolor = "white"; //"#F7ECDE";
  return (
    <FlexView
      flexDirection="row"
      justifyContent="flex-start"
      gap={5}
      padding={5}
      borderRadius={5}
    >
      <FlexView>
        <Label
          fontWeight="600"
          color={numbercolor}
        >
          {params.id ?? -1}
        </Label>
      </FlexView>
      <FlexView
        alignItems="flex-start"
        flex={7}
      >
        <FlexView
          flexDirection="row"
          justifyContent="flex-start"
        >
          <Icon
            name="book"
            iconsize="s"
            color={iconcolor}
          />
          <Label
            numberOfLines={1}
            fontWeight="600"
            size="m"
            textAlign="left"
          >
            {params.name ?? ""}
          </Label>
        </FlexView>
        <FlexView
          flexDirection="row"
          justifyContent="flex-start"
        >
          <Icon
            name="user"
            iconsize="s"
            color={iconcolor}
          />
          <Label
            size="s"
            numberOfLines={1}
            textAlign="left"
          >
            {params.authorEditor ?? ""}
          </Label>
        </FlexView>
        <FlexView
          flexDirection="row"
          justifyContent="flex-start"
        >
          <Icon
            name="file-text-o"
            iconsize="s"
            color={iconcolor}
          />
          <Label
            width={"15%"}
            size="s"
            textAlign="left"
          >
            {params.pageCount ?? -1}
          </Label>
          <Icon
            name="home"
            iconsize="s"
            color={iconcolor}
          />
          <Label
            fontStyle="italic"
            width={"50%"}
            size="s"
            textAlign="left"
          >
            {params.publishingHouse ?? ""}
          </Label>
        </FlexView>
      </FlexView>

      <FlexView>
        <Link
          href={{ pathname: "/detail", params: { id: params.id } }}
          asChild
        >
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [
              {
                transform: [{ scale: pressed ? 0.8 : 1 }],
                backgroundColor: "#ECF2FF",
                padding: 5,
                borderRadius: 50,
              },
            ]}
          >
            <Icon
              name="chevron-circle-right"
              iconsize="m"
              color="#B2C8DF"
            />
          </Pressable>
        </Link>
      </FlexView>
    </FlexView>
  );
}
const colors = [
  "#A6D0DD",
  "#FF6969",
  "#FFD3B0",
  "#E8A0BF",
  "#BA90C6",
  "#C7E9B0",
  "#CCD5AE",
  "#FFB4B4",
  "#FFACAC",
  "#FFAACF",
  "#FFCEFE",
  "#F8CBA6",
  "#CDE990",
  "#8DCBE6",
  "#FD8A8A",
  "#BCEAD5",
  "#9ED5C5",
  "#BCCEF8",
  "#ABD9FF",
  "#FFABE1",
  "#B1D7B4",
  "#F7ECDE",
  "#B2C8DF",
  "#C4D7E0",
  "#C7D36F",
  "#E0DECA",
  "#CDC2AE",
  "#92B4EC",
];
