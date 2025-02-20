import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { VolunteerProvider } from '@/hooks/volunteer';

export default function TabsLayout() {
  return (
    <VolunteerProvider>
      <Tabs screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}>
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarStyle: { display: 'none' }
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons name="home-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="volunteer"
          options={{
            title: 'Volunteer',
            tabBarIcon: ({ color }) => <Ionicons name="people-outline" size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={24} color={color} />,
          }}
        />
      </Tabs>
    </VolunteerProvider>
  );
}