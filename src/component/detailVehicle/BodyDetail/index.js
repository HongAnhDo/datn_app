import React, { Component } from 'react'
import { View, Text, Image, TextInput, Alert, FlatList } from 'react-native'
import styles from './BodyDetailStyles'
import MyUtil from '../../../util/MyUtil';
import IconTransmission from "../../../assets/images/transmission.png"
import IconSeat from "../../../assets/images/seat.png"
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import PlaceAutoComplete from '../PlaceAutoComplete';
import TimeRental from '../TimeRental';
import PriceVehicle from '../PriceVehicle';
import ButtonBottom from '../../../view/ButtonBottom';
import { connect } from 'react-redux'
import { handleChangeDelivery, handleInitPrice, handleChangePromotion, handleLoad, selectAddressDelivery } from '../../../actions/DetailVehicleAction';
import { getDayNum, getPromoPrice, getPrice, isPercent } from '../../../service/booking/HandleBooking'
import BookingApi from '../../../service/booking/BookingApi';
import { Icon } from 'react-native-elements'
import IconProc from "react-native-vector-icons/MaterialCommunityIcons"



class BodyDetail extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            isLoading: false,
            isLoadDeli: false,
            sumPrice: 0,
        })

        this.handleSelectAddress = this.handleSelectAddress.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this._onSelect = this._onSelect.bind(this);
        this._handleInit = this._handleInit.bind(this);
        this._handleChangePromotion = this._handleChangePromotion.bind(this);
        this._handleChangeInputPlace = this._handleChangeInputPlace.bind(this)
    }
    componentDidMount() {
        console.log(this.props.vehicle.vhc_part_name)
        this._handleInit();

    }


    _handleInit() {
        var nameVehicle, arrOptions;
        var { book_rent_date, book_retun_date, vehicle } = this.props;

        nameVehicle = MyUtil.convertNameVehicle(vehicle.vhc_part_name, 35)
        if (vehicle.vhc.vhc_type_id == 1)
            arrOptions = [
                { name: "flow-tree", value: vehicle.vhc.vhc_tms_name, family: "entypo" },
                { name: "seat-recline-normal", value: vehicle.vhc.vhc_seat_num + " chỗ", family: "material-community" },
                { name: "language-typescript", value: vehicle.vhc.vhc_dgn_name, family: "material-community" },
                { name: "fuel", value: vehicle.vhc.vhc_fuel_name, family: "material-community" },
                { name: "paint-bucket", value: vehicle.vhc.vhc_fuel_csum_num, family: "foundation" }]
        else
            arrOptions = [{ name: "flow-tree", value: vehicle.vhc.vhc_tms_name, family: "entypo" },
            { name: "fuel", value: vehicle.vhc.vhc_fuel_name, family: "material-community" }]

        if (book_rent_date && book_retun_date) {
            var dayNum = getDayNum(book_rent_date, book_retun_date);
            var { defaultPrice, extraFee, sumPrice } = getPrice(vehicle, dayNum, book_rent_date, book_retun_date);
            this.props.handleInitPrice(dayNum, defaultPrice, extraFee, sumPrice, nameVehicle, arrOptions)
        }

    }

    handlePress() {
        var message = this.props.isCheck ? "" : "Bạn chưa chọn hình thức đặt xe!";
        message = this.props.isDelivery ? (this.props.deliAddress ? "" : "Vui lòng nhập địa chỉ nhận xe  để tiếp tục!") : message
        if (message) {
            Alert.alert(
                'Thông báo',
                message,
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        } else
            this.props.navigation.navigate("CustomerInfo", { vehicle: this.props.vehicle })
    }

    _handleChangeInputPlace() {
        var sumPrice = this.props.sumPrice - this.props.deliPrice;
        this.props.selectAddressDelivery("", "", sumPrice, 0, 0);

    }
    _onSelect(index, value) {
        let isDelivery = (value == "home") ? true : false;
        this.props.handleChangeDelivery(isDelivery)
    }

    async _handleChangePromotion(value) {
        var { promotionCode, isLoading, promoMessage, promoValue, promoValue, sumPrice, promoPrice } = this.props;
        promotionCode = value;
        promoMessage = "";
        promoValue = 0;

        if (promotionCode && promotionCode.length > 3) {
            isLoading = true;
            await this.handlePromotionCode(promotionCode, isLoading, promoMessage, promoValue, sumPrice);
        } else {
            isLoading = false;
            if (promotionCode === "") promoMessage = ""
            else promoMessage = "Mã giảm giá không tồn tại";
            sumPrice += promoPrice;
            promoPrice = 0;
            this.props.handleChangePromotion(promotionCode, promoMessage, promoValue, isLoading, sumPrice, promoPrice)
        }
    }

    handlePromotionCode = async (promotionCode, isLoading, promoMessage, promoValue, sumPrice) => {
        var { book_rent_date, book_retun_date, vehicle, dayNum, promoPrice } = this.props;

        this.setState({ isLoading: true })
        var options = {
            book_rent_date: book_rent_date,
            book_retun_date: book_retun_date,
            promo_code: promotionCode,
            vhc_part_id: vehicle.vhc_part_id
        }
        var pricePerDay = vehicle.vhc_part_defa_prie;
        await BookingApi.getPromotion(options)
            .then(result => {
                if (result.code === "success") {
                    sumPrice += promoPrice;
                    promoValue = result.data
                    promoPrice = getPromoPrice(promoValue, dayNum, pricePerDay);
                    promoMessage = "";
                    isLoading = false;
                    sumPrice -= promoPrice;
                } else {
                    sumPrice += promoPrice;
                    promoPrice = 0;
                    promoMessage = result.message;
                    isLoading = false;
                }
            })
            .catch(err => { isLoading = false })

        this.props.handleChangePromotion(promotionCode, promoMessage, promoValue, isLoading, sumPrice, promoPrice)

        this.setState({ isLoading: false })
    }

    async handleSelectAddress(data, details) {
        var address, latLng;
        if (details) {
            address = details.formatted_address;
            latLng = details.geometry.location;
        }
        var { vehicle, deliPrice, deliDistance, sumPrice } = this.props;

        if (address && latLng) {
            var options = {
                vhc_part_id: vehicle.vhc_part_id,
                cstm_deli_addr_lat: latLng.lat,
                cstm_deli_addr_lng: latLng.lng,
                cstm_deli_addr: address
            }
            if (deliPrice && deliPrice > 0) sumPrice -= deliPrice
            this.setState({ isLoadDeli: true })
            await BookingApi.getDeliPrice(options)
                .then(data => {
                    deliPrice = data["price"];
                    deliDistance = data["distance"]
                    deliPrice ? sumPrice += deliPrice : null
                })
                .catch(err => console.log(err))
        }
        this.props.selectAddressDelivery(address, latLng, sumPrice, deliDistance, deliPrice);
        this.setState({ isLoadDeli: false })
    }

    _renderItem = ({ item }) => {

        return (
            <View style={styles.itemOption}>
                <Icon type={item.family} name={item.name} color={'#00363d'} size={35} />

                <Text style={styles.textSmall}>{item.value}</Text>
            </View>
        )
    }
    _keyExtractor = (item, index) => item.name;

    _renderContainerDelivery = () => (
        <View style={styles.detailRentalContainer}>
            <View style={styles.rowDetail}>
                <Text style={styles.titleDetail}>Hình thức nhận xe</Text>
            </View>
            <View style={styles.rowDelivery}>
                <RadioGroup
                    selectedIndex={this.props.selectedIndex}
                    size={22}
                    thickness={2}
                    color="#bcbcbc"
                    activeColor="#77a300"
                    onSelect={this._onSelect}>
                    <RadioButton value={'store'} style={styles.radioButton}>
                        <View style={styles.viewRadio}>
                            <Text style={styles.titleDelivery}>Nhận xe tại đại lý</Text>
                            <Text style={styles.descriptionDelivery}>Khách hàng sẽ đến đại lý nhận xe</Text>
                        </View>
                    </RadioButton>

                    <RadioButton value={'home'} style={styles.radioButton}>
                        <View style={styles.viewRadio}>
                            <Text style={styles.titleDelivery}>Nhận xe tại nhà</Text>
                            <Text style={styles.descriptionDelivery}>Xe sẽ được giao tới địa điểm bạn lựa chọn. Phí tính theo km hoặc theo lượt tuỳ từng đối tác</Text>
                        </View>
                    </RadioButton>

                </RadioGroup>
            </View>

        </View>
    )

    _renderProduce = () => {
        const procs = this.props.vehicle["part"]["part_procs"];
        return (
            <View style={styles.detailRentalContainer}>
                <View style={styles.rowDetail}>
                    <Text style={styles.titleDetail}>Thủ tục</Text>
                </View>
                {procs ? procs.map((item) => {
                    return (
                    <View style={styles.rowDateTime} key = {item.part_proc_id}>
                        <IconProc.Button
                            name="passport"
                            size={22}
                            style={styles.iconSmall}
                            color="#00363d"
                            backgroundColor='transparent'
                            underlayColor='transparent'
                        />

                        <Text style={styles.textMedium}>{item.proc.proc_name}</Text>
                    </View>)
                }) : null
                }

            </View>

        )
    }

    render() {
        const { vehicle, nameVehicle } = this.props
        return (
            <View style={styles.container}>
                <View style={styles.headContainer} >
                    <Text style={styles.nameVehicle}>{nameVehicle[0]}</Text>
                    {nameVehicle[1] ? <Text style={styles.nameVehicle}>{nameVehicle[1]}</Text> : null}
                    <Text style={styles.textSmall}>{vehicle.vhc.vhc_dgn_name} hoặc tương đương</Text>
                    <FlatList
                        style={styles.flatListOptions}
                        horizontal={true}
                        data={this.props.arrOptions}
                        extraData={this.props}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                {this._renderProduce()}

                <TimeRental />


                {this._renderContainerDelivery()}
                {this.props.isDelivery ? <View style={styles.detailRentalContainer}>
                    <View style={styles.rowDetail}>
                        <Text style={styles.titleDetail}>Địa chỉ nhận xe</Text>
                    </View>
                    <PlaceAutoComplete handleSelectAddress={this.handleSelectAddress}
                        handleChangeInputPlace={this._handleChangeInputPlace} />
                    {this.props.deliPrice && !this.props.isLoadDeli ? <View style={{ flexDirection: "column", width: "100%" }}>
                        <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Text>Quãng đường phụ trội </Text>
                            <Text style={{ fontWeight: "600", color: "#00363d" }}>{this.props.deliDistance} km</Text>
                            <Text>|| Chi phí giao xe: </Text>
                        </View>
                        <Text style={{ fontWeight: "600", color: "#00363d" }}>{MyUtil.currencyFormat(this.props.deliPrice)} VNĐ</Text>
                    </View> : null}
                    {this.state.isLoadDeli ? <View style={{ marginTop: 5, color: "#00363d" }}><Text>Đang tính toán ...</Text></View> : null}
                </View> : null}


                <View style={styles.detailRentalContainer}>
                    <View style={styles.rowDetail}>
                        <Text style={styles.titleDetail}>Mã giảm giá</Text>
                    </View>
                    <TextInput style={styles.textPromotion} placeholder="Nhập mã giảm giá"
                        onChangeText={this._handleChangePromotion} />
                    {(!this.state.isloading && (this.props.promoMessage || this.props.promoValue == 0)) ?
                        <Text style={styles.promoMessageError}>{this.props.promoMessage}</Text>
                        :
                        <Text style={styles.promoMessageSuscess}>Mã giảm giá {isPercent(this.props.promoValue) ? this.props.promoValue + " %" : MyUtil.currencyFormat(this.props.promoValue) + " VNĐ"}</Text>
                    }
                    {this.state.isLoading ? <Text>Đang kiểm tra ...</Text> : null}

                </View>

                <PriceVehicle />


                <ButtonBottom
                    navigation={this.props.navigation}
                    handlePress={this.handlePress}
                    screenNext="CustomerInfo"
                    titleButton="TIẾP TỤC" />

            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        city: state.home.citySelect,
        isDelivery: state.detail.isDelivery,
        promotionCode: state.detail.promotionCode,
        promoMessage: state.detail.promoMessage,
        promoValue: state.detail.promoValue,
        promoPrice: state.detail.promoPrice,
        sumPrice: state.detail.sumPrice,
        isLoading: state.detail.isLoading,
        book_rent_date: state.calendar.book_rent_date,
        book_retun_date: state.calendar.book_retun_date,
        dayNum: state.detail.dayNum,
        defaultPrice: state.detail.defaultPrice,
        extraFee: state.detail.extraFee,
        deliPrice: state.detail.deliPrice,
        deliDistance: state.detail.deliDistance,
        deliAddress: state.detail.deliAddress,
        isCheck: state.detail.isCheck,
        selectedIndex: state.detail.selectedIndex,
        nameVehicle: state.detail.nameVehicle,
        arrOptions: state.detail.arrOptions,
        // vehicle: state.listVehicles.vehicle

    }
}
export default connect(mapStateToProps, {
    handleChangeDelivery: handleChangeDelivery,
    handleInitPrice: handleInitPrice,
    handleChangePromotion: handleChangePromotion,
    handleLoad: handleLoad,
    selectAddressDelivery: selectAddressDelivery
})(BodyDetail);
