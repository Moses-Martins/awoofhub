import FontAwesome from '@expo/vector-icons/FontAwesome';
import Foundation from '@expo/vector-icons/Foundation';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(message)"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="comments" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(notification)"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bell" size={28} color={color} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="(wishlist)"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="heart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}