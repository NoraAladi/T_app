import React, {FC} from 'react';
import {I18nManager, StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {MAP_API_KEY} from '../../constants/Config';
import {Colors, Fonts, Pixel} from '../../constants/styleConstants';

const {isRTL} = I18nManager;
navigator.geolocation = require('@react-native-community/geolocation');

interface IAutoSearchMap {
  onSelectResult: (newRegion: any, areaName: string) => void;
}

const GooglePlacesInput: FC<IAutoSearchMap> = ({onSelectResult}) => {
  const {t} = useTranslation();
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const LATITUDE_DELTA: number = 0.0922;
  const LONGITUDE_DELTA: number = 0.0421;

  const handleSelectResult = (result: any) => {
    if (result !== undefined) {
      const newRegion = {
        latitude: result.geometry?.location.lat,
        longitude: result.geometry?.location.lng,
        latitudeDelta: result.geometry?.location.lat / 100,
        longitudeDelta: result.geometry?.location.lat / 100,
      };
      onSelectResult(newRegion, result.name);
    }
  };

  return (
    <GooglePlacesAutocomplete
      fetchDetails={true}
      textInputProps={{placeholderTextColor: 'grey'}}
      styles={{
        textInput: {
          ...styles.inputStyle,
          textAlign: isRTL ? 'right' : 'left',
          color: '#000',
        },
        predefinedPlacesDescription: {
          fontFamily: Fonts.bold,
          fontSize: Pixel(25),
          color: Colors.dark,
        },
        listView: {
          height: 200,
        },
      }}
      disableScroll={false}
      placeholder={t('Find your location')}
      placeholderColor="#000"
      onPress={(data, details = null) => {
        handleSelectResult(data);
      }}
      query={{
        key: MAP_API_KEY,
        language: isRTL ? 'ar' : 'en',
      }}
      currentLocation={true}
      // currentLocationLabel={t('Current Location')}
    />
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    backgroundColor: Colors.white,
    fontFamily: Fonts.bold,
    fontSize: Pixel(25),
    color: Colors.dark,
    minHeight: Pixel(80),
    // paddingVertical: Pixel(40),
    paddingHorizontal: Pixel(30),
    borderRadius: Pixel(20),
  },
});

export default GooglePlacesInput;
