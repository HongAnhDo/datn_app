import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { handleScrollFilter } from '../../../actions/ListVehicleAction';
import CheckboxGroup from '../../../view/CheckboxGroup';
import { theme } from '../../../constants'
import CustomMarker from './CustomMarker';
import MyUtil from '../../../util/MyUtil'
import styles, { pickerSelectStyles, pickerSelectAndroidStyles } from './FilterStyle'
import ButtonBottom from '../../../view/ButtonBottom';
import BrandApi from '../../../service/vehicle/BrandApi'
import TransmissionApi from '../../../service/vehicle/TransmissionApi'
import SeatApi from '../../../service/vehicle/SeatApi'
import {handleChangeFilterCar} from '../../../actions/ListVehicleAction'
const TransmissionData = require('../../../service/vehicle/tmsData.json')
const width90 = (Dimensions.get('window').width - 40);
const tmsAll = {
    "vhc_tms_name": "Tất cả",
    "vhc_tms_id": 0
}

let _this = null
class FilterVehicle extends Component {
    constructor(props) {
        super(props);
        this.inputRefs = {
            firstTextInput: null,
            brand: null,
            favSport1: null,
            lastTextInput: null,
        };

        this.state = {
            brand: undefined,
            arrBrands: [],
            filterTms: props.tmsCar,
            arrTmss: TransmissionData,
            multiSliderValue: props.priceCar || [400000, 3000000],
            arrSeats: [],
            seats: props.seatCar,
        };

        this._setFilters = this._setFilters.bind(this);
        this._setSeatFilter = this._setSeatFilter.bind(this);
        this.handlePress = this.handlePress.bind(this);


    }
    static navigationOptions = {
        header: null
    };

    async componentDidMount() {
        _this = this;
        var { arrTmss, arrBrands, multiSliderValue } = this.state
        var vhc_type_id = 1;
        var tmss = await TransmissionApi.getAllTransmisssion(vhc_type_id);
        tmss = tmss ? tmss : [];
        arrTmss = []
        arrTmss.push(tmsAll)
        tmss.forEach(item => {
            arrTmss.push(item)
        });

        var brands = await BrandApi.getBrandByType(vhc_type_id);
        brands = brands ? brands : [];
        brands.forEach(item => {
            arrBrands.push({
                label: item.vhc_bran_name,
                value: item
            })
        });

        var seats = await SeatApi.getAllSeat();
        seats = seats ? seats : [];
        console.log("component did mound")
        this.setState({ arrTmss, arrBrands, arrSeats: seats ,multiSliderValue})
    }

    componentWillReceiveProps(nextProps){
        var {seatCar, tmsCar, priceCar, brandCar} = nextProps;
        console.log(seatCar, tmsCar, priceCar, brandCar, "////////")
    }

    handlePress(){
        var {arrSeats, seats, filterTms, brand, multiSliderValue} = this.state
        var seatId =[];
        seats && seats.forEach(seat =>{
            let value = arrSeats.find(item => item.vhc_seat_num == seat)
            seatId.push(value.vhc_seat_id)
        })
        console.log(filterTms.vhc_tms_id,brand?brand.vhc_bran_id:"" , seatId,multiSliderValue)
       this.props.handleChangeFilterCar(filterTms.vhc_tms_id,brand?brand.vhc_bran_id:"" , seatId,multiSliderValue)
       this.props.navigation.navigate("ListVehicle");
    }

    multiSliderValuesChange = values => {
        this.setState({
            multiSliderValue: values,
        });
    };

    onChangeHeaderVisibility(value) {
        const { headerFilterVisiable } = _this.props;
        if (value != headerFilterVisiable) {
            _this.props.handleScrollFilter(value);
        }
    }
    _setFilters(value) {
        this.setState({ filterTms: value })
    }

