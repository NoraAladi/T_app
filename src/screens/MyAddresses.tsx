import React, {FC, useState, useMemo, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors, Pixel} from '../constants/styleConstants';
import Address from '../components/MyAddresses/Address';
import Button from '../components/touchables/Button';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from '../styles/styles';
import {useDispatch, useSelector} from 'react-redux';
import {getUserAddressApi} from '../store/actions/address';
import {RootState} from '../store/store';

const MyAddresses: FC = () => {
  const [selectedId, setSelectedId] = useState(null);
  const {addressList}: any = useSelector((state: RootState) => state.address);
  const userData: any = useSelector((state: RootState) => state.auth.userData);
  console.log('addressList', addressList);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    console.log(userData?.token, 'userData?.token');

    if (userData?.token !== undefined) {
      dispatch(getUserAddressApi());
    }
  }, []);

  const {navigate} = useNavigation();

  const addressListMemo = useMemo(
    () =>
      addressList.map((item: any, index: any) => {
        return (
          <Address
            {...item}
            onPress={() => setSelectedId(item.id)}
            selected={selectedId === item.id}
            key={index}
          />
        );
      }),
    [addressList],
  );

  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('My Addresses')} />
      <Content noPadding>
        <View style={styles.listContainer}>{addressListMemo}</View>
        <View style={styles.submitContainer}>
          <Button
            style={{borderRadius: 10, ...commonStyles.boxShadow}}
            styleTitle={{fontSize: Pixel(30)}}
            title={t('Add A New One +')}
            onPress={() => navigate('AddressLocation')}
          />
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: Colors.sacandAppBackgroundColor,
  },
  listContainer: {
    paddingVertical: 20,
  },
  submitContainer: {
    marginVertical: Pixel(40),
    paddingHorizontal: 20,
  },
});

export default MyAddresses;
