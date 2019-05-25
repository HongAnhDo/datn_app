import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    headerList: {
        height: 50,
        flexDirection: "column",
        backgroundColor: "black",
        color: "white"

    },

    inputWrapper: {
        marginBottom: 0,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: 'center',
        height: 45,
        textDecorationLine: 'none',
        borderWidth: 0,
        borderBottomWidth: 0,
        borderColor: "#bcbcbc",
        fontSize: 14,
        paddingLeft: 15

    },
    inputWrapperIOS: {
        borderBottomWidth: 0.5,

    },
    textDate: {
        fontSize: 18,
        color: "#333333",
        fontWeight: "800",
        paddingLeft: 10
    },
    iconClose: {
        margin: 0,
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: 'flex-start',
    },
    headerRight: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        flexDirection: "row",
        marginRight: 5
    },
    iconRight: {
        width: 25,
        height: 25,
        resizeMode: 'stretch',
        marginHorizontal: 7
    },
    tabBar: {
        backgroundColor: 'white',
        color: "black",
        justifyContent: "center",
        height: 45,
        marginTop: -5
    },
    titleTabBar: {
        margin: 8,
        fontSize: 16,
        fontWeight: "500"
    },
    indicatorStyle: {
        backgroundColor: '#77a300',
        color: "black"
    }
})
export default styles;