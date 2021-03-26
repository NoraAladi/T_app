import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import HomeHeader from '../components/header/HomeHeader';
import {Colors} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import CategoryList from '../components/Home/CategoryList';
import OfferSlider from '../components/Home/OfferSlider';
import FavoriteList from '../components/Home/FavoriteList';

const categoryHomeData = [
  {
    title: 'Supermarket',
    image: 'Voucher 12457',
  },

  {
    title: 'Beef',
    image: 'Voucher 12457',
  },

  {
    title: 'Chicken',
    image: 'Voucher 12457',
  },

  {
    title: 'Fish',
    image: 'Voucher 12457',
  },

  {
    title: 'Fruit',
    image: 'Voucher 12457',
  },

  {
    title: 'Vegetables',
    image: 'Voucher 12457',
  },

  {
    title: 'Vegetables',
    image: 'Voucher 12457',
  },
];
const carouselItems = [
  {
    title: 'You Can Get Our Offer',
    image: 'Text 1',
  },
  {
    title: 'You Can Get Our Offer',
    image: 'Text 1',
  },
  {
    title: 'You Can Get Our Offer',
    image: 'Text 1',
  },
  {
    title: 'You Can Get Our Offer',
    image: 'Text 1',
  },
  {
    title: 'You Can Get Our Offer',
    image: 'Text 1',
  },
];

const Home: FC = () => {
  const {t} = useTranslation();
  return (
    <Container style={styles.container}>
      <HomeHeader title="Home" />
      <Content noPadding>
        <View style={styles.contentContainer}>
          <CategoryList data={categoryHomeData} />
        </View>
        <OfferSlider data={carouselItems} />
        <View style={styles.contentContainer}>
          <FavoriteList data={categoryHomeData} />
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