    _setSeatFilter(selected) {
        this.setState({ seats: selected })
    }
    _renderTypeVehicles = () => (
        <CheckboxGroup
            callback={(selected) => this._setSeatFilter(selected)}
            iconColor={"#77a300"}
            iconSize={30}
            checkedIcon="check-box"
            uncheckedIcon="check-box-outline-blank"
            checkboxes={[
                {
                    label: "4 chỗ", // label for checkbox item
                    value: 4, // selected value for item, if selected, what value should be sent?
                    selected: false // if the item is selected by default or not.
                },
                {
                    label: "5 chỗ",
                    value: 5
                },
                {
                    label: "7 chỗ",
                    value: 7
                },
            ]}
            labelStyle={styles.labelStyle}
            rowStyle={styles.rowStyle}
            rowDirection={"column"}
        />
    )
    _renderFilterPrice = () => (
        <View  style ={{marginLeft:5}}>
            <MultiSlider
                values={[
                    this.state.multiSliderValue[0],
                    this.state.multiSliderValue[1],
                ]}
                sliderLength={width90}
                onValuesChange={this.multiSliderValuesChange}
                useNativeAndroidPickerStyle={false}
                min={400000}
                max={3000000}
                step={100000}
                allowOverlap
                snapped
                selectedStyle={{
                    backgroundColor: theme.colors.greenLight,
                    height: 4
                }}
                containerStyle={{
                    height: 40,
                }}
                trackStyle={{
                    height: 4,
                    backgroundColor: 'gray',
                }}
                containerStyle={{
                    height: 40,
                }}
                touchDimensions={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    slipDisplacement: 40,
                }}
                customMarker={CustomMarker}

