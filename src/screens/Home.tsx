import React, {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import {Colors} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import OfferSlider from '../components/Home/OfferSlider';
import FavoriteList from '../components/Home/FavoriteList';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useNavigation} from '@react-navigation/native';
import {WarningIcon} from "../../assets/Icons/Icons";

const Home: FC = () => {
  const {t} = useTranslation();

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

  const dispatch = useDispatch();
  const {categories}: any = useSelector((state: RootState) => state.categories);
  const {locationSupport,userData}: any = useSelector((state: RootState) => state.auth);
  const {navigate} = useNavigation();

  // useEffect(() => {
    // console.log('userData',userData.userId)
  // }, []);

  return (
    <Container style={styles.container}>
      <HomeHeader navigate={navigate} title={t('Home')}/>
      <Content noPadding>
        {locationSupport && categories.length > 0 && <View style={styles.contentContainer}>
          <CategoryList data={categories}/>
        </View>}
        {/*<WarningIcon/>*/}
        <OfferSlider data={carouselItems}/>
        <View style={styles.contentContainer}>
          <FavoriteList inHome data={categoryHomeData}/>
        </View>
      </Content>
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
