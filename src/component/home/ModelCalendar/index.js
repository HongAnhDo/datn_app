import React, { Component } from 'react';
import DatepickerRange from '../../../view/customeView/RangeDatepicker';
import { View, Platform } from 'react-native'
import { connect } from 'react-redux'
import { initNavigation, selectDate, handleLoading } from '../../../actions/CalendarAction'
import { changeListCars, changeListMotorbikes } from '../../../actions/ListVehicleAction'

import MyUtil from '../../../util/MyUtil';
import styles from './ModalCalendarStyle'
import ProgressDialog from "../../../view/dialog/ProgressDialog";

class ModalCalendar extends Component {

    constructor(props) {
        super(props);
        this._handleChangeDate = this._handleChangeDate.bind(this)

    }
    static navigationOptions = {
        header: null
    };
    componentDidMount() {
        this.props.initNavigation(this.props.navigation);
    }

    _handleChangeDate(startDate, untilDate) {
        if (startDate && untilDate) {
            const { state } = this.props.navigation;
            const { timeEnd, timeStart, itemList } = this.props;
            startDate = startDate.format("YYYYMMDD")
            untilDate = untilDate.format("YYYYMMDD")

            var book_rent_date = MyUtil.formatDateTimeBook(startDate, itemList[timeStart]);
            var book_retun_date = MyUtil.formatDateTimeBook(untilDate, itemList[timeEnd])
            var timeShort = MyUtil.convertDateTimeShort(startDate, untilDate);
            var dateTimeDisplay = MyUtil.convertDateTimeDisplay(startDate, untilDate, itemList[timeStart], itemList[timeEnd])
            this.props.selectDate(startDate, untilDate, dateTimeDisplay, timeShort, book_rent_date, book_retun_date);
            this.props.handleLoading()

            const params = state.params || {};
            if (params["fromScreen"] == "home") {
                var arrEmpty = []
                this.props.changeListCars(arrEmpty);
                this.props.changeListMotorbikes(arrEmpty);
                this.props.navigation.navigate("ListVehicle", { go_back_key: state.key });
            }
            else {
                this.props.navigation.goBack();
            }
        }
    }
    _renderCalendar = () => {
        const { startDate, untilDate, minDate, maxDate } = this.props;
        return (
            <View>
                <DatepickerRange
                    startDate={startDate}
                    untilDate={untilDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    onConfirm={this._handleChangeDate}
                    navigation={this.props.navigation}
                />
                <ProgressDialog
                    activityIndicatorColor="black"
                    activityIndicatorSize="large"
                    animationType="fade"
                    message="Đang tải ..."
                    visible={this.props.loading}
                    dialogBackgroundColor="transparent"
                    messageStyle={styles.messageStyle}
                />
            </View>
        )
    }

    render() {

        return (
            <View style={Platform.OS == 'ios' && { marginTop: 35 }}>
                {this._renderCalendar()}
            </View>
        )
    }

}
function mapStateToProps(state) {
    return {
        startDate: state.calendar.startDate,
        untilDate: state.calendar.untilDate,
        minDate: state.calendar.minDate,
        maxDate: state.calendar.maxDate,
        timeStart: state.calendar.timeStart,
        timeEnd: state.calendar.timeEnd,
        itemList: state.calendar.itemList,
        loading: state.calendar.loading

    }
}

export default connect(mapStateToProps, {
    initNavigation: initNavigation,
    selectDate: selectDate,
    handleLoading: handleLoading,
    changeListCars: changeListCars,
    changeListMotorbikes: changeListMotorbikes
})(ModalCalendar)
