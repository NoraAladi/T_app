import { combineReducers} from 'redux';
import loginReducer from './loginReducer';
import _offersReducer from './_offersReducer';
import _offers_Details from './_offers_Details';
import _viistsReducers from './_viistsReducers';
import _viists_detailsReducers from './_viists_detailsReducers';
import _reportes from './_reportes';
import _mini_profileReducer from './_mini_profileReducer';
import _doctor_search from './_doctor_search';
import _lab_search from './_doctor_search';
import specialistReducer from './specialistReducer';
import countriesReducer from './countriesReducer';
import citiesReducer from './citiesReducer';
import _offersTypesReducer from './_offersTypesReducer';
import getDependantsReducer from './getDependantsReducer';
import getEmergencyReducer from './getEmergencyReducer';


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
    offerType: _offersTypesReducer,
    Dependants: getDependantsReducer,
    Emergency:getEmergencyReducer,
});