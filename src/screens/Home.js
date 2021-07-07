import React, { FC, useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import { Colors } from '../constants/styleConstants';
import { useTranslation } from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import NotSupported from '../components/Home/NotSupported';
import Geolocation from '@react-native-community/geolocation';
import { saveCurrentLocationData, userHomeApi } from '../store/actions/settings';
import { saveCurrentLocation } from '../store/actions/address';

import Geocoder from 'react-native-geocoding';
import OfferSlider from '../components/Home/OfferSlider';
import AsyncStorage from '@react-native-community/async-storage';

const Home = ({ navigation }) => {

  const { t } = useTranslation();
  const categoryHomeData = [
    {
      id: 1,
      title: t('Supermarket'),
      image: 'Voucher 12457',
    },

    {
      id: 2,
      title: t('Beef'),
      image: 'Voucher 12457',
    },

    {
      id: 3,
      title: t('Chicken'),
      image: 'Voucher 12457',
    },

    {
      id: 4,
      title: t('Fish'),
      image: 'Voucher 12457',
    },

    {
      id: 5,
      title: t('Fruit'),
      image: 'Voucher 12457',
    },

    {
      id: 6,
      title: t('Vegetables'),
      image: 'Voucher 12457',
    },
  ];
  const carouselItems = [
    {
      id: 1,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 2,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 3,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 4,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
    {
      id: 5,
      title: t('You Can Get Our Offer'),
      image: 'Text 1',
    },
  ];
  const { categories } = useSelector(state => state.categories);
  const { locationSupport } = useSelector(state => state.auth);
  const { userCurrentLocation } = useSelector(state => state.address);

  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const route = useRoute()

  useEffect(() => {
    navigation.addListener('focus', () => {
      setRefresh(!refresh);
      //  alert(route.params?.refreshing)
      // do something
    });


    AsyncStorage.getItem('addressName').then(async val => {
      if (val) {
        dispatch(
          saveCurrentLocationData(val),
        );
        const pos = await AsyncStorage.getItem('addressPosition')

        dispatch(saveCurrentLocation(JSON.parse(pos)));
        dispatch(
          userHomeApi({
            latitude: JSON.parse(pos).latitude,
            longitude: JSON.parse(pos).longitude,
          }),
        );
        setRefreshing(false);
      }
      else {
        Geolocation.getCurrentPosition(position => {
          Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              let locationStreetName = json.results[0].address_components[0].long_name;
              if (locationStreetName !== undefined) {
                AsyncStorage.setItem('addressPosition', JSON.stringify({

                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: position.coords.latitude / 10,
                  longitudeDelta: position.coords.longitude / 10,
                }))
                AsyncStorage.setItem('addressName', json.results[0].formatted_address)
                dispatch(
                  saveCurrentLocationData(json.results[0].formatted_address),
                );
                dispatch(saveCurrentLocation({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  latitudeDelta: position.coords.latitude / 10,
                  longitudeDelta: position.coords.longitude / 10,
                }));

              }
              console.log('result geocoder', json.results[0].formatted_address);
            })
            .catch(error => console.warn(error));
          dispatch(
            userHomeApi({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
          setRefreshing(false);

        });
      }
    })

  }, []);

  const _onRefresh = () => {
    setRefreshing(true);
    // Alert.alert(JSON.stringify(userCurrentLocation));
    dispatch(
      userHomeApi({
        latitude: userCurrentLocation.latitude,
        longitude: userCurrentLocation.longitude,
      }),
    );
    setRefreshing(false);
  };
  return (
    <Container style={styles.container}>
      <HomeHeader key={refresh} navigate={navigate} title={t('Home')} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={_onRefresh} />
        }>
        <Content noPadding>
          {locationSupport
            && categories.length > 0 && (
              <View style={styles.contentContainer}>
                <CategoryList data={categories} />
              </View>
            )}
          {!locationSupport
            && (
              <View style={styles.contentContainer}>
                <NotSupported />
              </View>
            )}
          <OfferSlider data={carouselItems} />
          {/* <View style={styles.contentContainer}>
          <FavoriteList inHome data={categoryHomeData} />
        </View> */}
        </Content>
      </ScrollView>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
});
