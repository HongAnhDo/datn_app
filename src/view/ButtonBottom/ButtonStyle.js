import { StyleSheet, Dimensions } from 'react-native';
import {theme} from  '../../constants';
const widthScreen = Dimensions.get("window").width - 30

const styles = StyleSheet.create({
    buttonContinue: {
        height: 50,
        backgroundColor: theme.colors.greenLight,
        color: "white",
        width: widthScreen,
        alignSelf:"center",
        alignItems:"center",
        borderRadius:2
    },
    viewButtonContinue: {
        backgroundColor: "#f9f9f9",
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "stretch"
    },
    textContinue:{
        textAlign: 'center',
        lineHeight:50,
        color:"white",
        alignItems:"center",
        width:"100%",
        fontWeight:"600"

    }
})

export default styles;