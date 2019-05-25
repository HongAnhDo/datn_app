import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, Text, FlatList } from 'react-native'
import PlaceholderList from '../PlaceHolderList';
import styles from './ListCarsStyle'
import ProgressDialog from "../../../view/dialog/ProgressDialog";
import ItemVehicle from '../ItemVehicle';

class ListCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProgress: false,

    }
  }

  renderSeparator = () => {
    return (
      <View style={styles.saparator} />
    );
  }

  noItemDisplay = () => {

    return (
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <PlaceholderList />}
        initialNumToRender={5}
        ItemSeparatorComponent={this.renderSeparator}
      />
    )
  }


  renderHeader = () => {
    return <View>
      {this.props.listCars.length ?
        <View style={styles.headerList}>
          <Text style={styles.titleHeaderList}>{this.props.listCars.length} kết quả</Text>
        </View>
        : null}
    </View>
  }
  render() {
    if (this.props.listCarsNone) {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}><Text style={{ padding: 20 }}>Không có kết quả tìm kiếm nào!</Text></View>
    }
    return (
      <View>
        <FlatList
          data={this.props.listCars}
          renderItem={({ item }) => <ItemVehicle key={item.vhc_part_id} item={item} fetchCars={this.props.fetchCars} type="car" />}
          extraData={this.props.listCars}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={this.noItemDisplay}
          // legacyImplementation={true}
          getItemLayout={(data, index) => (
            {length: 160, offset: 160 * index, index}
          )}
        />
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
    )
  }
}


function mapStateToProps(state) {
  return {
    listCars: state.listVehicles.listCars,
    fetchCars: state.listVehicles.fetchCars,
    loading: state.listVehicles.loading,
    listCarsNone: state.listVehicles.listCarsNone,
    openModalFilter: state.listVehicles.openModalFilter
  }
}

export default connect(mapStateToProps)(ListCars)

