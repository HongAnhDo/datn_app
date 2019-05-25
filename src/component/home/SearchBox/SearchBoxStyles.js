import { Dimensions } from "react-native";
var width = Dimensions.get("window").width; //full width
const styles = {
    searchBox: {
        top: 0,
        position: "absolute",
        width: width - 20,
        shadowOffset: { width: 3, height: 3, },
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        elevation: 5,
        marginTop: 10,
        opacity: 1,
        borderRadius: 8,
        backgroundColor: "#fff"
    },

    inputWrapper: {
        marginBottom: 0,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        height: 45,
        textDecorationLine: 'none',
        borderWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'tramsparent',
        fontSize: 14,

    },
    secondInputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 2
    },
    inputSearch: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#474747',
        fontSize: 16,
        fontWeight:"400"
    },
    label: {
        fontSize: 14,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    }
};

export default styles;