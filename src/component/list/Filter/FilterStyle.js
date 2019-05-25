import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../constants'
const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 120;
const STICKY_HEADER_HEIGHT = 80;

export const pickerSelectAndroidStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
    },
    inputAndroid:{},
    container: {
        
        flexDirection:"row",
        flex: 1,
        height: 40
    },
    inputIOSContainer:{
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        flexDirection:"column",

    },
    inputAndroidContainer:{
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        flexDirection:"column",
        
    },
    containerStyle:{
        borderWidth: 1,
        borderColor: 'gray',
    },
    iconContainer: {
        top: 8,
        right: -15,
    },
})


export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30
        },
    inputAndroid:{},
    container: {
        // fontSize: 16,
        // paddingHorizontal: 10,
        // paddingVertical: 8,
        // borderWidth: 1,
        // borderColor: 'gray',
        // borderRadius: 8,
        // color: 'black',
        // paddingRight: 30,
        // marginHorizontal: 15,
        // position:'absolute',
        flexDirection:"row",
        flex: 1,
        height: 40
    },
    // inputIOSContainer:{
    //     fontSize: 16,
    //     paddingVertical: 12,
    //     paddingHorizontal: 10,
    //     borderWidth: 1,
    //     borderColor: 'gray',
    //     borderRadius: 4,
    //     color: 'black',
    //     paddingRight: 30,
    //     marginHorizontal: 15,
    //     flexDirection:"column",

    // },
    inputAndroidContainer:{
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        flexDirection:"column",
        
    },
    containerStyle:{
        borderWidth: 1,
        borderColor: 'gray',
    },
    iconContainer: {
        top: 10,
        right: 25,
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    stickySection: {
        height: STICKY_HEADER_HEIGHT,
        width: "100%",
        justifyContent: 'flex-end',
    },
    stickySectionText: {
        color: 'black',
        fontSize: 18,
        fontWeight: "600",
        margin: 12,
        marginLeft: 40
    },
    fixedSection: {
        position: 'absolute',
        display: "flex",
        bottom: 0,
        flexDirection: "row",
        width: window.width,
        justifyContent: "space-evenly",
    },
    fixedSectionText: {
        color: '#999',
        fontSize: 20
    },
    parallaxHeader: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 80,
        backgroundColor: "white",


    },
    avatar: {
        marginBottom: 10,
        borderRadius: AVATAR_SIZE / 2
    },
    sectionSpeakerText: {
        color: 'black',
        fontSize: 22,
        fontWeight: "600",
        paddingHorizontal: 10,
        borderWidth: 0,
        borderColor:"white"
    },
    sectionTitleText: {
        color: 'white',
        fontSize: 18,
        paddingVertical: 5
    },
    row: {
        overflow: 'hidden',
        paddingHorizontal: 10,
        height: ROW_HEIGHT,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderBottomWidth: 1,
        justifyContent: 'center'
    },
    rowText: {
        fontSize: 20
    },
    titleFilter: {
        fontSize: 18,
        fontWeight: "500",
        marginVertical: 20,
        color:'black'
    },
    labelStyle: {
        color: '#333',
        marginLeft: 15,
        fontSize: 16,
        marginTop: 5
    },
    labelPrice: {
        color: '#333',
        fontSize: 16
        },
    rowStyle: {
        flexDirection: 'row',
        height: 40
        },
    bodyFilter: {
        backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginTop: 10
    },
    section: {
        flexDirection: 'column',
        marginHorizontal: 14,
        marginBottom: 14,
        paddingBottom: 24,
        borderBottomColor: '#EAEAED',
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 18,
        marginVertical: 14,
    },
    group: {
        flexDirection: 'row',
        borderRadius: 14,
        display: 'flex',
        borderWidth: 1,
        borderColor: theme.colors.greenLight,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        flex: 1,
        flexWrap: 'wrap',
    },
    button: {
        flex: 1,
        paddingVertical: 14,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent:'center'
    },
    buttonText: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 16,
        color:'#333'
    },
    active: {
        backgroundColor: theme.colors.greenLight,
    },
    activeText: {
        color: 'white'
    },

    first: {
        borderTopLeftRadius: 13,
        borderBottomLeftRadius: 13,

    },
    last: {
        borderTopRightRadius: 13,
        borderBottomRightRadius: 13,

    },
    option: {
        marginBottom: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    track: {
        height: 4,
        borderRadius: 2,
    },
    thumb: {
        width: 25,
        height: 25,
        borderRadius: 25 / 2,
        backgroundColor: 'white',
        borderColor: theme.colors.greenLight,
        borderWidth: 2,
    },
    slide:{
        marginHorizontal: 15
    },
    sliderOne:{
        flexDirection:"row"
    }
});



export default styles