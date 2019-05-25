const React = require("react-native");
const { Dimensions, Platform } = React;
// const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

export default {
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "green"
  },
  container: {
    flexDirection: "column",
  },
  logo: {
    height: 140,
    alignSelf: "center",
    width: "60%",
    resizeMode: "contain"
  },
  form: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  formErrorIcon: {
    color: "#333",
    marginTop: 5,
    right: 10
  },
  formErrorText1: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "#d9534f",
    textAlign: "right",
    top: -10
  },
  formErrorText2: {
    fontSize: Platform.OS === "android" ? 12 : 15,
    color: "transparent",
    textAlign: "right",
    top: -10
  },
  loginBtn: {
    marginTop: 7,
    height: 50,
    color: "#77a300"
  },
  otherLinksContainer: {
    paddingTop: deviceHeight < 600 ? 5 : Platform.OS === "android" ? 10 : 15,
    flexDirection: "row"
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: "400",
    color: "#333",
    fontSize: Platform.OS === "android" ? 14 : 14
  },
  inputGrp: {
    flexDirection: "row",
    backgroundColor: 'white',
    marginBottom: 10,
    paddingLeft: 5,
    borderWidth: 0,
    borderColor: "transparent"
  },
  input: {
    paddingLeft: 10,
    // paddingTop: 8,
    color: "#333"
  },
  skipBtn: {
    alignSelf: "flex-end",
    marginTop: 10,
    borderWidth: 0.3,
    borderColor: "#333",
    position: "absolute",
    bottom: 15,
    right: 0
  },
  formLogin: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor:"#f2f2f2", 
    height:300, 
    paddingHorizontal:20, 
    paddingVertical: 30,
    margin:10,
    borderRadius: 5
  },
  textRegister:{
    fontSize: 16,
    color:"white",
    fontWeight: "600"
  }
};
