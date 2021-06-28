import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Splash from './Splash';
import Navigation from '../navigation/Navigation';
import { RootState } from '../store/store';
import { initializApp } from '../store/actions/settings';
import Geolocation from '@react-native-community/geolocation';
import { saveCurrentLocation } from '../store/actions/address';
import { Alert, PermissionsAndroid } from 'react-native';

const AppInitializer: FC = () => {
  const dispatch = useDispatch();
  const appLoaded = useSelector((state: RootState) => state.settings.appLoaded);

  const requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Taym App GPS Permission',
          message:
            'Cool Taym App needs access to your GPS ' +
            'so you can take location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      //  Alert.alert(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS open');
      } else {
        console.log('GPS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    requestLocation();
    if (appLoaded) {
      //  requestLocation();
      const locationConfig = {
        skipPermissionRequests: true,
        authorizationLevel: 'whenInUse',
      };
      Geolocation.setRNConfiguration(locationConfig);

      Geolocation.getCurrentPosition(position => {
        console.log('getCurrentPosition info', position);
        const currentLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: position.coords.latitude / 10,
          longitudeDelta: position.coords.longitude / 10,
        };
        dispatch(saveCurrentLocation(currentLocation));
      });
    }
    else {
      dispatch(initializApp());
    }
  }, [appLoaded]);

  if (appLoaded) {
    return <Navigation />;
  } else {
    return <Splash />;
  }
};

export default AppInitializer;
function alert(granted: string) {
  throw new Error('Function not implemented.');
}
