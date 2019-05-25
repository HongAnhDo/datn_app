import React from "react";
import { Easing, Text, View, TouchableOpacity, Animated, Dimensions, Button } from "react-native";
import styles from './BottomSheetTimeStyles'
import Picker from '../../PickerAndroid';
import Modal from "react-native-modalbox";
import { connect } from 'react-redux';
import { selectTime, handleLoading, handleModalTime } from '../../../actions/CalendarAction'

const list = [
    "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM", "08:00 AM", "08:30 AM",
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 AM", "12:30 AM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM"
]
var PickerItem = Picker.Item;

class BottomSheetTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            animation: new Animated.Value(0),
        });

        this._handleContinue = this._handleContinue.bind(this);
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
        this.onPickerSelect = this.onPickerSelect.bind(this);
    }
    componentDidMount() {
        console.log(this.props.timeEnd, this.props.timeStart)
    }

    onPickerSelect(index, name) {
        if ((index !== this.props.timeEnd && name == "timeEnd") ||
            (index !== this.props.timeStart && name == "timeStart")) {
            this.props.selectTime(index, name)
        }
    }

    renderModalContent = (itemList) => (
        <View style={[styles.modalContent, styles.modalContentAndroid]}>
            <View style={styles.containerTitleAndroid}>
                <Text style={[styles.titleTime, styles.titleTimeAndroid]}>Chọn giờ đặt</Text>
                <Text style={[styles.titleTime, styles.titleTimeAndroid]}>Chọn giờ đặt</Text>
            </View>

            <View style={styles.bodyPickerAndroid}>

                <View style={styles.containerPickerAndroid}>
                    <Picker
                        selectedValue={this.props.timeStart +""}
                        itemStyle={styles.itemStyle}
                        onValueChange={(index) => this.onPickerSelect(index, "timeStart")}>
                        {itemList.map((value, i) => (
                            <PickerItem label={value + ""} value={i + ""} key={"time" + value} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.containerPickerAndroid}>
                    <Picker
                        selectedValue={this.props.timeEnd +""}
                        itemStyle={styles.itemStyle}
                        onValueChange={(index) => this.onPickerSelect(index, "timeEnd")}>
                        {itemList.map((value, i) => (
                            <PickerItem label={value + ""} value={i + ""} key={"time1" + value} />
                        ))}
                    </Picker>
                </View>
            </View>
            <TouchableOpacity
                style={styles.buttonWrapper}
                underlayColor='#77a300]b0'
                onPress={this._handleContinue}>
                <Text style={styles.save}>TIẾP TỤC</Text>
            </TouchableOpacity>
        </View>
    )

    _handleContinue() {
        this.props.handleLoading()
        this.handleClose();
        this.props.handleConfirmDate()
    }

    handleOpen() {
        this.props.handleModalTime(true)
    };

    handleClose() {
        this.props.handleModalTime(false)
    };
    render() {
        const { itemList } = this.props;
          console.log(this.props.timeStart)
        return (
            <Modal
                style={{
                    justifyContent: 'center',
                    alignItems: 'center', height: 500
                }}
                backdropPressToClose={true}
                backdrop={false}
                isOpen={this.props.visibleModal}
                position={"bottom"}
                swipeToClose={false}
                ref={"modal"}
                style={styles.bottomModal}
                animationDuration={300}
                easing={Easing.linear}
            >
                {this.renderModalContent(itemList)}
            </Modal>

        );
    }
}

function mapStateToProps(state) {
    return {
        timeStart: state.calendar.timeStart,
        timeEnd: state.calendar.timeEnd,
        itemList: state.calendar.itemList,
        animation: state.calendar.animation,
        visibleModal: state.calendar.visibleModal
    }
}
export default connect(mapStateToProps, {
    selectTime: selectTime,
    handleLoading: handleLoading,
    handleModalTime: handleModalTime
}, null, { forwardRef: true })(BottomSheetTime);
