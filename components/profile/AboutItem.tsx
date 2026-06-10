import { Text, View } from "react-native";

interface IconProps {
  size?: number;
  color?: string;
}

interface Props {
  field: string;
  value: string | null;
  Icon: React.ComponentType<IconProps>;
}

export function AboutItem({ field, value, Icon }: Props) {
  return (
    <View className="flex-row items-stretch">
      <View className="flex-row items-center gap-2 rounded-l-3xl bg-gray-300 p-2">
        <Icon size={20} color="#1f2937" />
        <Text className="text-sm font-medium text-gray-800">
          {field}
        </Text>
      </View>

      <View className="flex-1 justify-center rounded-r-3xl border border-gray-300 px-4">
        <Text className="text-sm font-semibold text-gray-900">
          {value || "Not set"}
        </Text>
      </View>
    </View>
  );
}