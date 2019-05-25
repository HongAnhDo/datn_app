import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    detailRentalContainer: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 15,
        paddingVertical: 10,
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
        fontWeight: "300",
        fontSize: 16
    },
    icon: {
        width: 20,
        height: 20,
        marginRight:10
    }

})
export default styles;