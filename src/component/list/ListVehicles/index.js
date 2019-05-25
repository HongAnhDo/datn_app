
import React, { Component } from 'react';
import { View, Text, Image, Dimensions, TouchableHighlight, Platform, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import styles from './ListVehicleStyle';
import IconSort from '../../../assets/images/arrange.png'
import IconFilter from "../../../assets/images/filter.png"
import { TabView, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux'
import VehicleApi from '../../../service/vehicle/VehicleApi';
import {
  changeTab, changeListCars,
  fetchDataList, fetchListSuccess,
  changeListMotorbikes, sortVehicle,
  handleFinishLoadCar, handleFinishLoadMotobike,
  handleOpenFilter
} from "../../../actions/ListVehicleAction"
import ListCars from '../ListCars';
import ListMotorbikes from '../ListMotorbikes';
import RNBottomActionSheet from 'react-native-bottom-action-sheet'
import MyUtil from '../../../util/MyUtil';
import IconRange from 'react-native-vector-icons'



let _this = null;

class ListVehicle extends Component {

  async componentDidMount() {
    this.props.navigation.setParams({ dateTimeShort: this.props.dateTimeShort });
    _this = this;
    var index = this.props.index;

    var options = {
      vhc_type_id: index ? 2 : 1,
      city_id: this.props.city.city_id,
      rental_date: new Date(),
      return_date: new Date() + 1
    }
    var data = []
    var list = await VehicleApi.getVehicles(options);
    if (list["code"] == "success")
      data = list["data"];

    if (data.length == 0) {
      index ? this.props.handleFinishLoadMotobike(true) : this.props.handleFinishLoadCar(true)
    } else {
      index ? this.props.handleFinishLoadMotobike(false) : this.props.handleFinishLoadCar(false)

    }
    index ? this.props.changeListMotorbikes(data) : this.props.changeListCars(data);
  }

  _handleSortVehicle = (selectSort) => {
    var index = this.props.index;
    var list = index ? this.props.listMotorbikes : this.props.listCars

    list = MyUtil.sortPriceListVehicle(selectSort, list);
    this.props.sortVehicle(selectSort);
    if (index == 0)
      this.props.changeListCars(list);
    else
      this.props.changeListMotorbikes(list)
  }

  componentWillReceiveProps(nextProps){
    const {tmsCar, brandCar, seatCar,priceCar} = nextProps
    console.log(tmsCar, brandCar, seatCar,priceCar, "/////////////")
  }

  _handleShow = () => {
    let increase = <IconRange family={'MaterialCommunityIcons'} name={'sort-ascending'} color={'#00363d'} size={30} />
    let reduce = <IconRange family={'MaterialCommunityIcons'} name={'sort-descending'} color={'#00363d'} size={30} />

    let SheetView = RNBottomActionSheet.SheetView
    SheetView.Show({
      title: "",
      items: [
        { title: "Sắp xếp giá tăng dần", icon: increase },
        { title: "Sắp xếp giá giảm dần", icon: reduce },
      ],
      theme: "light",
      selection: this.props.selectSort,
      onSelection: selection => {
        this._handleSortVehicle(selection)
      }
    });
  }

  _handleChangeTab = async (index) => {
    this.props.changeTab(index)
    var options = {
      vhc_type_id: index ? 2 : 1,
      city_id: this.props.city.city_id,
      rental_date: new Date(),
      return_date: new Date() + 1
    }
    try {
      var list = await VehicleApi.getVehicles(options);
      var data = list["data"];
      if (data.length == 0) {
        index ? this.props.handleFinishLoadMotobike(true) : this.props.handleFinishLoadCar(true)
      } else {
        index ? this.props.handleFinishLoadMotobike(false) : this.props.handleFinishLoadCar(false)
      }

      if (index == 0)
        this.props.changeListCars(data);
      else
        this.props.changeListMotorbikes(data);
    } catch (err) {

    }
  }

  _renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return <ListCars />;
      default:
        return <ListMotorbikes />;
    }
  };

  renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        style={styles.tabBar}
        indicatorStyle={{ backgroundColor: '#77a300' }}
        labelStyle={{ color: 'black' }}
        renderLabel={({ route, focused, color }) => {
          const colorLable = focused ? "#77a300" : "#333333"
          return (
            <Text style={[styles.titleTabBar, { color: colorLable }]}>
              {route.title}
            </Text>
          )
        }}
      />

    )
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: "",
      headerLeft: (
        <View style={[styles.inputWrapper, Platform.OS == "ios" && styles.inputWrapperIOS]}>
          <Icon.Button
            name="md-close"
            size={30}
            color="#00363d"
            style={styles.iconClose}
            backgroundColor='transparent'
            underlayColor='transparent'
            onPress={() => {
              console.log(navigation)
              navigation.goBack()
            }}
          />
          <TouchableOpacity underlayColor="transparent"
            onPress={() => navigation.navigate("MyCalendar", { fromScreen: "list" })}>
            <Text style={styles.textDate}
              onPress={() => navigation.navigate("MyCalendar2", { fromScreen: "list" })}>
              {params.dateTimeShort}
            </Text>
          </TouchableOpacity>
          <Icon.Button
            name="ios-arrow-down"
            size={20}
            color="#00363d"
            style={[styles.iconClose, { paddingLeft: 10 }]}
            backgroundColor='transparent'
            underlayColor='transparent'
            onPress={() => navigation.navigate("MyCalendar2", { fromScreen: "list" })}
          />
        </View>
      ),
      headerRight:
        <View style={styles.headerRight}>
          <TouchableHighlight underlayColor="transparent" onPress={() =>
            navigation.navigate('Filter')}>
            <Image
              style={styles.iconRight}
              source={IconSort} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor="transparent" >
          {/* onPress={() => _this._handleShow()} */}
            <Image
              style={styles.iconRight}
              source={IconFilter} />
          </TouchableHighlight>
        </View>
    };
  };

  render() {
    return (
      <TabView
        navigationState={{
          index: this.props.index,
          routes: this.props.routes
        }}
        indicatorStyle={{ backgroundColor: '#77a300', color: "black" }}
        renderScene={this._renderScene}
        indicatorStyle={{ backgroundColor: '#77a300' }}
        onIndexChange={index => this._handleChangeTab(index)}
        swipeEnabled={true}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={this.renderTabBar}
        activeColor="#76a100"
      />
    )
  }
}


