import { StyleSheet, Platform } from 'react-native'
import { theme } from '../../../constants'

const styles = StyleSheet.create({
    header: {
        backgroundColor: theme.colors.green,
        height: 150,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 100 
    },
    
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: theme.colors.colorWhite,
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: theme.colors.green,
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: theme.colors.green,
        marginTop: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: theme.colors.green,
    }
})
export default styles