            />
            <View style={styles.sliderOne}>
                <Text style={styles.labelPrice}>{MyUtil.currencyFormat(this.state.multiSliderValue[0]) + " VND"} </Text>
                <Text style={styles.labelPrice}> - </Text>
                <Text style={styles.labelPrice}>{MyUtil.currencyFormat(this.state.multiSliderValue[1]) + " VND"}</Text>
            </View>
        </View>

    )
    _renderFilterBrandAndroid = (placeholder, arrBrands) => (
        <RNPickerSelect
            placeholder={placeholder}
            items={arrBrands}
            onValueChange={(value) => {
                this.setState({
                    brand: value,
                });
            }}
            onUpArrow={() => {
                this.inputRefs.firstTextInput.focus();
            }}
            onDownArrow={() => {
                this.inputRefs.favSport1.togglePicker();
            }}
            style={pickerSelectAndroidStyles}


            children={
                <View style={pickerSelectStyles.container}>
                    <TextInput
                        style={[{ flex: 1, textTransform: "capitalize", paddingLeft: 10 }, styles.labelPrice]}
                        ref={(el) => {
                            this.inputRefs.brand = el;
                        }}
                        value={this.state.brand? this.state.brand.vhc_bran_name:""}
                        placeholderTextColor="#000"
                        placeholder="Tất cả"
                    ></TextInput>
                    <Icon size={30} color="gray" name="md-arrow-dropdown" style={pickerSelectStyles.iconContainer} />
                </View> 
            }
            Icon={() => {
                return <Icon size={30} color="gray" name="md-arrow-dropdown" />;
            }}
        />)


    _renderFilterBrand = (placeholder, arrBrands) => (
        <RNPickerSelect
            placeholder={placeholder}
            items={arrBrands}
            onValueChange={(value) => {
                this.setState({
                    brand: value,
                });
            }}
            onUpArrow={() => {
                this.inputRefs.firstTextInput.focus();
            }}
            onDownArrow={() => {
                this.inputRefs.favSport1.togglePicker();
            }}
            style={pickerSelectStyles}
            ref={(el) => {
                this.inputRefs.brand = el;
            }}
            value={this.state.brand}

            Icon={() => {
                return <Icon size={30} color="gray" name="md-arrow-dropdown" />;
            }}
        />

    )
    render() {
        const placeholder = {
            label: 'Tất cả',
            value: null,
            color: 'black',
        };
        const { arrTmss, filterTms, arrBrands } = this.state
        const lengthTms = arrTmss.length
        const { headerFilterVisiable } = this.props
        const ios = Platform.OS =='ios'
        return (
            <View style={{ flex: 1 }}>
                <ParallaxScrollView
                    backgroundColor="white"
                    headerBackgroundColor="white"
                    onChangeHeaderVisibility={this.onChangeHeaderVisibility}
                    stickyHeaderHeight={STICKY_HEADER_HEIGHT}
                    parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
                    backgroundSpeed={10}
                    style={{ width: "100%" }}
                    renderForeground={() => (
                        <View key="parallax-header" style={styles.parallaxHeader}>
                            <Text style={styles.sectionSpeakerText}>LỌC XE</Text>
                        </View>
                    )}

                    renderStickyHeader={() => (
                        <View key="sticky-header" style={styles.stickySection}>
                            <Text style={styles.stickySectionText}>LỌC XE </Text>
                        </View>
                    )}

                    renderFixedHeader={() => (
                        <View key="fixed-header" style={[styles.fixedSection, (headerFilterVisiable === false) && { borderColor: "#bcbcbc", borderBottomWidth: 0.5 }]}>
                            <View style={{ flex: 1 }}>
                                <Icon.Button
                                    name="md-close"
                                    size={28}
                                    color="#00363d"
                                    backgroundColor='transparent'
                                    underlayColor='transparent'
                                    onPress={() => this.props.navigation.navigate('ListVehicle')}

                                />
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text style={{ flex: 1, padding: 15 }}>RESET</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )} >
                    <ScrollView contentContainerStyle={styles.bodyFilter}>
                        <Text style={styles.titleFilter}>SỐ GHẾ</Text>
                        {this._renderTypeVehicles()}
                        <Text style={styles.titleFilter}>LOẠI ĐỘNG CƠ</Text>
                        <View style={styles.group}>
                            {arrTmss ? arrTmss.map((item, index) =>
                                <View style={{ flex: 1 }} key={item["vhc_tms_id"]}>
                                    <TouchableOpacity
                                        activeOpacity = {0.9}
                                        style={{ ...styles.button, ...(index == 0) && styles.first, ...(index == 2) && styles.last, ...(filterTms["vhc_tms_name"] == item["vhc_tms_name"]) && styles.active }}
                                        onPress={() => this._setFilters(item)}
                                    >
                                        <Text style={{ ...styles.buttonText, ...filterTms["vhc_tms_name"] == item["vhc_tms_name"] && styles.activeText }}>{item.vhc_tms_name}</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                                : null}
                        </View>

                        <Text style={[styles.titleFilter, { marginTop: 35 }]}>HÃNG XE</Text>
                        {ios ?this._renderFilterBrand(placeholder, arrBrands): this._renderFilterBrandAndroid(placeholder, arrBrands)}
                        <Text style={{ ...styles.titleFilter, marginTop: 35 }}>TẦM GIÁ</Text>
                        {this._renderFilterPrice()}
                    </ScrollView>
                </ParallaxScrollView>
                <ButtonBottom
                    backgroundColorView="#fff"
                    handlePress={this.handlePress}
                    screenNext="CustomerInfo"
                    titleButton="TIẾP TỤC" />

            </View>
        );
    }
}



const PARALLAX_HEADER_HEIGHT = 105;
const STICKY_HEADER_HEIGHT = 80;

function mapStateToProps(state) {
    return {
        headerFilterVisiable: state.listVehicles.headerFilterVisiable,
        tmsCar: state.listVehicles.tmsCar,
        seatCar: state.listVehicles.seatCar,
        brandCar:state.listVehicles.brandCar,
        priceCar: state.listVehicles.priceCar,
        
    }
}
export default connect(mapStateToProps, {
    handleScrollFilter: handleScrollFilter,
    handleChangeFilterCar: handleChangeFilterCar
})(FilterVehicle);