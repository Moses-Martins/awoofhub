// app/(drawer)/_layout.tsx
import CustomDrawerContent from "@/components/drawer/CustomDrawerContent";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: "50%" },
        drawerItemStyle: { display: "none" }, 
      }}
    >
      <Drawer.Screen name="(tabs)" />
    </Drawer>
  );
}