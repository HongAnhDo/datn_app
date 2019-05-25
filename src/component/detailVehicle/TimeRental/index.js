import React, { Component } from "react";
import { View, Text, Image } from 'react-native';
import styles from './TimeRentalStyle'
import Icon from "react-native-vector-icons/MaterialIcons"
import IconCalendar from '../../../assets/images/calendar.png'
import { connect } from 'react-redux'

class TimeRental extends Component {
    render() {
        return (
            <View style={styles.detailRentalContainer}>
                <View style={styles.rowDetail}>
                    <Text style={styles.titleDetail}>Chi tiết đặt xe</Text>
                    <Text style={styles.textChange}>THAY ĐỔI</Text>
                </View>
                <View style={styles.rowDateTime}>
                    <Icon.Button
                        name="my-location"
                        size={22}
                        style={styles.iconSmall}
                        color="#00363d"
                        backgroundColor='transparent'
                        underlayColor='transparent'
                    />

                    <Text style={styles.textMedium}>{this.props.citySelect.city_name}</Text>
                </View>
                <View style={styles.rowDateTime}>
                    <Image
                        style={styles.icon}
                        source={IconCalendar} />

                    <Text style={styles.textMedium}>{this.props.dateTimeDisplay}</Text>
                </View>
            </View>


        )
    }
}
function mapStateToProps(state) {
    return {
        citySelect: state.home.citySelect,
        dateTimeDisplay: state.calendar.dateTimeDisplay

    }
}
export default connect(mapStateToProps)(TimeRental)