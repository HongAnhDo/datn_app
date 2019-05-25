import React from 'react';
import { theme } from '../../../constants';
import { View } from 'react-native'


class CustomMarker extends React.Component {
    render() {
        return (
            <View style={{
                height: 20, width: 20, borderRadius: 10, borderColor: "#77a300", backgroundColor: "white",
                borderWidth: 1
            }}></View>
        );
    }
}



export default CustomMarker;