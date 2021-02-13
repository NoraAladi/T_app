import { combineReducers} from 'redux';
import loginReducer from './loginReducer';
import _offersReducer from './_offersReducer';
import _offers_Details from './_offers_Details';
import _viistsReducers from './_viistsReducers';
import _viists_detailsReducers from './_viists_detailsReducers';
import _reportes from './_reportes';
import _mini_profileReducer from './_mini_profileReducer';
import _doctor_search from './_doctor_search';
import _lab_search from './_lab_search';
import specialistReducer from './specialistReducer';
import countriesReducer from './countriesReducer';
import citiesReducer from './citiesReducer';
import _get_userdata from './_get_userdata';
import _get_userInfo from './_get_userInfo';
import _offersTypesReducer from './_offersTypesReducer';
import getDependantsReducer from './getDependantsReducer';
import getEmergencyReducer from './getEmergencyReducer';
import _socialReducer from './_socialReducer';
import forgetpassReducer from './forgetpassReducer';
import getMyOrderReducer from './getMyOrderReducer';
import sign_upReducer from './sign_upReducer';



export default combineReducers({
    auth : loginReducer ,
    offer : _offersReducer ,
    offers_details : _offers_Details ,
    visits : _viistsReducers ,
    visit_detail : _viists_detailsReducers ,
    report : _reportes ,
    mini_profile : _mini_profileReducer ,
    doctor_search : _doctor_search ,
    lab_search : _lab_search , 
    specialist: specialistReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    user_data : _get_userdata , 
    user_info : _get_userInfo ,
    offerType: _offersTypesReducer,
    Dependants: getDependantsReducer,
    Emergency:getEmergencyReducer,
    social_channel : _socialReducer , 
    forget_pass: forgetpassReducer,
    _MyOrder:getMyOrderReducer,
    register : sign_upReducer ,
});