import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "flex-start",
    // justifyContent: "center",
  },
  bottomModal: {
    height: 200,
    justifyContent: "flex-end",
    margin: 0,
    // backgroundColor:"white"
  },
  containerAndroid: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%"
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "50%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    shadowOffset: { width: 1, height: -6, },
    shadowColor: '#bcbcbc',
    shadowOpacity: 0.3,
    marginTop: 6,
    elevation: 5,
  },
  dayHeader: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#bbbbbb',
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonWrapper: {
    // paddingVertical: 10,
    // paddingHorizontal: 15,
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
    width: "85%",
    marginHorizontal: "7.5%",
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowTime: {
    flexDirection: "column",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timePicker: {
    width: "60%",
    height: 150,
    marginHorizontal: "15%",
    fontWeight: "bold"
  },
  itemStyle: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold"
  },
  titleTime: {
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: "bold"

  },
  save: {
    color: "white",
    fontSize: 18,
    width: "100%",
    lineHeight:50,
    textAlign: 'center',
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    height: 300
  },
  modalContentAndroid: {
    padding: 0,
    height: 330
  },
  bodyPickerAndroid: {
    height: 140,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 25
  },
  containerPickerAndroid: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  titleTimeAndroid: {
    flex: 1,
    textAlign: 'center',
    color: "black"
  },
  containerTitleAndroid: {
    flexDirection: "row", justifyContent: 'center',
    position: "absolute",
    top: 8,
    left: 0,
    alignItems: 'center',
    width: "100%",
    backgroundColor: "white",
  }
});

export default styles;