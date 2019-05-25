'use strict'
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
	constructor(props) {
		super(props);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.day.type == this.props.day.type)
			return false;
		return true;
	}

	render() {
		let { day, dayProps } = this.props;
		const heigthDay = Math.floor(DEVICE_WIDTH / 7);
		let dayStyle = { backgroundColor: 'transparent', position: 'relative' };
		let textDayStyle = { color: 'black' };

		switch (day.type) {
			case "single":
				dayStyle = { backgroundColor: "#77a300" }
				textDayStyle = { color: 'white' };
				break;
			case "first":
				dayStyle = { backgroundColor:"#77a300" }
				textDayStyle = { color:  'white'};
				break;
			case "last":
				dayStyle = { backgroundColor:"#77a300"}
				textDayStyle = { color: 'white' };
				break;
			case "between":
				if (day.date) {
					dayStyle = { backgroundColor: "#00363d" }
					textDayStyle = { color: "white"};
				}
				break;
			case "disabled":
			case "blockout":
				textDayStyle = { color: '#ccc' };
			default: break;
		}

		if (day.date) {
			if (day.type == 'disabled')
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{ ...dayStyle, height: heigthDay, justifyContent: 'center' }}>
							<Text style={{ ...textDayStyle, textAlign: "center", width: heigthDay, backgroundColor: 'transparent', fontSize: 16 }}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							{day.date == moment().format("YYYYMMDD") ? (<View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: 'center', backgroundColor: 'transparent' }}><Text style={{ fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: '#ccc', textAlign: 'center' }}>__</Text></View>) : null}
						</View>
					</TouchableWithoutFeedback>
				);
			else if (day.type == 'blockout') {
				const strikeTop = Math.floor(DEVICE_WIDTH / -22);
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{ ...dayStyle, height: heigthDay, justifyContent: 'center' }}>
							<Text style={{ ...textDayStyle, textAlign: "center", width: heigthDay, backgroundColor: 'transparent', fontSize: 16 }}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							<View style={{ position: 'absolute', top: strikeTop, bottom: 0, left: 0, right: 0, justifyContent: 'center', backgroundColor: 'transparent' }}><Text style={{ fontSize: Math.floor(DEVICE_WIDTH / 17), color: '#ccc', textAlign: 'center' }}>__</Text></View>
						</View>
					</TouchableWithoutFeedback>
				);
			}
			else
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
						<View style={{ ...dayStyle, height: heigthDay, justifyContent: 'center' }}>
							
							{day.date == moment().format("YYYYMMDD") ? <Text style={{ ...textDayStyle, textAlign: "center", width: heigthDay, backgroundColor: 'transparent',color: 'green',fontSize: 16 }}>{moment(day.date, 'YYYYMMDD').date()}</Text> :
							<Text style={{ ...textDayStyle, textAlign: "center", width: heigthDay, backgroundColor: 'transparent', fontSize: 16 }}>{moment(day.date, 'YYYYMMDD').date()}</Text>}
						</View>
					</TouchableWithoutFeedback>
				);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{ ...dayStyle, height: heigthDay, justifyContent: 'center' }}>
						<Text style={{ ...textDayStyle, textAlign: "center", width: heigthDay, backgroundColor: 'transparent', fontSize: 16 }}>{null}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
	}
}

const styles = StyleSheet.create({
	dayFirst : { 
		backgroundColor:"#77a300"
	},
	dayBetween : { 
		backgroundColor:"#00363d"
	},
	buttonWrapper : {
		paddingVertical: 10, 
		paddingHorizontal: 15, 
		backgroundColor: 'white', 
		borderTopWidth: 1, 
		borderColor: '#ccc',
		alignItems: 'stretch'
	},
});
