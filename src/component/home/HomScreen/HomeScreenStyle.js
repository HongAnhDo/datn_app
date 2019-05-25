import { StyleSheet, Dimensions } from 'react-native'
const Screen = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  scrollview: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...StyleSheet.absoluteFillObject
  },
  card: {
    backgroundColor: '#fff',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterContainer: {
    backgroundColor: '#278485',
    paddingTop: 10
  },
  filterTop: {
    height: 36
  },
  filterUp: {
    marginLeft: 24,
    width: 26,
    height: 26
  },
  filterField: {
    height: 40,
    backgroundColor: '#3a969a',
    marginHorizontal: 10,
    marginBottom: 10,
    borderRadius: 4,
    justifyContent: 'center'
  },
  filterFieldText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 30
  },
  content: {
    padding: 20,
    backgroundColor: 'white'
  },
  panelTitle: {
    fontSize: 27,
    height: 35
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#de6d77',
    alignItems: 'center',
    marginVertical: 10
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white'
  },
  photo: {
    width: Screen.width - 40,
    height: 190,
    marginBottom: 20
  },
  headerTitle: {
    alignSelf: 'center',
    textAlign: 'center',
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: '#00363d'
  },
  buttonHeaderRight: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: '100%'
  },
  messageStyle: {
    width: "100%",
    color: "white",
    textAlign: "center"
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal2: {
    height: 230,
    backgroundColor: "#3B5998"
  },

  modal3: {
    height: 300,
    width: 300
  },
  headerDialog: {
    flexDirection: 'row',
    paddingBottom: 5,
    alignItems: 'center',
    display: "flex"
  },
  titleHeaderDialog: {
    fontSize: 20,
    height: 45,
    lineHeight: 45,
    justifyContent: 'flex-start',
    fontWeight: "600",
    color: "#333333",
    flex: 1,
    alignSelf: 'center',
    paddingLeft: 18

  },
  iconClose: {
    height: 45,
    justifyContent: "flex-end",
    textAlignVertical: 'center',
    alignSelf: 'flex-end',
    flex: 1,
    margin: 0,
    padding: 5
  },
  textSuccess: {
    lineHeight: 25,
    fontWeight: "300"
  },
  imageVehicle: {
    width: 200,
    height: 140,
    alignSelf: 'center'
  },
  viewImage: {
    display: "flex",
    justifyContent: "center"
  },
  firstLineDialog: {
    display: "flex",
    flexDirection: "row",
    lineHeight: 28
  },
  bottomModal: {
    height: 400,
    justifyContent: "flex-end",
    margin: 0,
    // backgroundColor:"white"
  },
  itemCityAndroid: {
    height: 50,
    fontSize: 14,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  iconCheckCity: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    height: '100%',
    marginRight: 10
  },
  textCityNotSelect: {
    flex: 1,
    lineHeight: 50,
    justifyContent: 'center',
    paddingLeft: 25,
    fontSize: 14,
    fontWeight: '300',
    color: "#474747"
  },
  textCitySelect: {
    color: "#77a300",
    fontWeight: "400"
  },
  buttonWrapper: {
    backgroundColor: '#77a300',
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'stretch',
    shadowOffset: { width: 3, height: 3, },
    shadowColor: '#bcbcbc',
    shadowOpacity: 0.5,
    elevation: 5,
    height: 50,
    opacity: 1,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 10
  },
  textContinue:{
    color:"white",
    textAlign:"center",
    fontSize: 18
  },
  userImage: {
    width: 36,
    height:36,
    borderRadius:18,
    margin:5
}
});

export default styles
