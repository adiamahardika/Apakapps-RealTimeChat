import React, { useEffect} from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from 'react-native-splash-screen'
import LoginScreen from './source/screen/login/Login';
import RegisterScreen from './source/screen/register/Register';
import HomeScreen from './source/screen/home/Home';
import ChatScreen from './source/screen/chat/Chat';
import UserProfile from './source/screen/profile/UserProfile';
import FriendProfile from './source/screen/profile/FriendProfile';

const homeNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      }
    },
    Register: {
      screen: RegisterScreen
    },
    Home:{
      screen: HomeScreen
    },
    Chat :{
      screen: ChatScreen
    },
    UserProfile:{
      screen: UserProfile
    },
    FriendProfile:{
      screen: FriendProfile
    }
  },
  {
    initialRouteName:'Login'
  }
)
const AppContainer = createAppContainer(homeNavigator);

function App(){
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return(
    <AppContainer/>
  )
}
export default App;