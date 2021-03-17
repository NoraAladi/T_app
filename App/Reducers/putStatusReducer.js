const INITIAL_STATE = { status: 0 }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUT_STATUS_ATTEMPT':
            return { ...state }

        case 'PUT_STATUS_SUCCESS':
            return { ...INITIAL_STATE, status: action.status }


        default:
            return state;
    }
}