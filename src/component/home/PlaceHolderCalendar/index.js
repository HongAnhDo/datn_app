import React, { Component } from 'react'
import { Text, View, Dimensions } from 'react-native'
import styles from './PlaceHolderStyle'
import Icon from 'react-native-vector-icons/MaterialIcons'

const DEVICE_WIDTH = Dimensions.get('window').width;
class PlaceHolderCalendar extends Component {
    static defaultProps = {
        initialMonth: '',
        dayHeadings: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        maxMonth: 12,
        buttonColor: 'green',
        buttonContainerStyle: {},
        showReset: true,
        showClose: true,
        ignoreMinDate: false,
        onClose: () => { },
        onSelect: () => { },
        onConfirm: () => { },
        placeHolderStart: 'Start Date',
        placeHolderUntil: 'Until Date',
        selectedBackgroundColor: 'green',
        selectedTextColor: 'white',
        todayColor: 'green',
        startDate: '',
        untilDate: '',
        minDate: '',
        maxDate: '',
        infoText: '',
        infoStyle: { color: '#fff', fontSize: 13 },
        infoContainerStyle: { marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end' }
    };


    render() {
        return (
            <View style={styles.container}>
             
                <View style={styles.header}>
                    <Icon.Button
                        name="close"
                        size={30}
                        color="#00363d"
                        style={styles.iconClose}
                        backgroundColor='transparent'
                        underlayColor='transparent'
                        onPress={this._handleCloseCalendar}
                    />

                    <Text style={styles.titleHeader}>Chọn ngày đặt xe</Text>

                </View>
                {/* {
                    this.props.infoText != "" &&
                    <View style={this.props.infoContainerStyle}>
                        <Text style={this.props.infoStyle}>{this.props.infoText}</Text>
                    </View>
                } */}
                <View style={styles.dayHeader}>
                    {
                        this.props.dayHeadings.map((day, i) => {
                            return (<Text style={{ width: DEVICE_WIDTH / 7, textAlign: 'center' }} key={i}>{day}</Text>)
                        })
                    }
                </View>
            </View>)

    }
}
export default PlaceHolderCalendar;
