import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { withNavigation } from 'react-navigation'
import { auth, db } from '../../config/Config'

class ListChat extends Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        users: []
    }

    componentDidMount() {
        this.getDataUser()
    }

    getDataUser() {
        db.ref('/user').on('value', (snapshot) => {
            const current_user = auth.currentUser.uid
            const data = snapshot.val()
            const user = Object.values(data)
            const result = user.filter(user => user.uid !== current_user);
            this.setState({
                users: result
            })
        })
    }

    renderRow = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Chat', item)}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    </View>
                    <View style={{ flex: 2, borderColor: '#361040', borderBottomWidth: 1, marginTop: 5 }}>
                        <Text style={{ fontSize: 15 }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    ListChat = (_id) => {
        this.props.navigation.navigate('ListChat');
    }

    render() {
        console.disableYellowBox = true
        return (
                <View>
                    <FlatList
                        data={this.state.users}
                        renderItem={this.renderRow}
                        keyExtractor={(item) => { item.uid }}
                    />
                </View>
        )
    }
}
export default withNavigation(ListChat);