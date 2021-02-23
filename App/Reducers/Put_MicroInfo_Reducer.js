const INITIAL_STATE = { status: 0, put_loading: false, microInfo_updated: [] }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'PUT_MICRO_INFO_ATTEMPT':
            return { ...state, put_loading: true }

        case 'PUT_MICRO_INFO_SUCCESS':
            return { ...INITIAL_STATE, status: action.status, put_loading: false, microInfo_updated: action.microInfo_updated }

        case 'PUT_MICRO_INFO_FAIL':
            return { ...INITIAL_STATE, status: action.status, put_loading: false }


        default:
            return state;
    }
}