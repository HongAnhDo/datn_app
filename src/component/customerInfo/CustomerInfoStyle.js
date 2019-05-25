import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
        },
    titleBold: {
        fontSize: 18,
        fontWeight: "600"
    },
    textInput: {
        fontSize: 16,
        fontWeight: "300",
        paddingHorizontal: 10,
        height: 45,
        borderWidth: 0.5,
        borderRadius: 4,
        borderColor: "#bcbcbc",
        marginVertical: 8
    },
    viewInput: {
        marginTop: 15,
    },
    cstmInfoContainer: {
        padding: 15,
        borderColor: "#bcbcbc",
        borderBottomWidth: 0.5

    },
    iconBack: {
        justifyContent: 'center',
        textAlignVertical: 'center',
        height: '100%',
        paddingRight: 0,
        marginRight: 0
    },
    headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: 'transparent',
        borderBottomColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: "#f9f9f9"
    },
    headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center'
    },
    titleStyles:{
        justifyContent: 'center',
        textAlign: 'center',
        alignSelf: "center",
        color: '#00363d',
        fontSize: 18,
        fontWeight: "600"
    },
    textError:{
        color:"red"
    }



})
export default styles;