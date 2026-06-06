import { usePathname } from "expo-router";
import { View } from "react-native";
import { TabButton } from "./TabButton";


export default function Tabs() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  const basePath =
    segments.length >= 2
      ? `/${segments[0]}/${segments[1]}`
      : "/";

  const currentPath = pathname;

  const tabs = [
    {
      title: "Offers",
      href: `${basePath}/offers`,
    },
    {
      title: "About",
      href: basePath,
    }
  ];

  return (
    <View className="mt-4 flex-row gap-6 overflow-x-auto">
      {tabs.map(item => {
        const isActive = currentPath === item.href;

        return (
          <TabButton
            key={item.href}
            title={item.title}
            isActive={isActive}
            href={item.href}
          />
        );
      })}
    </View>
  );
}