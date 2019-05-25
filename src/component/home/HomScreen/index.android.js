import React, { Component } from 'react'
import { View, Text, Easing, Keyboard, TouchableOpacity, Image, BackHandler, FlatList } from 'react-native'
import styles from './HomeScreenStyle'
import MapContainer from "../MapContainer"
import SearchBox from '../SearchBox';
import Icon from 'react-native-vector-icons/Ionicons'
import IconBell from 'react-native-vector-icons/EvilIcons'
import IconUser from 'react-native-vector-icons/FontAwesome'
import CityApi from '../../../service/partner/CityApi';
import { setListCitys, changeCity, handleLoading, handleShowBooking } from "../../../actions/HomeAction"
import { changeListCars, changeListMotorbikes } from '../../../actions/ListVehicleAction'
import { connect } from 'react-redux';
import ProgressDialog from "../../../view/dialog/ProgressDialog";
import Modal from "react-native-modalbox";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import CarImage from '../../../assets/images/car1.png';
import { theme } from '../../../constants';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectCity: false,
            listCitys: [],
            citySelect: "",
            indexSelect: -1,
            visibleModal: false
        })
        this.openCalendar = this.openCalendar.bind(this);
        this.handleSelectCity = this.handleSelectCity.bind(this);
        this._handleCloseDialog = this._handleCloseDialog.bind(this);
        this.showBooking = this.props.showBooking;
        this.handleContinue = this.handleContinue.bind(this);
        this.locationCheck = this.locationCheck.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

    }
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: <Text style={styles.headerTitle}>Đặt xe</Text>,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },

            headerLeft: (
                <Icon.Button
                    name="md-menu"
                    size={28}
                    style={styles.buttonHeaderRight}
                    color={theme.colors.greenBold}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress = {() => navigation.openDrawer()}
                />

            ),
            headerRight: (
                <IconBell.Button
                    name="bell"
                    size={30}
                    style={styles.buttonHeaderRight}
                    color={theme.colors.greenBold}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                />
            )
        };
    };
    componentWillMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            let screen = this.props.navigation.state.routeName;
            console.log(screen, "&&&&&")
            if (screen == "Home") {
                BackHandler.exitApp();
                return true;
            }
            return false;
          });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    handleBackButtonClick() {
        let screen = this.props.navigation.state.routeName;
        if (screen == "Home") {
            BackHandler.exitApp();
            return true;
        }
        return false;
    }
    locationCheck(geolocationSettings = { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000, distanceFilter: 10 }) {
        return (dispatch) => {
            navigator.geolocation.watchPosition(
                () => {
                    dispatch({
                        type: types.LOCATION_STATE,
                        state: true
                    })
                },
                () => {
                    dispatch({
                        type: types.LOCATION_STATE,
                        state: false
                    })
                },
                geolocationSettings)
        }
    }

    async componentDidMount() {
        // SplashScreen.hide();
        this.locationCheck()
        var list = await CityApi.getAll();
        this.props.setListCitys(list);
    }
    openCalendar() {
        this.props.navigation.navigate('MyCalendar')
    }

    handleContinue() {
        var arrEmpty = []
        this.props.changeListCars(arrEmpty);
        this.props.changeListMotorbikes(arrEmpty);
        this.props.navigation.navigate("ListVehicle")
    }
    renderHeaderDialog = () => (
        <View>
            <View style={styles.headerDialog}>
                <Text style={styles.titleHeaderDialog}>Đặt xe thành công!</Text>
                <Icon.Button
                    name="close"
                    size={30}
                    color="#00363d"
                    style={styles.iconClose}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress={this._handleCloseCalendar}
                    onPress={this._handleCloseDialog}
                />
            </View>
        </View>
    )

    _handleCloseDialog() {
        if (this.dialog) {
            this.dialog.handleDismiss();
            this.props.handleShowBooking(false);
        } else {
            this.props.handleShowBooking(false);
        }

    }
    handleSelectCity() {
        Keyboard.dismiss()
        this.refs.modal.open()
    }
    _handlePressCity = (item, index) => {
        console.log(item.city_name + index)
        this.refs.modal.close()
        this.props.changeCity(item, index)
    }
    _renderSeparator = () => (
        <View
            style={{
                height: 1,
                width: "100%",
                backgroundColor: "#bcbcbc"
            }}
        />
    );

    _handleData = () => {
        var listCitys = this.props.listCitys;
        var items = []
        if (listCitys) {
            listCitys.map(item => {
                items.push({ "title": item.city_name })
            })
        }
        return items;
    }

    render() {

        return (
            <View style={styles.container}>
                <MapContainer />
                <SearchBox handleSelectCity={this.handleSelectCity} navigation={this.props.navigation} />
                <Modal
                    backdropPressToClose={true}
                    backdrop={false}
                    isOpen={this.state.visibleModal}
                    position={"bottom"}
                    swipeToClose={false}
                    ref={"modal"}
                    style={styles.bottomModal}
                    animationDuration={300}
                    easing={Easing.linear}
                >
                    <FlatList
                        data={this.props.dataCity}
                        ItemSeparatorComponent={this._renderSeparator}
                        renderItem={({ item, index }) =>
                            <TouchableOpacity style={styles.itemCityAndroid} activeOpacity={1}
                                key={item.city_name + index}
                                onPress={() => this._handlePressCity(item, index)} >
                                <Text style={[styles.textCityNotSelect, (item.city_name == this.props.citySelect.city_name) && styles.textCitySelect]}>{item.city_name}</Text>
                                {(item.city_name == this.props.citySelect.city_name) && <Icon.Button
                                    name="md-checkmark"
                                    size={20}
                                    style={styles.iconCheckCity}
                                    color="#77a300"
                                    backgroundColor='transparent'
                                    underlayColor='transparent'
                                />
                                }
                            </TouchableOpacity>
                        }
                        keyExtractor={item => item}
                    />
                </Modal>

                {(this.props.dateTimeDisplay && this.props.citySelect) ?
                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={this.handleContinue}
                        underlayColor='#77a300b0'
                        activeOpacity={0.6}>
                        <Text style={styles.textContinue}
                            onPress={this.handleContinue}>TIẾP TỤC</Text>
                    </TouchableOpacity> : null}
                <Dialog
                    ref={ref => this.dialog = ref}
                    visible={this.showBooking}
                    width={0.9}
                    animationDuration={0}
                    rounded={false}
                    dialogTitle={this.renderHeaderDialog()}
                >
                    <DialogContent >
                        <View style={styles.firstLineDialog}>
                            <Text style={styles.textSuccess}>Mã đặt xe của bạn là :  </Text>
                            <Text style={[styles.textSuccess, { color: "#00363d", fontWeight: "600" }]}>{this.props.booking ?this.props.booking.book_code :""}</Text>
                        </View>
                        <Text style={styles.textSuccess}>Chúng tôi sẽ liên lạc lại với bạn để thông báo tình trạng của xe ít nhất 6h trước thời điểm thuê xe!</Text>
                        <View style={styles.viewImage}>
                            <Image source={CarImage}
                                style={styles.imageVehicle}
                                resizeMode="stretch" />
                        </View>

                    </DialogContent>
                </Dialog>

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
        );
    }
}
function mapStateToProps(state) {
    return {
        citySelect: state.home.citySelect,
        indexSelect: state.home.indexSelect,
        listCitys: state.home.listCitys,
        dataCity: state.home.dataCity,
        loading: state.home.loading,
        booking: state.calendar.booking,
        showBooking: state.home.showBooking,
        dateTimeDisplay: state.calendar.dateTimeDisplay
    };
}

export default connect(mapStateToProps, {
    setListCitys: setListCitys,
    changeCity: changeCity,
    handleLoading: handleLoading,
    handleShowBooking: handleShowBooking,
    changeListCars: changeListCars,
    changeListMotorbikes: changeListMotorbikes
})(HomeScreen);

