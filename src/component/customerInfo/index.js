import React, { Component } from 'react';
import { View, Text, TextInput, Alert, AsyncStorage, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationActions, StackActions } from 'react-navigation';
import styles from './CustomerInfoStyle'
import TimeRental from '../detailVehicle/TimeRental';
import PriceVehicle from '../detailVehicle/PriceVehicle';
import ButtonBottom from '../../view/ButtonBottom';
import { connect } from 'react-redux';
import { required, email, phone } from '../../util/Validate'
import {
    handleChangPhone, handleChangeEmail,
    handleChangeFullName, handleChangeNote,
    handleBooking, handleFocusInput,
    initCustomerInfo
} from '../../actions/CustomerInfoAction'
import { handleShowBooking } from '../../actions/HomeAction'
import BookingApi from '../../service/booking/BookingApi';
import MyUtil from '../../util/MyUtil';
import EmailTemplate from '../templete/Email.js';
import EmailTemplateUs from '../templete/EmailForUs.js';

class CustomerInfo extends Component {
    constructor(props) {
        super(props);
        this.handlePress = this.handlePress.bind(this);
        this._handleChangeFullName = this._handleChangeFullName.bind(this);
        this._handleChangeEmail = this._handleChangeEmail.bind(this);
        this._handleChangePhone = this._handleChangePhone.bind(this);
        this._handleChangeNote = this._handleChangeNote.bind(this);
        this._handleCheck = this._handleCheck.bind(this);
        this._handleFocusTextInput = this._handleFocusTextInput.bind(this)
    }
    async componentDidMound() {
        this.scroll.scrollTo({ x: 0, y: 0, animated: true });
        var fullName, email, phone;
        fullName = await AsyncStorage.getItem("fullName");
        email = await AsyncStorage.getItem("email");
        phone = await AsyncStorage.getItem("phone");
        fullName = fullName ? fullName : "";
        email = email ? email : "";
        phone = phone ? phone : "";
        this.props.initCustomerInfo(email, phone, fullName)
    }

    async _handleChangeFullName(text) {
        var errFullName = required(text);
        this.props.handleChangeFullName(text, errFullName);
        if (errFullName == "") {
            await AsyncStorage.setItem("fullName", text);
        }
        fullName = await AsyncStorage.getAllKeys();
    }

