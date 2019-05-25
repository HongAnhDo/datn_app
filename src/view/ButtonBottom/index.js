import React from 'react';
import{View, Text, TouchableOpacity} from 'react-native'
import styles from './ButtonStyle'

const ButtonBottom = ({backgroundColorButton, titleButton, handlePress, backgroundColorView}) => (
    <View style={[styles.viewButtonContinue,backgroundColorView && {backgroundColor: backgroundColorView} ]} >
        <TouchableOpacity style={[styles.buttonContinue, backgroundColorButton &&{backgroundColor: backgroundColorButton}]} 
            onPress={handlePress}  >
            <Text style={styles.textContinue}
               >{titleButton}</Text>
        </TouchableOpacity>

    </View>
)
export default ButtonBottom;