import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content } from '../components/containers/Containers';
import Header from '../components/header/Header';
import ApplyInput from '../components/Voucher/ApplyInput';
import Balance from '../components/Voucher/Balance';
import VoucherDetails from '../components/Voucher/VoucherDetails';
import { Colors } from '../constants/styleConstants';
import { commonStyles } from '../styles/styles';
import { addVoucher, getVoucherData } from '../store/actions/voucher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';
import { axiosAPI } from '../constants/Config';
import { showMessage } from 'react-native-flash-message';


/*  let voucherData:any;
getItem(AsyncKeys.GET_USER_VOUCHERS).then(data => voucherData = data);
  */
const Voucher: FC = () => {
  const dispatch = useDispatch();
  const { t }: any = useTranslation();
  const [transaction, setTransaction] = useState('')
  const [user, setUSer] = useState(0)

  const { userData }: any = useSelector((state: RootState) => state.auth);
  const [state, setstate] = useState({
    code: '',
    balanceValue: '',
    balanceDate: '',
    loader: false,
  });
  useEffect(() => {
    getVoucherApi()
  }, [userData?.token]);

  const getVoucherApi = async () => {
    try {
      const data = await axiosAPI.get('user/get-user-vouchers');
      console.log('getVoucherData data', data);
      setstate(old => ({
        ...old,
        balanceDate: data.data?.transaction.slice(-1).pop().date
      }))
      setTransaction(data.data?.transaction)
      setUSer(data.data?.user)
    } catch (error) {
      console.log(error.response);
      if (error?.response.status == 401) {
        showMessage({
          message: ('First login ..'),
          duration: 5000,
          type: 'warning',
        });
      }
    }

  };

  const addVouchers = () => {
    setstate(old => ({ ...old, loader: true }));
    dispatch(
      addVoucher(state.code, success => {
        setstate(old => ({ ...old, loader: false, code: '' }));
        success;
      }),
    );
  };
  console.log('state.balanceDate', state.balanceDate)
  return (
    <Container style={{ backgroundColor: Colors.sacandAppBackgroundColor }}>
      <Header title={t('Voucher')} />
      <Content noPadding>
        <View style={styles.container}>
          <Balance
            name={userData.name}
            value={String(user)}
            date={state.balanceDate}
          />
          <ApplyInput
            onPress={() => addVouchers()}
            options={{
              onChangeText: value => {
                setstate(old => ({ ...old, code: value }));
              },
              value: state.code,
              onSubmitEditing: addVouchers,
            }}
          />
        </View>
        {transaction == '' ? null : (
          <View style={styles.listContainer}>
            {transaction.map((item, index) => (
              <VoucherDetails
                {...item}
                key={index}
                isLast={index === transaction.length - 1}
              />
            ))}
          </View>
        )}
      </Content>
    </Container>
  );
};

export default Voucher;

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
});
