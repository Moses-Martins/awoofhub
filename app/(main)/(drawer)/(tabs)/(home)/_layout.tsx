import Header from "@/components/header/Header";
import { Stack } from "expo-router";
import { useState } from "react";

export default function HomeLayout() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          header: () => <Header isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
        }} 
      />
    </Stack>
  );
}