/*
 * This example demonstrates how to use ParallaxScrollView within a ScrollView component.
 */
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  View,
  ScrollView
} from 'react-native';
import styles from './DetailVehicleStyle'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons'
import BodyDetail from '../BodyDetail';

class DetailVehicle extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    console.log(this.props.navigation.state.params.vehicle.vhc_part_name)

  }
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        shadowColor: 'transparent',
        borderBottomColor: 'transparent', borderBottomWidth: 0,
        backgroundColor: "#f9f9f9"
      },

      headerLeft: (
        <Icon.Button
          name="arrow-back"
          size={28}
          style={{ justifyContent: 'center', textAlignVertical: 'center', height: '100%' }}
          color="gray"
          backgroundColor='transparent'
          underlayColor='transparent'
          onPress={() => navigation.goBack()}
        />
      )
    }

  }

  render() {
    const { onScroll = () => { } } = this.props;
    const vehicle = this.props.navigation.state.params.vehicle;
    return (

      <View style={styles.container}>
        <ParallaxScrollView
          onScroll={onScroll}
          backgroundColor="white"
          headerBackgroundColor="black"
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          backgroundSpeed={10}

          renderBackground={() => (
            <View key="background" style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
              {vehicle.vhc.vhc_imgs[0] ? <Image source={
                { uri: vehicle.vhc.vhc_imgs[0].vhc_img_link }
              } style={{
                width: window.width,
                height: PARALLAX_HEADER_HEIGHT, resizeMode: "contain"
              }} /> : null}
            </View>
          )}

          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <Icon.Button
                name="arrow-back"
                size={28}
                style={{ justifyContent: 'center', textAlignVertical: 'center', height: '100%' }}
                color="gray"
                backgroundColor='transparent'
                underlayColor='transparent'
              />
            </View>
          )}
        >
          <ScrollView contentContainerStyle={{ backgroundColor: "#f9f9f9" }}
            ref={(c) => { this.scroll = c }}
            style={{ backgroundColor: "#f9f9f9" }}>
            <BodyDetail navigation={this.props.navigation} vehicle={this.props.navigation.state.params.vehicle} />
          </ScrollView>
        </ParallaxScrollView>
        
        {/* <ButtonBottom
          navigation={this.props.navigation}
          handlePress={this.handlePress}
          screenNext="CustomerInfo"
          titleButton="TIẾP TỤC" /> */}
      </View>
    );
  }
  handlePress = () => {

  }
}
const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 200;
const STICKY_HEADER_HEIGHT = 0;



export default DetailVehicle;