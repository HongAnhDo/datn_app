import React, { PureComponent } from 'react'
import { View } from 'react-native'
import styles from '../ItemVehicle/ItemVehicleStyle'
import Placeholder from 'rn-placeholder'

class PlaceholderList extends PureComponent {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View style={styles.itemVehicle}>
                <View style={styles.leftItemVehicle}>
                    <View style={styles.topLeftVehicle}>
                        <Placeholder.Paragraph
                            lineNumber={2}
                            firstLineWidth="90%"
                            lastLineWidth="50%"
                            animate="shine"
                            textSize={20}
                            lineSpacing={3}
                            radius={0}
                            onReady={this.props.fetchData}>  
                        </Placeholder.Paragraph>

                        <Placeholder.Line
                            width="35%"
                            animate="shine"
                            textSize={10}
                            style={{ marginTop: 3 }}
                            lineSpacing={2}
                            onReady={this.props.fetchData}>
                        </Placeholder.Line>
                    </View>

                    <Placeholder.Line
                        animate="shine"
                        lineNumber={1}
                        width="60%"
                        textSize={13}
                        style={{ marginTop: -25 }}
                        onReady={this.props.fetchData}>

                    </Placeholder.Line>

                    <View style={styles.bottomLeftVehicle}>
                        <Placeholder.Line
                            width="90%"
                            animate="shine"
                            textSize={22}
                            onReady={this.props.fetchData}>
                        </Placeholder.Line>
                    </View>
                </View>
                <View style={styles.rightItemVehicle}>
                    <Placeholder.Box
                        width="90%"
                        height={"90%"}
                        animate="shine"
                        radius={0}
                        style={{ justifyContent: "center", alignItems: 'center', marginHorizontal: "5%" }}
                        onReady={this.props.fetchData}>
                    </Placeholder.Box>
                </View>
            </View >
        )
    }
}
export default PlaceholderList;