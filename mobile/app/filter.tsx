import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useContext, useState } from "react";
import { FlexView } from "../components/themed/flex-view";
import { Label } from "../components/themed/label";
import { TextBox } from "../components/themed/text-box";
import { Touchable } from "../components/themed/touchable";
import { FilterContext } from "../api/filter-context";

export default function FilterScreen() {
  const [filterParams, setFilterParams] = useContext(FilterContext);

  const { back } = useRouter();
  const [name, setName] = useState(filterParams.name ?? "");
  const [author, setAuthor] = useState(filterParams.authorEditor ?? "");
  const [origin, setOrigin] = useState(filterParams.origin ?? "");
  const [desc, setDesc] = useState(filterParams.comment ?? "");
  const [publishingHouse, setPublishingHouse] = useState(
    filterParams.publishingHouse ?? ""
  );

  async function onApply() {
    const filters: { [key: string]: number | string } = {};
    if (name.length > 0) {
      filters.name = name;
    }
    if (author.length > 0) {
      filters.authorEditor = author;
    }
    if (origin.length > 0) {
      filters.origin = origin;
    }
    if (publishingHouse.length > 0) {
      filters.publishingHouse = publishingHouse;
    }
    if (desc.length > 0) {
      filters.comment = desc;
    }
    console.log(filters);
    setFilterParams({ ...filters });

    back();
  }
  async function onClear() {
    setFilterParams({});

    back();
  }

  return (
    <FlexView paddingBottom="40%">
      <FlexView>
        <Label textAlign="left">Kitap Ismi</Label>
        <TextBox
          padding={8}
          textAlign="left"
          onChangeText={setName}
        >
          {name}
        </TextBox>
      </FlexView>
      <FlexView>
        <Label textAlign="left">Yazar Ismi</Label>
        <TextBox
          padding={8}
          textAlign="left"
          onChangeText={setAuthor}
        >
          {author}
        </TextBox>
      </FlexView>
      <FlexView>
        <Label textAlign="left">Köken</Label>
        <TextBox
          padding={8}
          textAlign="left"
          onChangeText={setOrigin}
        >
          {origin}
        </TextBox>
      </FlexView>
      <FlexView>
        <Label textAlign="left">Aciklama</Label>
        <TextBox
          padding={8}
          textAlign="left"
          onChangeText={setDesc}
        >
          {desc}
        </TextBox>
      </FlexView>
      <FlexView>
        <Label textAlign="left">Yayin Evi</Label>
        <TextBox
          padding={8}
          textAlign="left"
          onChangeText={setPublishingHouse}
        >
          {publishingHouse}
        </TextBox>
      </FlexView>
      <Touchable
        width="100%"
        onPress={onApply}
        backgroundColor={"#27374D"}
      >
        Uygula
      </Touchable>
      <Touchable
        width="100%"
        marginTop={12}
        onPress={onClear}
        backgroundColor={"tomato"}
      >
        Temizle
      </Touchable>
      <StatusBar style="light" />
    </FlexView>
  );
}
