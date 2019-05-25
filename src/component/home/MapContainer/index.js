import React, { Component } from "react";
import { View } from "native-base";
import { Image } from 'react-native'
import MapView, { Marker } from "react-native-maps";
import { connect } from 'react-redux'
import styles from "./MapContainerStyles.js";
import PartnerApi from "../../../service/partner/PartnerApi.js";
import { PermissionsAndroid } from 'react-native';

export const getCurrentLocation = () => {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(position => resolve(position), e => reject(e));
	});
};

const defaultRegion = {
	latitude: 21.027763,
	longitude: 105.834160,
	latitudeDelta: 0.0015,
	longitudeDelta: 0.00121,
}

class MapContainer extends Component {

	constructor(props) {
		super(props);
		this.state = {
			region: defaultRegion,
			partners: []
		};
		this._handleLoadPartners = this._handleLoadPartners.bind(this);
		this.requestLocationPermission = this.requestLocationPermission.bind(this);

	}

	async requestLocationPermission() {
		try {
			const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
				{
					title: 'Cool Photo App Location Permission',
					message:
						'Cool Photo App needs access to your Location ' +
						'so you can take awesome pictures.',
					buttonNeutral: 'Ask Me Later',
					buttonNegative: 'Cancel',
					buttonPositive: 'OK',
				},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the Location');
			} else {
				console.log('Location permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
	}
	async _handleLoadPartners(citySelect) {
		if (citySelect) {
			var city_id = citySelect.city_id;

			var partners = await PartnerApi.getOptions({ "city_id": city_id });
			if (partners && partners.length > 0) {
				var region = {
					latitude: partners[0].part_lat,
					longitude: partners[0].part_lng,
					latitudeDelta: 0.08,
					longitudeDelta: 0.075,
				}
				this.setState({ partners: partners, region: region })
			} else
				this.setState({ partners: partners })
		}

	}

	async componentWillReceiveProps(nextProps) {
		if (this.props.citySelect != nextProps.citySelect) {
			await this._handleLoadPartners(nextProps.citySelect);
		}
	}



	async componentDidMount() {
		await this.requestLocationPermission()

		// return getCurrentLocation().then(position => {
		// 	if (position) {
		// 		this.setState({
		// 			region: {
		// 				latitude: position.coords.latitude,
		// 				longitude: position.coords.longitude,
		// 				latitudeDelta: 0.015,
		// 				longitudeDelta: 0.0121,
		// 			},
		// 		});
		// 	}
		// })
		// 	;

	}
	_renderMarkers = () => {
		console.log(this.state.partners);



	}


	render() {
		const citySelect = this.props.citySelect;
		const { partners, region } = this.state;
		return (
			<View style={styles.container}>
				<MapView
					provider={MapView.PROVIDER_GOOGLE}
					style={styles.map}
					region={this.state.region}
				>

					{citySelect ? this.state.partners.map((item) =>
						<Marker
							key={item.part_id}
							coordinate={{ latitude: item.part_lat, longitude: item.part_lng }}
						>
							{(item.vhc_type_id == 1) ?
								<Image
									source={require('../../../assets/images/ic_car.png')}
									style={{ width: 50, height: 50 }} /> :
								<Image
									source={require('../../../assets/images/motorbike.png')}
									style={{ width: 50, height: 50 }} />}

						</Marker>

					) : null}
				</MapView>


			</View>
		)
	}
}
function mapStateToProp(state) {
	return {
		citySelect: state.home.citySelect,
	}
}

export default connect(mapStateToProp)(MapContainer);