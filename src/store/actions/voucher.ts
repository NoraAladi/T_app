import {Dispatch} from 'redux';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
import {ActionType} from './actions';
import {AsyncKeys, saveItem} from '../../constants/helpers';
import {showMessage} from 'react-native-flash-message';

/**
 * Get Voucher Data
 * @param cb callback function with response
 **/

export const getVoucherData = () => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.get('user/get-user-vouchers');
      console.log('getVoucherData data', data);

      dispatch({
        type: ActionType.GET_USER_VOUCHERS_ERROR,
        payload: {},
      });
      await saveItem(AsyncKeys.GET_USER_VOUCHERS, data);

      dispatch({
        type: ActionType.GET_USER_VOUCHERS,
        payload: data,
      });
      await saveItem(AsyncKeys.GET_USER_VOUCHERS, data);
    } catch (error) {
      dispatch({
        type: ActionType.GET_USER_VOUCHERS_ERROR,
        payload: error?.response.data.message,
      });
      dispatch({
        type: ActionType.GET_USER_VOUCHERS,
        payload: undefined
      });
      console.log(error?.response.data.message, 'erroe');
if( error?.response.status==401)
{
  showMessage({
    message: ('First login ..'),
    duration: 5000,
    type: 'warning',
  });
}else{  showMessage({
  message: error?.response.data.message,
  type: 'danger',
});

}
    
    }
  };
};

/**
 * Add Voucher
 * @param code Voucher Code
 * @param cb callback function with success is true or false
 **/

export const addVoucher = (code: string, cb: (success?: boolean) => void) => {
  return async (dispatch: Dispatch<IDispatch>) => {
    try {
      const {data} = await axiosAPI.post('user/add-user-voucher', {
        code,
      });
      console.log('Add voucher',data);
      
      console.log(data.message, 'mes');
      {
        if (data.message != 'Voucher Added') {
          showMessage({
            message: data.message,
            type: 'danger',
          });
        } else {
          dispatch({
            type: ActionType.ADD_USER_VOUCHER,
            payload: data,
          });
          showMessage({
            message: data.message,
            type: 'success',
          });
          console.log(data, 'add voucher ...');
          getVoucherData();
          cb(true);
        }
      }
    } catch (error) {
      console.log('Add voucher',error?.response);

      cb(false);
      dispatch({
        type: ActionType.ADD_USER_VOUCHER_ERROR,
        payload: error?.response.data.message,
      });
      console.log(error?.response.data.message);
    }
  };
};
