import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    itemVehicle: {
        flexDirection: 'row',
        height: 160,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        width:"100%"
    },
    textRow:{
        position: "absolute", 
        top: 0, 
        right: 0, 
        left: 0, 
        bottom: 0
    },
    leftItemVehicle: {
        flex: 10
    },
    rightItemVehicle: {
        flex: 9,
        justifyContent:'center',
        alignItems:'center'
    }
    ,
    itemLeftVehicle: {
        flexDirection: 'column',

    },
    topLeftVehicle: {
        flex: 4
    },
    betweenLeftVehicle: {
        height: "auto",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 15,
        marginTop: 5,
        alignItems: "center"
    },
    bottomLeftVehicle: {
    },
    nameVehicle: {
        backgroundColor: "#77a300",
        alignSelf: 'flex-start',
        fontSize: 16,
        lineHeight: 22,
        marginBottom: 3,
        color: 'white',
        fontWeight: "800",
        paddingHorizontal: 5

    },
    priceVehicle: {
        fontSize: 19,
        fontWeight: "800",
        color: "#00363d"
    },
    imageOptions: {
        width: 20,
        height: 20,
        resizeMode: 'stretch'
    },
    titleOptions: {
        fontSize: 14,
        color: "#333333",
        fontWeight:"500"
    },
    titleSimalar:{
        fontSize: 12,
        color: "#333333"
    }

})
export default styles;