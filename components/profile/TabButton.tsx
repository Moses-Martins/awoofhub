import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

function capitalize(word: string) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

interface Props {
  isActive?: boolean;
  title: string;
  href: string;
}

export function TabButton({ isActive, title, href }: Props) {
  return (
    <Pressable
      accessibilityLabel={title}
      onPress={() => router.replace(href)}
      className="flex flex-col items-center gap-2"
    >
      <Text
        className={
          isActive
            ? "font-bold text-black"
            : "font-semibold text-gray-600"
        }
      >
        {capitalize(title)}
      </Text>

      {isActive && (
        <View className="h-[2px] w-full bg-black" />
      )}
    </Pressable>
  );
}