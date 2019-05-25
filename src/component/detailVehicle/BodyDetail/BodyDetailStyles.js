import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: "column",
        borderColor: "#f9f9f9",
        borderTopWidth: 0.5,
        paddingVertical: 15,
        borderTopWidth: 2,
        borderColor: "#f5f5f5",
        paddingBottom: 10,
        width: "100%",
        backgroundColor:"white"

    },
    headContainer: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        flex: 1,
        borderBottomWidth: 1,
        borderColor: "#ececec",
        paddingHorizontal: 15,
        paddingVertical: 10

    },
    nameVehicle: {
        backgroundColor: "#77a300",
        alignSelf: 'flex-start',
        fontSize: 16,
        lineHeight: 28,
        marginBottom: 3,
        color: 'white',
        fontWeight: "800",
        paddingHorizontal: 8,
        justifyContent: "center",

    },
    textSmall: {
        fontSize: 14,
        color: "#333333",
        width: "100%",
        paddingVertical: 5,
        fontWeight: "400"
    },
    imageOptions: {
        width: 40,
        height: 40,
        resizeMode: 'stretch'
    },
    itemOption: {
        flexDirection: "column",
        alignItems: "center",
        marginHorizontal: 10
    },
    flatListOptions: {
        width: "100%",
        marginVertical: 10
    },
    detailRentalContainer: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: "#ececec",

    },
    rowDetail: {
        paddingVertical: 10,
        flexDirection: "row",
        width: "100%"
    },
    rowDateTime: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        height: 30
    },
    rowDelivery: {
        flexDirection: "column",
        width: "100%",
        justifyContent: "flex-start"
    },
    titleDetail: {
        fontSize: 18,
        color: "black",
        fontWeight: "600",
    },
    textChange: {
        fontSize: 14,
        color: "#77a300",
        fontWeight: "700",
        position: "absolute",
        right: 0,
        height: "100%",
        alignSelf: "center"
    },
    iconSmall: {
        width: "auto",
        height: 40,
        padding: 0,
        margin: 0

    },
    textMedium: {
        fontWeight: "400",
        fontSize: 16
    },
    titleDelivery: {
        fontSize: 16,
        color: "black",
        fontWeight: "600",
        height: 28
    },
    radioButton: {
        paddingHorizontal: 0,
        paddingBottom: 10
    },
    viewRadio: {
        flexDirection: "column",
        paddingLeft: 10
    },
    descriptionDelivery: {
        marginTop: -2,
        alignSelf: 'flex-start',
        paddingRight: 20,
        fontWeight: "300"
    },
    textPrice: {
        color: "#77a300",
        fontSize: 18,
        color: "#77a300",
        fontWeight: "700",
        height: 50
    },
   
    textContinue:{
        textAlign: 'center',
        lineHeight:50,
        color:"white",
        alignItems:"center",
        width:"100%",
        fontWeight:"600"

    },
    viewButtonContinue: {
        backgroundColor: "#f9f9f9",
        height: 90,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        alignSelf: "stretch"

    },
    textPromotion:{
        height: 43,
        color: '#333333',
        fontSize: 16,
        fontWeight: "400",
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    promoMessageError:{
        color:"red",
        marginTop:5
    },
    promoMessageSuscess:{
        color: "#77a300",
        marginTop:5
    }

})

export default styles;