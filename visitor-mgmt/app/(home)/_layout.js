import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { Text } from '@ui-kitten/components';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth'
function TabBarIcon(props) {
    return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function HomeLayout() {
    const colorScheme = useColorScheme();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
                    headerRight: () => (
                        // <Link href="/modal" asChild>
                        <Pressable onPress={() => signOut(auth)}>
                            {({ pressed }) => (
                                <Text
                                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                >{"Logout"}
                                </Text>
                            )}
                        </Pressable>
                        // </Link>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <Ionicons name="person-circle" size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
