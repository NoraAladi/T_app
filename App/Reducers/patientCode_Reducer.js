const INITIAL_STATE = { status: 0, message: '', loading: false, patientCodeResponse: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PATIENT_CODE_ATTEMPT':
            return { ...state, loading: true }

        case 'PATIENT_CODE_SUCCESS':
            return {
                ...INITIAL_STATE, loading: false, status: action.status,
                message: action.message, patientCodeResponse: action.patientCodeResponse
            }

        case 'PATIENT_CODE_FAIL':
            return {
                ...INITIAL_STATE, loading: false, status: action.status, message: action.message,
                patientCodeResponse: action.patientCodeResponse
            }



        default:
            return state;
    }
}