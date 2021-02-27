import axios from 'axios';
import g from "../Gloabal";

export const sign_up = (
    fullNameAr, dateofBirth, gender, mobileNumber, profession, jobFieldId, cityId,
    addressDetails, email, password, confirmPassword, acceptTerms

) => {

    return async (dispatch) => {
        dispatch({ type: 'SIGN_UP_ATTEMPT' });
        try {
            // alert
            // ('fullNameAr : ' + fullNameAr + '\n' +
            //     'dateofBirth : ' + dateofBirth + '\n' +
            //     'gender : ' + gender + '\n' +
            //     'mobileNumber : ' + mobileNumber + '\n' +
            //     'profession : ' + profession + '\n' +
            //     'jobFieldId : ' + jobFieldId + '\n' +
            //     'cityId : ' + cityId + '\n' +
            //     'addressDetails : ' + addressDetails + '\n' +
            //     'email : ' + email + '\n' +
            //     'password : ' + password + '\n' +
            //     'confirmPassword : ' + confirmPassword + '\n' +
            //     'acceptTerms : ' + acceptTerms + '\n'
            // )
            let response = await axios({
                method: 'POST',
                url: `${g.BASE_URL}/api/Accounts/register-newpatient`,
                headers: {
                    'accept': 'text/plain',
                    'Content-Type': 'application/json-patch+json',
                    'authorizationKey': g.authorizationKey,
                },
                data:
                {
                    fullNameAr: fullNameAr,
                    dateofBirth: dateofBirth,
                    gender: gender,
                    mobileNumber: mobileNumber,
                    profession: profession,
                    jobFieldId: jobFieldId,
                    cityId: cityId,
                    addressDetails: addressDetails,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    acceptTerms: acceptTerms

                },
            })
            console.log('----- SIGN UP -----');
            console.log(response.data);
            dispatch({
                type: 'SIGN_UP_SUCCESS',
                message: 'تم إنشاء المستخدم بنجاح',
                status: response.status,
                id: response.data.id
            })


        } catch (error) {
            console.log(error);
            if (error.response) {
                dispatch({
                    type: 'SIGN_UP_FAIL',
                    message: error.response.data.message.split('.')[0],
                    status: error.response.status
                })

            }

        }


    }
}

