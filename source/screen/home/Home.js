import React, {Component} from 'react'
import { StyleSheet } from 'react-native'
import { Container, Tab, Tabs, Text, TabHeading } from 'native-base';
import {withNavigation} from 'react-navigation'
import ListChat from '../chat/ListChat'
import Maps from '../maps/Maps'
class HomeScreen extends Component{
    static navigationOptions = {
        headerShown: false
    };
    state = {
      users: []
    }
    
    render(){
        console.disableYellowBox = true
        return(
        <Container>
        <Tabs tabContainerStyle={{ elevation: 0 }}>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>Maps</Text></TabHeading>}>
          <Maps/>
          </Tab>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>ListChat</Text></TabHeading>}>
          <ListChat/>
          </Tab>
          <Tab heading={<TabHeading style={ styles.tabHeading }><Text style={ styles.textHeading }>Setting</Text></TabHeading>}>
            <Text>Setting</Text>
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