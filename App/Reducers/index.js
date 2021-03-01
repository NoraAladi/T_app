import { combineReducers } from 'redux';
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
import _JobsReducer from './_JobsReducer';
import chande_passReducer from './chande_passReducer';
import EditUserDataReducer from './EditUserDataReducer';
import EditMedicalDataReducer from './EditMedicalDataReducer';
import getRelation from './getRelation';
import newRegister_Reducer from './newRegister_Reducer';
import patientCode_Reducer from './patientCode_Reducer';
import completeregister_newpatient_Reducer from './completeregister_newpatient_Reducer';
import get_microInfo_Reducer from './get_microInfo_Reducer';
import Put_MicroInfo_Reducer from './Put_MicroInfo_Reducer';
import support_types_reducer from './support_types_reducer';
import contact_Reducer from './contact_Reducer';
import completeregister_newDependent_Reducer from './completeregister_newDependent_Reducer';
import PharmacyOrderDetails_Reducer from './PharmacyOrderDetails_Reducer';
import resetPass_Reducer from './resetPass_Reducer';
import del_dependent_Reducer from './del_dependent_Reducer';
import GenericReducer from './GenericReducer';
import getReports_Reducer from './getReports_Reducer';



export default combineReducers({
    auth: loginReducer,
    offer: _offersReducer,
    offers_details: _offers_Details,
    visits: _viistsReducers,
    visit_detail: _viists_detailsReducers,
    report: _reportes,
    mini_profile: _mini_profileReducer,
    doctor_search: _doctor_search,
    lab_search: _lab_search,
    specialist: specialistReducer,
    countries: countriesReducer,
    cities: citiesReducer,
    user_data: _get_userdata,
    user_info: _get_userInfo,
    offersType: _offersTypesReducer,
    Dependants: getDependantsReducer,
    Emergency: getEmergencyReducer,
    social_channel: _socialReducer,
    forget_pass: forgetpassReducer,
    _MyOrder: getMyOrderReducer,
    register: sign_upReducer,
    CHange: chande_passReducer,
    jobs: _JobsReducer,
    editStatus: EditUserDataReducer,
    editMedicalData: EditMedicalDataReducer,
    relation: getRelation,
    newRegister: newRegister_Reducer,
    patientCode: patientCode_Reducer,
    user_completed: completeregister_newpatient_Reducer,
    microInfo: get_microInfo_Reducer,
    microInfo_updated: Put_MicroInfo_Reducer,
    supportTypes:support_types_reducer,
    contactResponse: contact_Reducer,
    userDependent_completed: completeregister_newDependent_Reducer,
    pharmacyOrderDetails: PharmacyOrderDetails_Reducer,
    resetPass: resetPass_Reducer,
    delDependent: del_dependent_Reducer,
    GenericHealthProfile: GenericReducer,
    reportDetails:getReports_Reducer,
});