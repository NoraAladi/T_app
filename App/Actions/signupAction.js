import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import g from "../Gloabal";

export const sign_up  = ({ 
    fullName , email , password  , confirmPassword  , date ,  sex , mobile , 
    JobType , Jobname , country  , address ,
    
}) => {
    // alert( email + "  " + password )
    return async (dispatch) => {
        dispatch({ type: 'SIGN_UP_ATTEMPT' });

        //call the backend 
        try {
            const response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/register-newpatient`,
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,
                },
                data:
                {
                    fullNameAr:  fullName ,
                    dateofBirth : date,
                    gender : sex ,
                    mobileNumber : mobile ,
                    profession : Jobname ,
                    jobFieldId : JobType ,
                    cityId: country ,
                    addressDetails : address ,
                    email:  email ,
                    password : password ,
                    confirmPassword : confirmPassword  ,
                    acceptTerms : true

                },
            })
            if (response.data) {
            
             onhandleResponse(dispatch, response)  
            }
          } catch (err) {
            // Handle Error Here
            if( err.response.data.message)
            {
                dispatch({ type: 'SIGN_UP_NOT', error: err.response.data.message })
                alert( JSON.stringify(err.response.data.message ))
            }
            else 
                dispatch({ type: 'SIGN_UP_NOT', error:  Object.values(err.response.data.errors)[0][0] })
        }
        }
}

const onhandleResponse = (dispatch, data) => {
    onLoginSuccess(dispatch, data.data )
   //  console.log(data.data)
}

const onLoginSuccess = (dispatch, user ) => {
            dispatch({ type: 'SIGN_UP_SUCCESS', user })
}