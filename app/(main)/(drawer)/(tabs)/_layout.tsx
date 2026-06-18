import { colors } from '@/styles/colors';
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
        name="(home)"
        options={{
          title: 'Home',
          tabBarIcon: ({focused}) => (
            <Foundation name="home" size={28} color={focused ? colors.primary : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Messages',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="comments" size={26} color={focused ? colors.primary : "gray"} />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="bell" size={24} color={focused ? colors.primary : "gray"} /> 
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="heart" size={24} color={focused ? colors.primary : "gray"} />
          ),
        }}
      />
    </Tabs>
  );
}