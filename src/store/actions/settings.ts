import {Dispatch} from 'redux';
import {ActionType} from './actions';
import {I18nManager} from 'react-native';
import {AsyncKeys, saveItem} from '../../constants/helpers';
import RNRestart from 'react-native-restart';
import {axiosAPI} from '../../constants/Config';
import {IDispatch} from '../../constants/interfaces';
const {allowRTL, forceRTL, swapLeftAndRightInRTL} = I18nManager;

export const loadApp = () => ({
  type: ActionType.APP_LOADED,
});

export const toggleLanguage = (payload: boolean) => ({
  type: ActionType.CHANGE_LANGUAGE,
  payload,
});

export const createUpdateDevice = (payload: boolean) => ({
  type: ActionType.CREATE_UPDATE_DEVICE,
  payload,
});

export const createUpdateDeviceApi = (fcm_token: string, uuid: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const {data} = await axiosAPI.post(`user/update-or-create-device`, {
        fcm_token,
        uuid,
      });
      console.log('createUpdateDeviceApidata', data);
    } catch (error) {
      console.log('createUpdateDeviceApiError', error.response);
    }
  };
};

export const initializApp = () => {
  return (dispatch: Dispatch<any>) => {
    try {
      allowRTL(true);
      dispatch(loadApp());
    } catch (error) {
      console.log('initializApp', error);
    }
  };
};

export const LanguageHandler = (lang: string) => {
  return (dispatch: Dispatch<IDispatch>) => {
    dispatch({type: ActionType.SAVE_LANGUAGE, payload: lang});
    allowRTL(lang === 'ar');
    forceRTL(lang === 'ar');
    swapLeftAndRightInRTL(lang === 'ar');
    setTimeout(() => {
      RNRestart.Restart();
    }, 500);
  };
};
