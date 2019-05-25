import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './ItemVehicleStyle'
import MyUtil from '../../../util/MyUtil';
import IconTransmission from "../../../assets/images/transmission.png"
import CarImage from '../../../assets/images/car1.png'
import { connect } from 'react-redux';
import { selectVehicle, handleLoading } from '../../../actions/ListVehicleAction'
import VehicleApi from '../../../service/vehicle/VehicleApi';
import ImageWithPlaceholder from '../../../view/ImagePreLoad';
import ImagePlaceholder from '../../../assets/images/placeholder.png'

class ItemCar extends React.PureComponent {
    constructor(props) {
        super(props);
        var name = this.props.item.vhc_type_id == 1 ? this.props.item.vhc_part_name_short : this.props.item.vhc_part_name
        this.state = ({
            image: this.props.item.vhc.vhc_imgs[0] ? this.props.item.vhc.vhc_imgs[0].vhc_img_link : "",
            vehicleName: MyUtil.convertNameVehicle(name)
        })
        this._handlePress = this._handlePress.bind(this);
        this._onError = this._onError.bind(this)
    }
    componentDidMount() {
    }

    async _handlePress() {
        this.props.handleLoading(true)
        var vehicle;
        var resulf = await VehicleApi.getVehicleById(this.props.item.vhc_part_id);
        if (resulf["code"] == "success") {
            vehicle = resulf.data;
            this.props.navigation.navigate("Detail", {
                vehicle: vehicle
            })
            this.props.handleLoading(false)

        }
        else {

        }


    }
    _onError() {
        this.setState({ image: CarImage })
    }

    renderSeparator = () => {
        return (
            <View style={styles.saparator} />
        );
    }

    render() {

        const item = this.props.item
        return (
            <TouchableOpacity
                onPress={this._handlePress}
                style={styles.itemVehicle} key={item.vhc_part_name}>

                <View style={styles.leftItemVehicle}>
                    <View style={styles.topLeftVehicle}>

                        <Text style={styles.nameVehicle}>{this.state.vehicleName[0]}</Text>
                        {this.state.vehicleName[1] ? <Text style={styles.nameVehicle}>{this.state.vehicleName[1]}</Text> : null}
                        {this.state.vehicleName[2] ? <Text style={styles.nameVehicle}>{this.state.vehicleName[2]}</Text> : null}

                        <Text style={styles.titleSimalar}>hoặc tương đương </Text>
                        <View style={styles.betweenLeftVehicle}>

                            {this.props.type == "car" && <View style={{ flexDirection: "row", marginRight: 10 }}>
                                <Image
                                    style={styles.imageOptions}
                                    source={IconTransmission}
                                />
                                <Text style={styles.titleOptions}>{item.vhc.vhc_seat_num} chỗ</Text>
                            </View>}
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    style={styles.imageOptions}
                                    source={IconTransmission}
                                    resizeMethod ="stretch"
                                />
                                <Text style={styles.titleOptions}>{item.vhc.vhc_tms_name} </Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.bottomLeftVehicle}>
                        <Text style={styles.priceVehicle}>{MyUtil.currencyFormat(item.vhc_part_defa_prie)} VND/<Text style={{ fontSize: 12, fontWeight: "400" }}>ngày</Text></Text>
                    </View>
                </View>
                <View style={styles.rightItemVehicle}>
                    {/* <Image
                        style={{ width: "100%", height: "100%" }}
                        source={this.state.image}
                        resizeMode="contain"
                        onError={this._onError}
                    /> */}

                    <Image
                        style={{ width: 180, height: 80 }}
                        source={{uri: this.state.image}}
                        resizeMethod ="contain"
                    />

                </View>

            </TouchableOpacity>
        )
    }
}
function mapStateToProps(state) {
    return {
        navigation: state.calendar.navigation,
    }
}
export default connect(mapStateToProps, {
    selectVehicle: selectVehicle,
    handleLoading: handleLoading
})(ItemCar);