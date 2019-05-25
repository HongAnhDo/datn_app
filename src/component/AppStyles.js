import { StyleSheet } from 'react-native'
import { theme } from '../constants'

const styles = StyleSheet.create({
    imgUserMenu: {
        height: 50,
        width: 50,
        borderRadius: 25,
        margin: 5
    },
    headerMenu: {
        backgroundColor: 'white',
        flex: 0
    },
    bodyMenu: {
        backgroundColor: 'white',
        flex: 1
    },
    userInfoMenu: {
        height: 60,
        backgroundColor: 'white',
        padding: 10,
        flexDirection:"row",
        alignItems:'center'

    },
    userNameMenu: {
        color: theme.colors.greenBold,
        fontSize: theme.sizes.base,
        fontWeight: "600",
        textTransform: "uppercase"
    },
    viewItemMenu:{
        paddingLeft:20, 
        paddingTop: 15, 
        paddingBottom: 15
    },
    textItemMenu:{
        fontWeight:"400"
    }
})
export default styles;