    _handleFocusTextInput = (index) => {
        this.props.handleFocusInput(index);
    }
    _handleChangeEmail(text) {
        var errEmail = required(text) || email(text);
        this.props.handleChangeEmail(text, errEmail);
    }
    _handleChangeNote(text) {
        this.props.handleChangeNote(text)
    }
    _handleChangePhone(text) {
        var errPhone = required(text) || phone(text);
        this.props.handleChangPhone(text, errPhone)
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitleStyle: styles.headerTitleStyle,
            headerStyle: styles.headerStyle,
            headerLeft: (
                <View style={{ flexDirection: "row" }}>
                    <Icon.Button
                        name="arrow-back"
                        size={28}
                        color="#00363d"
                        style={styles.iconBack}
                        backgroundColor='transparent'
                        underlayColor='transparent'
                        onPress={() => navigation.goBack()} />

                    <Text style={styles.titleStyles}>Thông tin khách hàng</Text>
                </View>
            )
        }
    }
    _handleCheck() {
        const { phone, email, fullName, note, errEmail, errFullName, errPhone } = this.props;
        if (phone && email && fullName && !errEmail && !errFullName && !errPhone)
            return true;
        return false;
    }

    async handlePress() {
        var vehicle = this.props.navigation.state.params.vehicle;
        const { book_rent_date, book_retun_date, fullName, email, phone, note, deliAddress, promotionCode, latlng, isDelivery } = this.props
        var check = this._handleCheck();

        this.props.handleBooking(booking);
        this.props.handleShowBooking(true);
        if (check) {
            var booking;
            var options = {
                cstm_name: fullName,
                cstm_emai: email,
                cstm_phon: phone,
                cstm_deli_addr: deliAddress,
                book_rent_date: book_rent_date,
                book_retun_date: book_retun_date,
                book_note: note,
                vhc_part_id: vehicle.vhc_part_id,
                vhc_part_name: vehicle.vhc_part_name,
                cstm_deli_addr_lat: latlng ? latlng.lat : "",
                cstm_deli_addr_lng: latlng ? latlng.lng : "",
                book_deli_form_id: isDelivery ? 1 : 0,
                cstm_pay_meth_id: 1,
                book_src_key: null,
                use_acc_id: null,
                promo_code: promotionCode
            }
            await BookingApi.createBooking(options).then(resulf => {
                booking = resulf
            }).catch((err) => {
                Alert.alert(
                    'Lỗi',
                    'Đã xảy ra lỗi hệ thống! Vui lòng liên hệ hotline 0903229906/1900636585 để đặt xe!',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }
            )
            if (booking["code"] == "success") {
                booking = booking["data"];
                this.sendEmailCustomer(booking)
                this.sendEmailUs(booking);
                BookingApi.postExportGGSheet(booking)
                this.props.handleBooking(booking);
                this.props.handleShowBooking(true);

                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                Alert.alert(
                    'Lỗi',
                    booking["message"],
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            }

        } else {
            Alert.alert(
                'Thông báo',
                'Vui lòng điền đầy đủ thông tin để đặt xe!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }

    }

    sendEmailCustomer = async (booking) => {
        var params = {
            cstm_emai: booking.cstm_emai,
            subject: "Thông tin đặt xe" + " : " + booking.book_code,
            content: EmailTemplate.getTemplate(booking)
        }
        await BookingApi.postSendMail(params)
            .then(d => console.log(d))
            .catch(err => console.log(err))
    }

    sendEmailUs = async (booking) => {

        var params = {
            cstm_emai: "contact@chungxe.vn",
            subject: "[Booking " + MyUtil.getDatetimeFormatCrta(new Date()) + " ]" + " : " + booking.book_code,
            content: EmailTemplateUs.getTemplate(booking)
        }
        await BookingApi.postSendMail(params)
            .then(d => {
                this.setState({ isSending: 2 })
            })
            .catch(err => console.log(err))
    }

    render() {
        const { focusIndex } = this.props;
        return (
            <ScrollView showsHorizontalScrollIndicator={false}
                ref={(c) => { this.scroll = c }} >
                <View style={styles.cstmInfoContainer}>
                    <View style={styles.viewInput}>
                        <Text style={styles.titleBold}>Họ và tên (*)</Text>
                        <TextInput style={[styles.textInput, (focusIndex == 1) && { borderColor: "#77a300" }]}
                            placeholder="Nhập họ và tên"
                            value={this.props.fullName}
                            blurOnSubmit={false}
                            onSubmitEditing={() => { this.phoneInput.focus(); }}
                            onChangeText={this._handleChangeFullName}
                            clearButtonMode='always'
                            onFocus={() => this._handleFocusTextInput(1)} />
                        {this.props.errFullName ? <Text style={styles.textError}>{this.props.errFullName}</Text> : null}

                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titleBold}>Số điện thoại (*)</Text>
                        <TextInput style={[styles.textInput, (focusIndex == 2) && { borderColor: "#77a300" }]}
                            selectionColor="#77a300"
                            ref={(input) => { this.phoneInput = input; }}
                            value={this.props.phone}
                            keyboardType="numeric"
                            onChangeText={this._handleChangePhone}
                            onSubmitEditing={() => { this.emailInput.focus(); }}
                            blurOnSubmit={false}
                            placeholder="Nhập số điện thoại"
                            clearButtonMode='always'
                            onFocus={() => this._handleFocusTextInput(2)} />
                        {this.props.errPhone ? <Text style={styles.textError}>{this.props.errPhone}</Text> : null}

                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titleBold}>Email (*)</Text>
                        <TextInput style={[styles.textInput, (focusIndex == 3) && { borderColor: "#77a300" }]} keyboardType="email-address"
                            ref={(input) => { this.emailInput = input; }}
                            value={this.props.email}
                            onChangeText={this._handleChangeEmail}
                            blurOnSubmit={false}
                            onSubmitEditing={() => { this.noteInput.focus(); }}
                            placeholder="Nhập email"
                            clearButtonMode='always'
                            onFocus={() => this._handleFocusTextInput(3)} />
                        {this.props.errEmail ? <Text style={styles.textError}>{this.props.errEmail}</Text> : null}

                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titleBold}>Hình thức thanh toán (*)</Text>
                        <TextInput style={styles.textInput}
                            placeholder="Hình thức thanh toán" value="Trả sau" editable={false} />
                    </View>
                    <View style={styles.viewInput}>
                        <Text style={styles.titleBold}>Ghi chú</Text>
                        <TextInput style={[styles.textInput, { height: 90 }]}
                            ref={(input) => { this.noteInput = input; }}
                            value={this.props.note}
                            onChangeText={this._handleChangeNote}
                            multiline={true}
                            placeholder="Ghi chú thêm" />
                    </View>
                </View>
                <TimeRental />
                <PriceVehicle />

                <ButtonBottom
                    navigation={this.props.navigation}
                    backgroundColorButton="#77a300"
                    screenNext="Home"
                    handlePress={this.handlePress}
                    titleButton="ĐẶT XE" />
            </ScrollView>
        )
    }
}

function mapStateToProps(state) {
    return {
        fullName: state.customer.fullName,
        errFullName: state.customer.errFullName,
        email: state.customer.email,
        errEmail: state.customer.errEmail,
        phone: state.customer.phone,
        errPhone: state.customer.errPhone,
        note: state.customer.note,
        paymentId: state.customer.paymentId,
        book_rent_date: state.calendar.book_rent_date,
        book_retun_date: state.calendar.book_retun_date,
        deliAddress: state.detail.deliAddress,
        latlng: state.detail.latlng,
        isDelivery: state.detail.isDelivery,
        promotionCode: state.detail.promotionCode,
        focusIndex: state.customer.focusIndex
    }
}
export default connect(mapStateToProps, {
    handleChangPhone: handleChangPhone,
    handleChangeEmail: handleChangeEmail,
    handleChangeFullName: handleChangeFullName,
    handleChangeNote: handleChangeNote,
    handleShowBooking: handleShowBooking,
    handleBooking: handleBooking,
    initCustomerInfo: initCustomerInfo,
    handleFocusInput: handleFocusInput
})(CustomerInfo);