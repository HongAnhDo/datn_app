import React, { Component } from 'react'
import { View, Text, Image, Platform, Button, Keyboard, NetInfo, TouchableOpacity } from 'react-native'
import styles from './HomeScreenStyle'
import MapContainer from "../MapContainer"
import SearchBox from '../SearchBox';
import IconMenu from 'react-native-vector-icons/Ionicons'
import IconBell from 'react-native-vector-icons/EvilIcons'
import RNBottomActionSheet from 'react-native-bottom-action-sheet'
import CityApi from '../../../service/partner/CityApi';
import { setListCitys, changeCity, handleLoading, handleShowBooking } from "../../../actions/HomeAction"
import { connect } from 'react-redux';
import ProgressDialog from "../../../view/dialog/ProgressDialog";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CarImage from '../../../assets/images/car1.png'
import { changeListCars, changeListMotorbikes } from '../../../actions/ListVehicleAction'
import { theme } from '../../../constants';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectCity: false,
            listCitys: [],
            citySelect: "",
            indexSelect: -1
        })

        this.openCalendar = this.openCalendar.bind(this);
        this.handleSelectCity = this.handleSelectCity.bind(this);
        this._handleCloseDialog = this._handleCloseDialog.bind(this);
        this.showBooking = this.props.showBooking;
        this.handleContinue = this.handleContinue.bind(this);
    }

    async componentDidMount() {
        NetInfo.isConnected.fetch().then(isConnected => {
            if (!isConnected) {
                Alert.alert(
                    'Không có kết nối mạng',
                    'Vui lòng kiểm tra lại kết nối mạng của bạn và khởi động lại để sử dụng ứng dụng!',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            } else {
                console.log("aaa")
            }
        });
        console.log("bbb")

        if (this.props.dataCity.length == 0) {
            this.props.handleLoading(true)
            var list = await CityApi.getAll();
            this.props.setListCitys(list);
            this.props.handleLoading(false)
        }

    }
    handleContinue() {
        var arrEmpty = []
        this.props.changeListCars(arrEmpty);
        this.props.changeListMotorbikes(arrEmpty);
        this.props.navigation.navigate("ListVehicle")
    }
    openCalendar() {
        this.props.navigation.navigate('MyCalendar')
    }

    handleSelectCity() {
        Keyboard.dismiss()
        if (Platform.OS == "ios") {
            this._showSheetView()
        } else {
            this.RBSheet.open();
            Keyboard.dismiss()
        }
    }
    _renderSeparator = () => {
        return (
            <View
                style={{
                    height: 0.5,
                    width: "100%",
                    backgroundColor: "#CED0CE"
                }}
            />
        );
    }
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

    _showSheetView = () => {
        var listCitys = this._handleData();
        var dataCity = this.props.dataCity;

        let SheetView = RNBottomActionSheet.SheetView
        SheetView.Show({
            title: "Chọn thành phố",
            items: listCitys,
            theme: "light",
            selection: this.props.indexSelect,
            onSelection: selection => {
                this.props.changeCity(dataCity[selection], selection)

            }
        });
    }


    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};

        return {
            headerTitle: <Text style={styles.headerTitle}>Đặt xe</Text>,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },

            headerLeft: (
                <IconMenu.Button
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

    _handlePressCity = (item, index) => {
        this.RBSheet.close()
        this.props.changeCity(item, index)
    }
    _handleCloseDialog() {
        console.log(this.dialog)
        if (this.dialog) {
            this.dialog.handleDismiss();
            this.props.handleShowBooking(false);
        } else {
            this.props.handleShowBooking(false);
        }

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

    render() {

        return (
            <View style={styles.container}>
                <MapContainer citySelect={this.props.citySelect} />
                <SearchBox handleSelectCity={this.handleSelectCity} navigation={this.props.navigation} />

                <ProgressDialog
                    activityIndicatorColor="black"
                    activityIndicatorSize="large"
                    animationType="fade"
                    message="Đang tải ..."
                    visible={this.props.loading}
                    dialogBackgroundColor="transparent"
                    messageStyle={styles.messageStyle}
                />
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
                            <Text style={[styles.textSuccess, { color: "#00363d", fontWeight: "600" }]}>HN11023</Text>
                        </View>
                        <Text style={styles.textSuccess}>Chúng tôi sẽ liên lạc lại với bạn để thông báo tình trạng của xe ít nhất 6h trước thời điểm thuê xe!</Text>
                        <View style={styles.viewImage}>
                            <Image source={CarImage}
                                style={styles.imageVehicle}
                                resizeMode="stretch" />
                        </View>

                    </DialogContent>
                </Dialog>

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

