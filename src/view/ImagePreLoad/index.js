/**
    Author: nkshah2
    Github: https://github.com/nkshah2/react-native-image-with-placeholder
    @flow
 */
import React, { PureComponent } from 'react';
import {
    View,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types'

const DEFAULT_REVEAL_DURATION = 1000;
const MINIMUM_REVEAL_DURATION = 300;
const DEFAULT_RESIZE_MODE = 'contain';

class ImageWithPlaceholder extends PureComponent {


    constructor(props) {
        super();
        const {
            imageURL,
            imageStyle,
            revealDuration,
        } = props;

        if (typeof imageURL === 'object' && imageStyle.width && imageStyle.height) {
            console.warn('You must provide a fixed height and width for network images');
        }

        if (revealDuration && revealDuration >= MINIMUM_REVEAL_DURATION) {
            this.animationDuration = revealDuration;
        } else if (revealDuration) {
            this.animationDuration = DEFAULT_REVEAL_DURATION;
            console.warn(`revealDuration must be greater than ${MINIMUM_REVEAL_DURATION}`);
        } else {
            this.animationDuration = DEFAULT_REVEAL_DURATION;
        }

        this.imageAnimatedOpacity = new Animated.Value(0);
        this.placeholderAnimatedOpacity = new Animated.Value(1);
    }

    onImageLoad = () => {
        if (this.props.isAnimatedReveal) {
            Animated.timing(this.imageAnimatedOpacity, {
                toValue: 1,
                duration: this.animationDuration,
                useNativeDrivers: false,
            }).start();
        } else {
            this.imageAnimatedOpacity.setValue(1);
        }
    }

    render() {
        const {
            imageStyle,
            imageURL,
            isBackground,
            children,
            placeholder,
            placeholderStyle,
            containerStyle,
            resizeMode,
        } = this.props;

        return (
            <View style={[containerStyle || {}, { flex: 1 }]} >
                <Animated.Image
                    style={[
                        imageStyle,
                        {
                            opacity: this.imageAnimatedOpacity,
                            position: 'absolute',
                            flex: 1,
                        },
                    ]}
                    source={{ uri: imageURL }}
                    onLoad={this.onImageLoad}
                    resizeMode={resizeMode || DEFAULT_RESIZE_MODE}
                >
                    {
                        isBackground && children
                    }
                </Animated.Image>
                <Animated.Image
                    style={[
                        placeholderStyle || imageStyle,
                        {
                            opacity: this.imageAnimatedOpacity.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1, 0]
                            }),
                            position: 'absolute',
                            flex: 1,
                        }
                    ]}
                    source={placeholder}
                    resizeMode={resizeMode || DEFAULT_RESIZE_MODE}
                >
                    {
                        isBackground && children
                    }
                </Animated.Image>
            </View>
        );
    }

}
ImageWithPlaceholder.PropTypes = {
    imageURL: PropTypes.string,
    placeholder: PropTypes.string | PropTypes.number,
    imageStyle: PropTypes.Object,
    isAnimatedReveal: PropTypes.boolean,
    containerStyle: PropTypes.Object,
    isBackground: PropTypes.boolean,
    resizeMode: PropTypes.string,
    placeholderStyle: PropTypes.Object,
    revealDuration: PropTypes.number,
    children: PropTypes.any,
}

export default ImageWithPlaceholder;
