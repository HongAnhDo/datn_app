'use strict'
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Text,
	View,
	ActivityIndicator,
	InteractionManager,
	ListView,
	StyleSheet,
	Dimensions, FlatList
} from 'react-native';
import Month from './Month';
import moment from 'moment';
import BottomSheetTime from '../BottomSheetTime';
import Icon from 'react-native-vector-icons/MaterialIcons'

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class RangeDatepicker extends Component {

	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
		this.state = {
			startDate: props.startDate && moment(props.startDate, 'YYYYMMDD'),
			untilDate: props.untilDate && moment(props.untilDate, 'YYYYMMDD'),
			availableDates: props.availableDates || null,
			title: "Chọn ngày đặt xe"
		}

		this.onSelectDate = this.onSelectDate.bind(this);
		this.onReset = this.onReset.bind(this);
		this.handleConfirmDate = this.handleConfirmDate.bind(this);
		this.handleRenderRow = this.handleRenderRow.bind(this);
		this._handleCloseCalendar = this._handleCloseCalendar.bind(this)
	}

	static defaultProps = {
		initialMonth: '',
		dayHeadings: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
		maxMonth: 4,
		buttonColor: 'green',
		buttonContainerStyle: {},
		showReset: true,
		showClose: true,
		ignoreMinDate: false,
		onClose: () => { },
		onSelect: () => { },
		onConfirm: () => { },
		placeHolderStart: 'Start Date',
		placeHolderUntil: 'Until Date',
		selectedBackgroundColor: 'green',
		selectedTextColor: 'white',
		todayColor: 'green',
		// startDate: '',
		// untilDate: '',
		// minDate: '',
		// maxDate: '',
		infoText: '',
		infoStyle: { color: '#fff', fontSize: 13 },
		infoContainerStyle: { marginRight: 20, paddingHorizontal: 20, paddingVertical: 5, backgroundColor: 'green', borderRadius: 20, alignSelf: 'flex-end' }
	};


	static propTypes = {
		initialMonth: PropTypes.string,
		dayHeadings: PropTypes.arrayOf(PropTypes.string),
		availableDates: PropTypes.arrayOf(PropTypes.string),
		maxMonth: PropTypes.number,
		buttonColor: PropTypes.string,
		buttonContainerStyle: PropTypes.object,
		startDate: PropTypes.string,
		untilDate: PropTypes.string,
		minDate: PropTypes.string,
		maxDate: PropTypes.string,
		showReset: PropTypes.bool,
		showClose: PropTypes.bool,
		ignoreMinDate: PropTypes.bool,
		onClose: PropTypes.func,
		onSelect: PropTypes.func,
		onConfirm: PropTypes.func,
		placeHolderStart: PropTypes.string,
		placeHolderUntil: PropTypes.string,
		selectedBackgroundColor: PropTypes.string,
		selectedTextColor: PropTypes.string,
		todayColor: PropTypes.string,
		infoText: PropTypes.string,
		infoStyle: PropTypes.object,
		infoContainerStyle: PropTypes.object
	}
	componentDidMount(){
		if(this.state.startDate && this.state.untilDate){
			this.child.handleOpen();
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ availableDates: nextProps.availableDates });
	}

	onSelectDate(date) {
		let startDate = null;
		let untilDate = null;
		const { availableDates } = this.state;
		if (this.state.startDate && !this.state.untilDate) {
			if (date < this.state.startDate || this.isInvalidRange(date)) {
				startDate = date;
				this.setState({ title: "Chọn ngày trả xe" })
			}
			else if (date >= this.state.startDate) {
				startDate = this.state.startDate;
				untilDate = date;
				this.child.handleOpen();
				this.setState({ title: "Chọn thời gian" })

			}
			else {
				startDate = date;
				untilDate = date;
				this.child.handleClose();
			}
		}
		else if (!this.isInvalidRange(date)) {
			this.setState({ title: "Chọn ngày đặt xe" })
			startDate = date;
			this.child.handleClose();
		}
		else {
			this.child.handleClose();
			startDate = null;
			untilDate = null;
		}

		this.setState({ startDate, untilDate });
		// this.props.onSelect(startDate, untilDate);
	}

	isInvalidRange(date) {
		const { startDate, untilDate, availableDates } = this.state;

		if (availableDates && availableDates.length > 0) {
			if (startDate && !untilDate) {
				for (let i = startDate; i <= date; i = moment(i, 'YYYYMMDD').add(1, 'days')) {
					if (availableDates.indexOf(i) == -1 && startDate.format('YYYYMMDD') != i)
						return true;
				}
			}
			else if (availableDates.indexOf(date.format('YYYYMMDD')) == -1)
				return true;
		}

		return false;
	}

	getMonthStack() {
		let res = [];
		const { maxMonth, initialMonth } = this.props;
		let initMonth = moment();
		if (initialMonth && initialMonth != '')
			initMonth = moment(initialMonth, 'YYYYMM');

		for (let i = 0; i < maxMonth; i++) {
			res.push(initMonth.clone().add(i, 'month').format('YYYYMM'));
		}
		return res;
	}

	onReset() {
		this.setState({
			startDate: null,
			untilDate: null,
		});

		this.props.onSelect(null, null);
	}

	handleConfirmDate() {
		this.props.onConfirm && this.props.onConfirm(this.state.startDate, this.state.untilDate);
	}

	handleRenderRow(month) {
		month = month.item
		const { selectedBackgroundColor, selectedTextColor, todayColor, ignoreMinDate, maxDate } = this.props;
		const minDate = new Date();
		let { availableDates, startDate, untilDate } = this.state;

		if (availableDates && availableDates.length > 0) {
			availableDates = availableDates.filter(function (d) {
				if (d.indexOf(month) >= 0)
					return true;
			});
		}

		return (
			<Month
				onSelectDate={this.onSelectDate}
				startDate={startDate}
				untilDate={untilDate}
				availableDates={availableDates}
				minDate={minDate ? moment(minDate, 'YYYYMMDD') : minDate}
				maxDate={maxDate ? moment(maxDate, 'YYYYMMDD') : maxDate}
				ignoreMinDate={ignoreMinDate}
				dayProps={{ selectedBackgroundColor, selectedTextColor, todayColor }}
				month={month} />
		)
	}
	_handleCloseCalendar (){
		const { state, goBack } = this.props.navigation;
		const params = state.params || {};
        if (params["fromScreen"] == "home")
            this.props.navigation.navigate("Home");
        else {
            this.props.navigation.goBack();
        }
	}

	render() {
		const monthStack = this.ds.cloneWithRows(this.getMonthStack());
		return (
			<View style={styles.container}>

				<View style={styles.header}>
					<Icon.Button
						name="close"
						size={30}
						color="#00363d"
						style={styles.iconClose}
						backgroundColor='transparent'
						underlayColor='transparent'
						onPress={this._handleCloseCalendar}
					/>

					<Text style={styles.titleHeader}>{this.state.title}</Text>
			
				</View>
				{
					this.props.infoText != "" &&
					<View style={this.props.infoContainerStyle}>
						<Text style={this.props.infoStyle}>{this.props.infoText}</Text>
					</View>
				}
				<View style={styles.dayHeader}>
					{
						this.props.dayHeadings.map((day, i) => {
							return (<Text style={{ width: DEVICE_WIDTH / 7, textAlign: 'center' }} key={i}>{day}</Text>)
						})
					}
				</View>
				<FlatList
					data={this.getMonthStack()}
					renderItem={this.handleRenderRow}
					initialListSize={2}
					initialNumToRender={2}
					showsVerticalScrollIndicator={false} />
				<BottomSheetTime ref={ref => this.child = ref} handleConfirmDate={this.handleConfirmDate} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	dayHeader: {
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#bbbbbb',
		paddingBottom: 15,
		paddingTop: 15,
	},
	buttonWrapper: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderColor: '#ccc',
		alignItems: 'stretch',
		bottom: 0
	},
	iconClose: {
		height: 45,
		justifyContent: 'center',
		textAlignVertical: 'center'
	},
	header: {
		flexDirection: 'row',
		justifyContent: "flex-start",
		paddingBottom: 5,
		alignItems: 'center'
	},
	titleHeader: {
		fontSize: 20,
		height: 45,
		lineHeight: 45,
		justifyContent: 'center',
		fontWeight: "500",
		color: "#00363d"
	},
	container: {
		backgroundColor: '#fff',
		zIndex: 1000,
		alignSelf: 'center'
	}
});