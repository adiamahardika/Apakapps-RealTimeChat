import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Dimensions, StyleSheet, Button } from 'react-native'
import { db, auth, time } from '../../config/Config'
import { FlatList } from 'react-native-gesture-handler'

class ChatScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('name', null)
        }
    }

    constructor(props){
        super(props);
        this.state = {
            name: props.navigation.getParam('name'),
            uid: props.navigation.getParam('uid'),
            textMessage: '',
            messageList: '',
        }
    }

    componentDidMount(){
        db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`)
            .on('child_added', (value) => {
                this.setState((prevState) => {
                    return {
                        messageList: [...prevState.messageList, value.val()]
                    }
                })
            })
    }

    sendMessage = async () => {
        if(this.state.textMessage.length > 0) {
            let msgId = (await db.ref('/messages/').child(`/${auth.currentUser.uid}/`).child(`/${this.state.uid}/`).push()).key
            let updates = {}
            let message = {
                message: this.state.textMessage,
                time: time,
                from: auth.currentUser.uid
            }
            updates['messages/' + auth.currentUser.uid +'/' + this.state.uid + '/' + msgId] = message
            updates['messages/' + this.state.uid +'/' + auth.currentUser.uid + '/' + msgId] = message
            db.ref().update(updates);
            this.setState({ textMessage: ''})

        }
    }

    handleChange= key => val => {
        this.setState({ [key] : val })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '' ) + d.getHours() + ':';
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        if(c.getDay() !== d.getDay()) {
            result = d.getDay() + '' + d.getMonth() + '' + result;
        } 
        return result
    }

    renderRow = ({item}) => {
        console.disableYellowBox = true;
        return (
            <View style = {{
                flexDirection: 'row',
                width: '60%',
                alignSelf: item.from === auth.currentUser.uid ? 'flex-end' : 'flex-start',
                backgroundColor: item.from === auth.currentUser.id ? 'white' : '#361040',
                borderRadius: 25,
                marginBottom: 10
            }}>
                <Text style={{ color: 'white', padding: 10, fontSize: 18}}>
                {item.message}
                </Text>
                <Text style={{color: '#eee', padding: 13, fontSize: 12}}>
                {this.convertTime(item.time)}
                </Text>
            </View>
        )
    }
    render () {
        let { height, width } = Dimensions.get('window')
        return (
            <> 
            <FlatList
                style={{padding: 10, height: height * 0.8}}
                data = { this.state.messageList}
                renderItem = { this.renderRow }
                keyExtractor = {(item, index) => index.toString()}
            />
            <View style={{flexDirection: 'row',alignItems: 'center', marginHorizontal:5}}>
               <TextInput 
                style={styles.input}
                value={this.state.textMessage}
                onChangeText={ this.handleChange('textMessage')}
               />
            <TouchableOpacity onPress={this.sendMessage} style={{paddingBottom:10, marginLeft:5, borderRadius: 50}}>
                <Text style={styles.btnText}> Send </Text>
            </TouchableOpacity>
            </View>
            </>
        )
    }
}
const styles = StyleSheet.create ({
    input: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '80%',
        marginBottom: 10,
        borderRadius: 5,
    },
    btnText: {
        color: '#361040',
        fontSize: 20
    }
})
export default ChatScreen;