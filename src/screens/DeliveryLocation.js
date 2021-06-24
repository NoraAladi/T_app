import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  createRef,
} from 'react';
import {
  Alert,
  I18nManager,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  fetch,
  ActivityIndicator,
} from 'react-native';
import {Container} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors} from '../constants/styleConstants';
import {MAP_API_KEY} from '../constants/Config';

import {commonStyles} from '../styles/styles';
import MapView, {
  Animated,
  AnimatedRegion,
  Marker,
  MarkerAnimated,
  PROVIDER_GOOGLE,
  Region,
  Polyline,
} from 'react-native-maps';
import {setDefaults, useTranslation} from 'react-i18next';
import Geocoder from 'react-native-geocoding';
import GooglePlacesInput from '../components/MyAddresses/GooglePlacesInput';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/touchables/Button';
import {saveCurrentLocationData, userHomeApi} from '../store/actions/settings';
import {saveCurrentLocation} from '../store/actions/address';

import FastImage from 'react-native-fast-image';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

const {isRTL} = I18nManager;
const DeliveryLocation = ({navigation}) => {
  const {userCurrentLocation} = useSelector(state => state.address);
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const {navigate} = useNavigation();
  let zoom = 7;

  console.log('userCurrentLocation', userCurrentLocation);
  const [region, setRegion] = useState(userCurrentLocation);

  const [marker, setMarker] = useState(userCurrentLocation);
  const [locationName, setLocationName] = useState('');

  const mapView = useRef(null);
  const _marker = useRef(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //trace details when change location
    getLocationDetails(region.latitude, region.longitude, false);
    return () => {
      console.log('clean');
    };
  }, [region]);

  const getLocationDetails = async (latitude, longitude, save) => {
    save ? setLoading(true) : null;
    Geocoder.from(latitude, longitude)
      .then(json => {
        setLoading(false);

        let addressComponent = json.results[0].formatted_address;
        let locationStreetName =
          json.results[0].address_components[0].long_name;

        setLocationName(locationStreetName);
        console.log('addressComponent', addressComponent);
        if (save) {
          if (
            addressComponent.includes('Alexandria Governorate') ||
            addressComponent.includes('الإسكندرية')
          ) {
            dispatch(saveCurrentLocationData(addressComponent));
            dispatch(saveCurrentLocation(region));
            dispatch(
              userHomeApi({
                latitude: region.latitude,
                longitude: region.longitude,
              }),
            );
            navigation.navigate('Home', {'refreshing': 'true'});
          } else {
            showMessage({
              message: t('We do not provide delivery to this place now'),
              duration: 5000,
              type: 'warning',
            });
          }
        }
      })
      .catch(error => {
        console.warn(error);
        setLoading(false);
      });
  };

  const submitHandler = async () => {
    await getLocationDetails(region.latitude, region.longitude, true);
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(position => {
      console.log(position, 'position');
      var x = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        latitudeDelta: position.coords.latitude / 10,
        longitudeDelta: position.coords.longitude / 10,
      };
      setRegion(x);

      setMarker({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      mapView.current?.animateToRegion(x, 500);
      _marker.current?.animateMarkerToCoordinate(x, 500);
    });
  };

  const handleRegionChange = (n_region, areaName) => {
    console.log('aaaaaaaaaa');
    n_region.latitudeDelta = n_region.latitude / 10;
    n_region.longitudeDelta = n_region.longitude / 10;
    console.log(n_region, areaName);

    setRegion(n_region);
    setMarker(n_region);
    mapView.current?.animateToRegion(n_region, 500);
    _marker.current?.animateMarkerToCoordinate(n_region, 500);
    if (areaName !== '') {
    }
  };

  const showMarkers = region => {
    zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    console.log(zoom);
    //setZoom(zooom)
  };

  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('Current Location')} />
      <View style={[styles.autoCompleteContainer]}>
        <GooglePlacesInput onSelectResult={handleRegionChange} />
      </View>

      <MapView
        // scrollEnabled={false}
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        //region={userCurrentLocation}
        // onRegionChange={onRegionChange}
        initialRegion={userCurrentLocation}
        minZoomLevel={6}
        moveOnMarkerPress={true}
        showsUserLocation={true}
        followsUserLocation={true}
        onRegionChange={region => {
          //  showMarkers(region)
        }}
        onPress={e => {
          console.log(e.nativeEvent.coordinate);
          let x = e.nativeEvent.coordinate;
          x.latitudeDelta = x.latitude / 10;
          x.longitudeDelta = x.longitude / 10;

          console.log(x);
          mapView.current.animateToRegion(e.nativeEvent.coordinate, 500);
          _marker.current.animateMarkerToCoordinate(
            e.nativeEvent.coordinate,
            500,
          );
          setRegion(x);
          setMarker(x);
        }}
        // onRegionChangeComplete={handleRegionChange2}
      >
        <Marker
          onDragEnd={e => {
            console.log(e.nativeEvent.coordinate);
            let x = e.nativeEvent.coordinate;
            x.latitudeDelta = x.latitude / 10;
            x.longitudeDelta = x.longitude / 10;

            console.log(x);
            mapView.current.animateToRegion(e.nativeEvent.coordinate, 500);

            setRegion(x);
            setMarker(x);
          }}
          draggable
          ref={_marker}
          coordinate={userCurrentLocation}
        />
        {
          // <MapViewDirections
          //   origin={{latitude: 0.01844, longitude: 0.01844}}
          //   destination={des}
          //   apikey={MAP_API_KEY}
          //   mode="DRIVING"
          //   strokeWidth={4}
          // />
        }
      </MapView>
      <TouchableOpacity
        onPress={getCurrentLocation}
        style={{
          width: 70,
          height: 70,
          position: 'absolute',
          bottom: 100,
          left: 10,
        }}>
        <FastImage
          source={require('../../assets/Icons/logo.png')}
          resizeMode="contain"
          style={commonStyles.image}
        />
      </TouchableOpacity>
      <View style={styles.submitBtnContainer}>
        <Button
          title={t('Save Location')}
          onPress={submitHandler}
          loader={loading}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  listContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...commonStyles.boxShadow,
  },
  autoCompleteContainer: {
    width: '85%',
    color: '#000',
    position: 'absolute',
    top: 150,
    alignSelf: 'center',
    zIndex: 10,
    ...commonStyles.boxShadow,
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    // ...StyleSheet.absoluteFillObject,
  },
  submitBtnContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    width: '85%',
    ...commonStyles.boxShadow,
  },
});

export default DeliveryLocation;
