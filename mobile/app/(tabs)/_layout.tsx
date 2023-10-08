import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

//icons
import { Icon } from '@rneui/themed';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          borderRadius: 30,
        }
      }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Pets',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor:'#FF995C',
            borderRadius: 20,
          },
          tabBarIcon: ({ color }) => <Icon name="pets" color='#E8A87D' />,
          // headerRight: () => (
          //   <Link href="/modal" asChild>
          //     <Pressable>
          //       {({ pressed }) => (
          //         <FontAwesome
          //           name="info-circle"
          //           size={25}
          //           color='#fff'
          //           style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          //         />
          //       )}
          //     </Pressable>
          //   </Link>
          // ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          headerStyle: {
            backgroundColor:'#FF995C',
            borderRadius: 20,
          },
          tabBarIcon: ({ color }) => <Icon name="person" color='#E8A87D' />,
        }}
      />
    </Tabs>
  );
}
