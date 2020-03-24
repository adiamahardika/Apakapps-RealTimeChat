import React, { Component } from 'react';
import { View, Text, ToastAndroid, StyleSheet, Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Thumbnail, Label, Button } from 'native-base';
import { auth, db  } from "../../config/Config";
import BgImage from '../../images/background.png'
import Logo from '../../images/apakapps-01.png'
import GetLocation from 'react-native-get-location'
class Register extends Component {
    static navigationOptions = {
        headerShown: false
    };
    constructor(props) {
        super(props)

        this.state = {
            isVisible: false,
            name: '',
            email: '',
            password: '',
            uid: '',
            latitude: null,
            longitude: null,
            errorMessage: null,
            loading: false,
            updatesEnabled: false,
            location: []
        }
        this.handleSignUp = this.handleSignUp.bind(this);
    }

    async componentDidMount() {
        await GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
                timeout: 15000,
            })
            .then(location => {
                console.log(location);
              this.setState({
                  location : location
                })
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            })
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

    handleSignUp = async () => {
        const { email, name, password } = this.state;
        if (name.length < 1) {
            ToastAndroid.show('Please input your fullname', ToastAndroid.LONG);
        } else if (email.length < 6) {
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
            await auth.createUserWithEmailAndPassword(email, password)
                .then(async userCredentials => {

                    db.ref('/user/' + userCredentials.user.uid)
                        .set({
                            uid: userCredentials.user.uid,
                            name: this.state.name,
                            status: 'Online',
                            email: this.state.email,
                            photo: "http://photourl.com/photo",
                            longitude: this.state.location.longitude,
                            latitude: this.state.location.latitude
                        })
                        .catch(error => console.log(error.message))

                    console.log(userCredentials);
                    ToastAndroid.show("Success", ToastAndroid.LONG)


                    if (userCredentials.user) {
                        userCredentials.user.updateProfile({
                            displayName: this.state.name,
                            photoURL: "http://linkphoto.com"
                        }).then((s) => {
                            this.props.navigation.navigate('Login')
                        })
                    }


                })
                .catch(error => {
                    ToastAndroid.show(error.message, ToastAndroid.LONG)
                })

        }
    }

    render() {
        return (
            <Container>
                <Image style={styles.bgImageStyle} source={BgImage}/>
                <View style={styles.logoStyle}>
                    <Thumbnail square large source={Logo}/>
                    <Text style={styles.textLogoStyle}>apakapps</Text>
                </View>
                    <Form style={styles.formLoginStyle}>
                        <Item floatingLabel>
                            <Label>
                             <Text style={styles.inputStyle}>Name</Text>
                            </Label>
                            <Input 
                            style={styles.inputStyle} onChangeText={name => this.setState({ name })} value={this.state.name} />
                        </Item>
                        <Item floatingLabel>
                        <Label>
                             <Text style={styles.inputStyle}>Email</Text>
                            </Label>
                            <Input 
                            style={styles.inputStyle}  onChangeText={email => this.setState({ email })} value={this.state.email} />
                        </Item>
                        <Item floatingLabel>
                        <Label>
                             <Text style={styles.inputStyle}>Password</Text>
                            </Label>
                            <Input 
                            style={styles.inputStyle}  onChangeText={password => this.setState({ password })} value={this.state.password} />
                        </Item>
                    </Form>
                    <Button onPress={this.handleSignUp} style={styles.footerBottomStyle} >
                        <Text style={styles.registerButton}>
                            SIGN UP
                        </Text>
                    </Button>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
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
    formLoginStyle:{
        marginTop: -100,
        paddingLeft: 10,
        paddingRight: 30
    },
    inputStyle:{
        color: '#361040',
        marginBottom: 6,
        fontSize:14
    },
    footerBottomStyle:{
        marginTop: 26,
        paddingTop: 10,
        marginLeft: 16,
        marginRight:16,
        backgroundColor: '#361040',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems:'center'
    },
    registerButton:{
        color:'white',
        fontWeight: 'bold',
        padding: 'auto'
    },
})
export default Register;