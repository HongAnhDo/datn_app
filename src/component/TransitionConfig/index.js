import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';
import { Animated, Easing, Platform } from 'react-native';

const {
  forHorizontal,
  forVertical,
  forFadeFromBottomAndroid,
  forFade,
} = CardStackStyleInterpolator;

const TransitionSpec = {
  duration: 300,
  easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  timing: Animated.timing,
};


const TransitionConfig = (transitionProps, prevTransitionProps) => {
    return {
      transitionSpec: TransitionSpec,
      containerStyle: {
        backgroundColor: 'white'
      },
      screenInterpolator: () => {
        var sceneProps = transitionProps
        const params = transitionProps.scene.route.params || {};
        const transition = Platform.OS;
        return {
          horizontal: forHorizontal(sceneProps),
          vertical: forVertical(sceneProps),
          c: forVertical(sceneProps),
          ios: forHorizontal(sceneProps),
          modal: forVertical(sceneProps),
          android: forHorizontal(sceneProps),
        }[transition];
      }
    }

}


// };

export default TransitionConfig;