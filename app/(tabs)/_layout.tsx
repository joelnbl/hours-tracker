import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { Icon } from '@/components/ui/icon';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { CircleUser, ClockIcon, LayoutDashboard } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: (props) => (
          <HapticTab
            {...props}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}
          />
        ),
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
        ios: {
          position: 'absolute',
          height: 100,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        default: {
          height: 100,
          backgroundColor: Colors[colorScheme ?? 'light'].background,
        },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Icon color={color} as={LayoutDashboard} className="w-8 h-8" />,
        }}
      />
      <Tabs.Screen
        name="entry"
        options={{
          title: '',
         tabBarIcon: ({ color }) => <Icon color={color} as={ClockIcon} className="w-8 h-8" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => <Icon color={color} as={CircleUser} className="w-8 h-8" />,
        }}
      />
    </Tabs>
  );
}
