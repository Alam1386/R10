import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import AboutScreen from '../screens/AboutScreen'
import FavesScreen from '../screens/FavesScreen'
import MapScreen from '../screens/MapScreen'
import ScheduleScreen from '../screens/ScheduleScreen'
import LinearGradient from 'react-native-linear-gradient'
import sessionDetails from './sessionDetails';
const AboutStack = createStackNavigator(
  {
    About: { 
      screen: AboutScreen,
      navigationOptions: {
        headerTitle: 'About',
      },
    },
  },
	{
		defaultNavigationOptions: {
			headerStyle: {
				color: '#fff',
				backgroundColor: 'transparent',
			},
			headerTintColor: '#fff',
			headerBackground: (
				<LinearGradient
					colors={['#9963E9','#C5414D']}
					style={{ flex: 1 }}
					start={{ x: 1.5, y: 0 }}
					end={{ x: 0, y: 2 }}
				/>
      ),
      headerTitleStyle: {
				fontWeight: '500',
        color: '#fff',
        fontSize: 28,
        paddingBottom: 10
			},
		},
	},
);

const FavesStack = createStackNavigator(
  {
    Faves: { 
      screen: FavesScreen,
      navigationOptions: {
        headerTitle: 'Faves',
      },
    },
    Session: { 
      screen: sessionDetails,
      navigationOptions: {
        headerTitle: 'Session',
      },
    },
  },
	{
		defaultNavigationOptions: {
			headerStyle: {
				color: '#fff',
				backgroundColor: 'transparent',
			},
			headerTintColor: '#fff',
			headerBackground: (
				<LinearGradient
					colors={['#C5414D', '#9963E9']}
					style={{ flex: 1 }}
					start={{ x: 0, y: 0 }}
					end={{ x: 2, y: 1 }}
				/>
      ),
      headerTitleStyle: {
				fontWeight: '500',
        color: '#fff',
        fontSize: 28,
        paddingBottom: 10
			},
		},
	},
);
const MapStack = createStackNavigator(
  {
    Map: { 
      screen: MapScreen,
      navigationOptions: {
        headerTitle: 'Map',
      },
    },
  },
	{
		defaultNavigationOptions: {
			headerStyle: {
				color: '#fff',
				backgroundColor: 'transparent',
			},
			headerTintColor: '#fff',
			headerBackground: (
				<LinearGradient
					colors={['#C5414D', '#9963E9']}
					style={{ flex: 1 }}
					start={{ x: 0, y: 0 }}
					end={{ x: 2, y: 1 }}
				/>
      ),
      headerTitleStyle: {
				fontWeight: '500',
        color: '#fff',
        fontSize: 28,
        paddingBottom: 10
			},
		},
	},
);
const ScheduleStack = createStackNavigator(
  {
    Schedule: { 
      screen: ScheduleScreen,
      navigationOptions: {
        headerTitle: 'Schedule',
      },
    },
    Session: { 
      screen: sessionDetails,
      navigationOptions: {
        headerTitle: 'Session',
      },
    },
  },
	{
		defaultNavigationOptions: {
			headerStyle: {
				color: '#fff',
				backgroundColor: 'transparent',
			},
			headerTintColor: '#fff',
			headerBackground: (
				<LinearGradient
					colors={['#C5414D', '#9963E9']}
					style={{ flex: 1 }}
					start={{ x: 0, y: 0 }}
					end={{ x: 2, y: 1 }}
				/>
      ),
      headerTitleStyle: {
				fontWeight: '500',
        color: '#fff',
        fontSize: 28,
        paddingBottom: 10
			},
		},
	},
);

const TabNavigator = createBottomTabNavigator(
  {
    Schedule: ScheduleStack,
    Map: MapStack,
    Faves: FavesStack,
    About: AboutStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'About') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Faves') {
          iconName = `ios-heart${focused ? '' : '-empty'}`;
        }else if (routeName === 'Map') {
          iconName = `ios-map`;
        }else if (routeName === 'Schedule') {
          iconName = `ios-calendar`;
        }

        return <IconComponent name={iconName} size={35} color={tintColor} />;
      },
      
    }),
    initialRouteName: 'About',
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor: 'black',
      inactiveBackgroundColor: 'black',
      style: {
        backgroundColor: 'black',
        height: 80,
      },
      labelStyle: {
        fontSize: 18,
      },
    }
  }
);
export default createAppContainer(TabNavigator);
