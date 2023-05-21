import FontAwesome from "@expo/vector-icons/FontAwesome";

export function Icon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color?: string;
  iconsize?: "xs" | "s" | "m" | "l" | "xl";
}) {
  return (
    <FontAwesome
      size={getSize(props.iconsize)}
      style={{ margin: 3 }}
      color={props.color ?? "white"}
      name={props.name}
    />
  );
}

function getSize(iconsize?: string) {
  let calculated_size = 20;
  switch (iconsize) {
    case "xs":
      calculated_size = 12;
      break;
    case "s":
      calculated_size = 16;
      break;
    case "l":
      calculated_size = 24;
      break;

    case "xl":
      calculated_size = 28;
      break;

    default:
      break;
  }
  return calculated_size;
}
