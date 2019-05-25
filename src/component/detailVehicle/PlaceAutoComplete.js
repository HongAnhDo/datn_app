import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import React from 'react'
const API_KEY = 'AIzaSyBDZSUAda65OflvYZmZ4G5XSGONZv3pkuY';

const PlaceAutoComplete = ({ handleSelectAddress, handleChangeInputPlace }) => (
    <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>

        <GooglePlacesAutocomplete
            placeholder='Nhập địa chỉ nhận xe'
            minLength={2}
            autoFocus={false}
            fetchDetails={true}
            listViewDisplayed={false}
            keyboardShouldPersistTaps={'handled'}
            onPress={(data, details = null) =>
                handleSelectAddress(data, details)
            }
            getDefaultValue={() => { return ''; }}
            query={{
                key: API_KEY,
                language: 'vi',
                components: "country:vn"
            }}
            textInputProps={{
               
                onChangeText : () => handleChangeInputPlace()
              }} 
            styles={{
                textInputContainer: {
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderWidth: 1,
                    borderColor: "#7a7a7a",
                    borderRadius: 4,

                },
                listView: {
                 
                }
                ,
                textInput: {
                    marginLeft: 0,
                    marginRight: 0,
                    height: 30,
                    color: '#333333',
                    fontSize: 16,
                    fontWeight: "400"
                },
                predefinedPlacesDescription: {
                    color: '#77a300'
                },
            }}
            // currentLocation={true}
            currentLocationLabel="Vị trí hiện tại"
            nearbyPlacesAPI='GooglePlacesSearch'
            GooglePlacesSearchQuery={{
                region: "VN"
            }}
            predefinedPlacesAlwaysVisible={true}
        />
    </KeyboardAwareScrollView>
)
export default PlaceAutoComplete;