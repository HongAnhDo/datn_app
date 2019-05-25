import React, { Component } from 'react';
import { connect } from 'react-redux'
import PlaceholderList from '../PlaceHolderList';
import { View , FlatList} from 'react-native'
import styles from '../ListCars/ListCarsStyle'
import { changeListMotorbikes, fetchMotorbikes } from '../../../actions/ListVehicleAction'
import ItemVehicle from '../ItemVehicle';
import ProgressDialog from "../../../view/dialog/ProgressDialog";

class ListMotorbikes extends Component {
    constructor(props) {
        super(props);
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

    render() {
        if(this.props.listMotorbikesNone){
            return <View style ={{flex: 1, justifyContent:"center", alignItems :"center"}}><Text style ={{padding: 20}}>Không có kết quả tìm kiếm nào!</Text></View>

        }
        return (
            <View>
                <FlatList
                    data={this.props.listMotorbikes}
                    renderItem={({ item }) => <ItemVehicle key={item.vhc_part_id} item={item} fetchMotorbikes={this.props.fetchMotorbikes} type="motor" />}
                    extraData={this.props.listMotorbikes}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListEmptyComponent={this.noItemDisplay}
                    initialNumToRender={5}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    legacyImplementation={true}
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
        listMotorbikes: state.listVehicles.listMotorbikes,
        fetchMotorbikes: state.listVehicles.fetchMotorbikes,
        loading: state.listVehicles.loading,
        listMotorbikesNone : state.listVehicles.listMotorbikesNone
    }
}

export default connect(mapStateToProps, {
    fetchMotorbikes: fetchMotorbikes,
    changeListMotorbikes: changeListMotorbikes
})(ListMotorbikes)

