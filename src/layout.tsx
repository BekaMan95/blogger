import { DarkTheme, DefaultTheme, NavigationContainer, ThemeProvider } from '@react-navigation/native';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home';
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
        <BottomTab.Navigator  screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { 
          position: 'absolute',
          bottom: 10,
          elevation: 5,
          backgroundColor: colorScheme === 'dark' ? '#396da1' : '#000',
          borderRadius: 50,
          height: 50,
          marginHorizontal: 20,
          paddingBottom: 3,
          shadowColor: '#000',
          shadowOpacity: 0.5,
          shadowOffset: { width: 20, height: 20 },
          shadowRadius: 5,
        },
        })}>
            <BottomTab.Screen name="home" component={HomeScreen} options={{
              title: 'Home',
              tabBarStyle: {
                paddingBottom: safeAreaInsets.bottom,},
              tabBarIcon: ({ focused }) => {
                const iconSource = require('../assets/home.png');
                
                return (
                  <Image
                    source={iconSource}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? '#2196F3' : 'gray',
                    }}
                  />
                );
              },
            }} />
            <BottomTab.Screen name="posts" component={PostNavigation} options={{
              title: 'Posts',
              tabBarIcon: ({ focused }) => {
                const iconSource = require('../assets/posts.png');
                
                return (
                  <Image
                    source={iconSource}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: focused ? '#2196F3' : 'gray',
                    }}
                  />
                );
              },
              tabBarStyle: {
                paddingBottom: safeAreaInsets.bottom,},
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
