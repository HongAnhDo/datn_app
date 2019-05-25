import React, { Component } from "react";
import { Image, Platform, StatusBar, TextInput, ImageBackground, Keyboard } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
  Toast
} from "native-base";
import styles from "./styles";
import {connect} from'react-redux'
import { changePassword, changeUserName } from '../../../actions/UserAction'
const bg = require("../../../assets/bg.png");
const logo = require("../../../assets/images/image_login.png");

class LoginForm extends Component {
  constructor(props) {
    super(props);
    
    this.textInput = "";
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeEmailOrPhone = this.handleChangeEmailOrPhone.bind(this)
  }


  login() {
    Keyboard.dismiss();
    this.props.navigation.navigate("Root")

  }
  handleChangePass(value) {
    console.log(value, "?????")
  }
  handleChangeEmailOrPhone(value) {
    console.log(value)
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <ImageBackground source={bg} style={styles.background}>
          <Content contentContainerStyle={{ flex: 2 }}>
            <View style={[{ flex: 2, flexDirection: "column", justifyContent: "flex-end", alignItems: "center" }]}>
              <Image source={logo} style={styles.logo} />
            </View>

            <View style={[styles.container, { flex: 3 }]}>
              <View style={styles.formLogin}>
                <View>
                  <Item rounded style={styles.inputGrp}>
                    <Icon
                      active
                      name={"mail"}
                      style={{ color: "#0f8e37", fontSize: 28 }}
                    />
                    <Input
                      ref={c => (this.textInput = c)}
                      placeholderTextColor="#bcbcbc"
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder={"Email hoặc Số điện thoại"}
                      onChangeText={this.handleChangeEmailOrPhone}
                    // secureTextEntry={input.name === "password" ? true : false}
                    />

                  </Item>

                </View>

                <View>
                  <Item rounded style={styles.inputGrp}>
                    <Icon
                      active
                      name={"unlock"}
                      style={{ color: "#0f8e37", fontSize: 28 }}
                    />
                    <Input
                      ref={c => (this.textInput = c)}
                      placeholderTextColor="#bcbcbc"
                      autoCapitalize="none"
                      style={styles.input}
                      placeholder={"Mật khẩu"}
                      onChangeText={this.handleChangePass}
                    // secureTextEntry={input.name === "password" ? true : false}
                    />

                  </Item>

                </View>

                <Button
                  rounded
                  success
                  block
                  large
                  style={styles.loginBtn}
                  onPress={this.login.bind(this)}
                >
                  <Text
                    style={
                      Platform.OS === "android"
                        ? { fontSize: 16, textAlign: "center", top: -5 }
                        : { fontSize: 16, fontWeight: "900" }
                    }
                  >
                    ĐĂNG NHẬP
                  </Text>
                </Button>

                <View style={styles.otherLinksContainer}>
                  <Left>

                  </Left>
                  <Right>
                    <Button
                      small
                      transparent
                      style={{ alignSelf: "flex-end" }}
                      onPress={() => navigation.navigate("ForgotPassword")}
                    >
                      <Text style={styles.helpBtns}>Quên mật khẩu</Text>
                    </Button>
                  </Right>
                </View>

              </View>
              <Button
                small
                transparent
                style={{ alignSelf: "center", height: 50 }}
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.textRegister}>Tạo tài khoản</Text>
              </Button>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return{
     userName: state.user.userName,
     password: state.user.password
  }
}

export default connect(mapStateToProps,{
  changePassword: changePassword,
  changeUserName: changeUserName
})(LoginForm);
