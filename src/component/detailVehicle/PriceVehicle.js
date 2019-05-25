import React, { Component } from 'react';
import { View, Text } from 'react-native'
import styles from './BodyDetail/BodyDetailStyles'
import MyUtil from '../../util/MyUtil';
import { connect } from 'react-redux'
class PriceVehicle extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={styles.detailRentalContainer}>
                <View style={styles.rowDetail}>
                    <Text style={styles.titleDetail}>Tổng giá</Text>
                    <Text style={styles.textChange}>CHI TIẾT</Text>
                </View>
                <Text style={styles.textPrice}>{MyUtil.currencyFormat(this.props.sumPrice)} VNĐ</Text>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        vehicle: state.listVehicles.vehicle,
        sumPrice: state.detail.sumPrice
    }
}
// 
export default connect(mapStateToProps)(PriceVehicle);