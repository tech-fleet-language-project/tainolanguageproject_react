import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Link, Tabs } from 'native-router-react';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

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
				tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
			}}
		>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="code" color={color} />;
          },
          headerRight: () => {
            return (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => {
                    return (
                      <FontAwesome
                        name="info-circle"
												size={25}
												color={Colors[colorScheme ?? 'light'].text}
												style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
											/>
										);
									}}
								</Pressable>
              </Link>
            );
          },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => {
            return <TabBarIcon name="code" color={color} />;
          },
        }}
      />
    </Tabs>
  );
}
