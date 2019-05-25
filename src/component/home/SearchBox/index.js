import React, { Component } from "react";
import { Text, ScrollView, TextInput, Keyboard, TouchableOpacity } from "react-native";
import { View, InputGroup, Input } from "native-base";
import styles from './SearchBoxStyles'
import Icon from "react-native-vector-icons/EvilIcons";
import { connect } from 'react-redux'
import { changeCity } from '../../../actions/ActionTypes'
import MyUtil from "../../../util/MyUtil";
class SearchBox extends Component {
	constructor(props) {
		super(props)

		this._handleSelectCity = this._handleSelectCity.bind(this);
		this._handleSelectTime = this._handleSelectTime.bind(this);
	}

	_handleSelectCity() {
		Keyboard.dismiss()
		this.props.handleSelectCity(true)

	}
	_handleSelectTime() {
		this.props.navigation.navigate("MyCalendar", { fromScreen: "home" })
	}



	render() {
		const { startDate, untilDate, indexTimeEnd, indexTimeStart, itemList } = this.props
		return (
			<View style={styles.searchBox}>
				<View style={styles.inputWrapper}>
					<View underline={false} style={{ underlayColor: 'transparent', underline: false, flexDirection: 'row' }}>
						<Text
							style={[styles.inputSearch, !this.props.citySelect && { color: "#C7C7CD" }]}
							onPress={this._handleSelectCity}
							suppressHighlighting={true}
						>{this.props.citySelect ? this.props.citySelect.city_name : "Chọn thành phố"}</Text>

						<Icon.Button
							name="chevron-down"
							size={30}
							color="#00363d"
							style={{ height: 40, justifyContent: 'center', textAlignVertical: 'center' }}
							backgroundColor='transparent'
							underlayColor='transparent'
							onPress={this._handleSelectCity} />

					</View>
				</View>
				{this.props.citySelect != "" && <View>
					<View style={{ flex: 1, height: 0.5, backgroundColor: "#DCDCDC" }} />
					<View style={styles.inputWrapper}>
						<View underline={false} style={{ underlayColor: 'transparent', underline: false, flexDirection: 'row' }}>
							<Text
								style={[styles.inputSearch, !this.props.untilDate && { color: "#C7C7CD" }]}
								onPress={this._handleSelectTime}
								suppressHighlighting={true}
							>{(this.props.untilDate && this.props.startDate) ?
								this.props.dateTimeDisplay
								: "Chọn thời gian"}</Text>

							<Icon.Button
								name="chevron-down"
								size={28}
								color="#00363d"
								style={{ height: 40, justifyContent: 'center', textAlignVertical: 'center' }}
								backgroundColor='transparent'
								underlayColor='transparent'
								onPress={this._handleSelectTime} />

						</View>
					</View>
				</View>
				}
			</View>

		);
	}
};
function mapStateToProps(state) {
	return {
		citySelect: state.home.citySelect,
		timeStart: state.home.timeStart,
		indexTimeStart: state.calendar.timeStart,
		indexTimeEnd: state.calendar.timeEnd,
		itemList: state.calendar.itemList,
		startDate: state.calendar.startDate,
		untilDate: state.calendar.untilDate,
		dateTimeDisplay: state.calendar.dateTimeDisplay
	}
}
export default connect(mapStateToProps, { changeCity })(SearchBox);