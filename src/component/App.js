/**
 * Create by Hong Anh Do
 */

import React from 'react';
import ModalCalendar from '../component/home/ModelCalendar'
import store from '../store'
import { Provider } from 'react-redux';
import { Alert, Image, View, Text, ScrollView } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';
import HomeScreen from './home/HomScreen';
import styles from './AppStyles'
import ListVehicles from './list/ListVehicles';
import DetailVehicle from './detailVehicle/DetailVehicle';
import CustomerInfo from './customerInfo';
import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-smart-splash-screen'
import SafeAreaView from 'react-native-safe-area-view';
import Profile from './user/profile';
import FilterVehicle from '../component/list/Filter';

const MainStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },

    ListVehicle: {
      screen: ListVehicles,
    },
    Detail: {
      screen: DetailVehicle,
    },
    CustomerInfo: {
      screen: CustomerInfo
    }
  }
  ,
  {
    initialRouteName: 'Home',
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: createAppContainer(MainStack),
    },
    MyCalendar: {
      screen: ModalCalendar
    },
    MyCalendar2: {
      screen: ModalCalendar
    },
    Filter: {
      screen: FilterVehicle
    },
  },
  {
    mode: 'modal',
    headerMode: "none",

  }
);
const StartStack = createStackNavigator(
  {
    Root: {
      screen: createAppContainer(RootStack),
    },
    Login: {
      screen: Profile
    },
  }, {
    headerMode: "none",

  })
const UserStack = createStackNavigator(
  {

    Profile: {
      screen: Profile

    }
  }, {
    headerMode: "screen",

  })

const CustomeDrawerComponent = (props) => (
  <View style={{ flex: 1 }}>
    <SafeAreaView style={styles.headerMenu} />
    <SafeAreaView style={styles.bodyMenu}>
      <View style={styles.userInfoMenu}>
        <Image source={require("../assets/images/user.jpeg")}
          style={styles.imgUserMenu}
          resizeMode="contain" />
        <Text style={styles.userNameMenu}>Đỗ Thị Hồng</Text>
      </View>
      <ScrollView>
        <DrawerItems {...props} getLabel={(scene) => (
          <View style={styles.viewItemMenu}>
            <Text style={styles.textItemMenu}>{props.getLabel(scene)}</Text>
          </View>
        )} />
      </ScrollView>
    </SafeAreaView>
  </View>
)


const AppDrawerNavigator = createDrawerNavigator({
  Book: {
    screen: createAppContainer(StartStack),
    navigationOptions: () => ({
      drawerLabel: 'Đặt xe',
    })
  },
  Profile: {
    screen: createAppContainer(UserStack),
    navigationOptions: {
      drawerLabel: 'Thông tin cá nhân'
    }
  }
}, {
    contentComponent: CustomeDrawerComponent
  })

// AppDrawerNavigator.navigationOptions = {
//   header: null,
// };

let Navigation = createAppContainer(AppDrawerNavigator);


export default class App extends React.Component {
  constructor(props) {
    super(props);
  }


  async componentDidMount() {
    SplashScreen.close({
      animationType: SplashScreen.animationType.fade,
      duration: 850,
      delay: 300,
    })
    await this.checkPermission();
    this.createNotificationListeners();

  }

  async checkPermission() {
    try {
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        await this.getToken();
      } else {
        await this.requestPermission();
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken', "");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      await this.getToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  async createNotificationListeners() {

    this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    });

    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
    }

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }

}

