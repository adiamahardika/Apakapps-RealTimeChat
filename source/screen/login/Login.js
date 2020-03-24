import React, { Component } from 'react'
import { View, Image, TouchableOpacity, TextInput, StatusBar, StyleSheet, ToastAndroid } from 'react-native'
import { Item, Input, Form, Label, Button, Thumbnail, Text } from 'native-base';
import { auth, db } from '../../config/Config'
import BgImage from '../../images/background.png'
import Logo from '../../images/apakapps-01.png'

class LoginScreen extends Component {
    static navigationOptions = {
        headerShown: false
    };

    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            email: '',
            password: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            visible: false,
            Onprosess: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;

    };

    componentWillUnmount() {
        this._isMounted = false;

    }

    hideToast = () => {
        this.setState({
            visible: false,
        });
    };

    handleLogin = () => {
        const { email, password } = this.state;
        if (email.length < 6) {
            ToastAndroid.show(
                'Please input a valid email address',
                ToastAndroid.LONG,
            );
        } else if (password.length < 6) {
            ToastAndroid.show(
                'Password must be at least 6 characters',
                ToastAndroid.LONG,
            );
        } else {
            // Action
            auth.signInWithEmailAndPassword(email, password)
                .then(async data => {
                    console.log(data)
                    this.props.navigation.navigate('Home')
                })
                .catch(error => console.log(error.message))
        }
    };

    render() {
        console.disableYellowBox = true
        return (
            <View style={styles.containerStyle}>
                <Image style={styles.bgImageStyle} source={BgImage}/>
                <View style={styles.logoStyle}>
                    <Thumbnail square large source={Logo}/>
                    <Text style={styles.textLogoStyle}>apakapps</Text>
                </View>
                <Form style={styles.formLoginStyle}>
                        <Item floatingLabel>
                            <Label>
                             <Text style={styles.inputStyle}>Email</Text>
                            </Label>
                            <Input onChangeText={email => this.setState({ email })} value={this.state.email} style={styles.inputStyle}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>
                             <Text style={styles.inputStyle}>Password</Text>
                            </Label>
                            <Input placeholder="Password" onChangeText={password => this.setState({ password })} value={this.state.password} style={styles.inputStyle}/>
                        </Item>
                        </Form>
                            <Button onPress={this.handleLogin} style={styles.footerBottomStyle}>
                                <Text style={styles.loginButton}>LOGIN</Text>
                            </Button>
                            <Text style={styles.textRegister} onPress={()=> this.props.navigation.navigate('Register')}> Anda belum memiliki Akun? Register</Text>
                    </View>
        )
    }
}

const Toast = props => {
    if (props.visible) {
        ToastAndroid.showWithGravityAndOffset(
            props.message,
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            1,
            800,
        );
        return null;
    }
    return null;
};

const styles = StyleSheet.create({
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: 'red',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    containerStyle:{
        flex:1
    },
    bgImageStyle:{
        flex:1,
        resizeMode: 'cover',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    logoStyle:{
        marginTop:90,
        marginBottom: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textLogoStyle:{
        fontSize: 20,
        color: '#361040'
    },
    formLoginStyle:{
        marginTop: -100,
        paddingLeft: 10,
        paddingRight: 30
    },
    inputStyle:{
        color: '#361040',
        marginBottom: 6,
        fontSize:20
    },
    footerBottomStyle:{
        marginTop: 26,
        padding: 10,
        marginLeft: 16,
        marginRight:16,
        backgroundColor: '#361040',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center'
    },
    loginButton:{
        fontSize: 20,
        color:'white',
        fontWeight: 'bold',
        padding: 'auto'
    },
    textRegister:{
        marginTop: 20,
        textAlign: 'center'
    }
});
export default LoginScreen;