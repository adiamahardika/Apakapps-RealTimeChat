import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Container, Tab, Tabs, Text, TabHeading } from 'native-base';
import {withNavigation} from 'react-navigation'
import GetLocation from 'react-native-get-location'
import { db, auth } from '../../config/Config';
import ListChat from '../chat/ListChat'
import Maps from '../maps/Maps'
import UserProfile from '../profile/UserProfile'
class HomeScreen extends Component{
    static navigationOptions = {
        headerShown: false
    };
    state = {
      users: [],
      latitude: '',
      longitude: ''
    }

    getLocation(){
      const id = auth.currentUser.uid
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000
      })
      .then(location => {
        db.ref('/user/' + id ).child("latitude").set(location.latitude)
        db.ref('/user/' + id ).child("longitude").set(location.longitude)
      })
      .catch(error => {
        const { code, message} = error;
        console.warn(code, message);
      })
      this._isMounted = true;
    }

    componentDidMount(){
      this.getLocation()
    }
    render(){
        console.disableYellowBox = true
        return(
        <Container>
        <Tabs tabContainerStyle={{ elevation: 0 }}>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>Maps</Text></TabHeading>}>
          <Maps/>
          </Tab>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>Chat</Text></TabHeading>}>
          <ListChat/>
          </Tab>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>Setting</Text></TabHeading>}>
            <UserProfile/>
          </Tab>
        </Tabs>
      </Container>
        )
    }
}

const styles = StyleSheet.create({
  tabHeading:{
    backgroundColor: '#361040'
  },
  textHeading:{
    color: 'white', 
    fontSize: 20
  }
})
export default HomeScreen;