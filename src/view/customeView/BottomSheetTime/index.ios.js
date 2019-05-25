import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated, Dimensions, Button, PickerIOS as Picker } from "react-native";
import styles from './BottomSheetTimeStyles'
import { connect } from 'react-redux'
import { selectTime, handleLoading } from '../../../actions/CalendarAction'

var PickerItem = Picker.Item;

class BottomSheetTime extends React.Component {
  constructor(props) {
    super(props);

    this._handleContinue = this._handleContinue.bind(this);
    this.handleClose = this.handleClose.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.onPickerSelect = this.onPickerSelect.bind(this)

  }
  onPickerSelect(index, name) {
    this.props.selectTime(index, name)
  }
  _handleContinue() {
    this.props.handleLoading();
    this.props.handleConfirmDate();
  }

  handleOpen() {
    Animated.timing(this.props.animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

  };

  handleClose() {
    Animated.timing(this.props.animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  render() {
    const screenHeight = Dimensions.get("window").height;

    const backdrop = {
      transform: [
        {
          translateY: this.props.animation.interpolate({
            inputRange: [0, 0.01],
            outputRange: [screenHeight, 0],
            extrapolate: "clamp",
          }),
        },
      ],
      opacity: this.props.animation.interpolate({
        inputRange: [0.01, 0.5],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
    };

    const slideUp = {
      transform: [
        {
          translateY: this.props.animation.interpolate({
            inputRange: [0.01, 1],
            outputRange: [0, -1 * screenHeight],
            extrapolate: "clamp",
          }),
        },
      ],
    };
    const { timeStart, timeEnd, itemList } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={[StyleSheet.absoluteFill, styles.cover, backdrop]}>
          <View style={[styles.sheet]}>
            <Animated.View style={[styles.popup, slideUp]}>
              <View style={{ flexDirection: 'row' }}>

                <View style={styles.rowTime}>
                  <Text style={styles.titleTime}>Chọn giờ đặt</Text>
                  <Picker style={styles.timePicker}
                    selectedValue={timeStart}
                    itemStyle={styles.itemStyle}
                    onValueChange={(index) => this.onPickerSelect(index, "timeStart")}>
                    {itemList.map((value, i) => (
                      <PickerItem label={value} value={i} key={"time" + value} />
                    ))}
                  </Picker>
                </View>

                <View style={styles.rowTime}>
                  <Text style={styles.titleTime}>Chọn giờ trả</Text>
                  <Picker style={styles.timePicker}
                    selectedValue={timeEnd}
                    itemStyle={styles.itemStyle}
                    onValueChange={(index) => this.onPickerSelect(index, "timeEnd")}>
                    {itemList.map((value, i) => (
                      <PickerItem label={value} value={i} key={"time" + value} />
                    ))}
                  </Picker>
                </View>
              </View>

              <View style={{ height: 50 }}></View>
              <TouchableOpacity
                style={styles.buttonWrapper}
                underlayColor='#77a300b0'
                activeOpacity={0.4}
                onPress={this._handleContinue}>
                <Text style={styles.save}>TIẾP TỤC</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    timeStart: state.calendar.timeStart,
    timeEnd: state.calendar.timeEnd,
    itemList: state.calendar.itemList,
    animation: state.calendar.animation
  }
}
export default connect(mapStateToProps, {
  selectTime: selectTime,
  handleLoading: handleLoading
}, null, { forwardRef: true })(BottomSheetTime);
