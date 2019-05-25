import React, { Component } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './ProfileStyle'

class Profile extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text style={styles.headerTitle}>Thông tin tài khoản</Text>,
      headerStyle: styles.headerStyle,

      headerLeft: (
        <Icon.Button
          name="ios-arrow-back"
          size={28}
          color="#00363d"
          style={styles.iconBack}
          backgroundColor='transparent'
          underlayColor='transparent'
          onPress={() => navigation.openDrawer()} />
      ),
      // headerLeft: <View style={{ width: 50 }}></View>
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text>Hello</Text>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer}>
              <Text>Opcion 2</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Profile;


