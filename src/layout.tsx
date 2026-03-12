import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens';
import PostScreen from './screens/posts';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from './screens/post-detail';
import UserDetailScreen from './screens/user-detail';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const PostStack = createStackNavigator();

export function PostNavigation() {
  return (
    <PostStack.Navigator>
      <PostStack.Screen name="Posts" component={PostScreen} />
      <PostStack.Screen
        name="Post Detail"
        component={PostDetailScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <PostStack.Screen
        name="User Detail"
        component={UserDetailScreen}
        options={{
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </PostStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <NavigationContainer>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BottomTab.Navigator  screenOptions={{ headerShown: false }}>
            <BottomTab.Screen name="home" component={HomeScreen} options={{
              title: 'Home',
              tabBarStyle: {
                paddingBottom: safeAreaInsets.bottom,}
            }} />
            <BottomTab.Screen name="posts" component={PostNavigation} options={{
              title: 'Posts',
            }} />
        </BottomTab.Navigator>
        </ThemeProvider>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