function mapStateToProps(state) {
  return {
    index: state.listVehicles.index,
    listCars: state.listVehicles.listCars,
    listMotorbikes: state.listVehicles.listMotorbikes,
    routes: state.listVehicles.routes,
    fetchCars: state.listVehicles.fetchCars,
    selectSort: state.listVehicles.selectSort,
    city: state.home.citySelect,
    dateTimeShort: state.calendar.dateTimeShort,
    tmsCar: state.listVehicles.tmsCar,
    seatCar: state.listVehicles.seatCar,
    brandCar: state.listVehicles.brandCar,
    priceCar: state.listVehicles.priceCar,
    priceMotor: state.listVehicles.priceMotor,
    tmsMotor: state.listVehicles.tmsMotor,
    brandMotor: state.listVehicles.brandMotor,

  }
}
export default connect(mapStateToProps, {
  changeTab: changeTab,
  changeListCars: changeListCars,
  fetchDataList: fetchDataList,
  fetchListSuccess: fetchListSuccess,
  changeListMotorbikes: changeListMotorbikes,
  sortVehicle: sortVehicle,
  handleFinishLoadCar: handleFinishLoadCar,
  handleFinishLoadMotobike: handleFinishLoadMotobike,
  handleOpenFilter: handleOpenFilter

})(ListVehicle);