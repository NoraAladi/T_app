const INITIAL_STATE = { offersType: [], loadingType: false }
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GET_OFFERS_TYPE_ATTEMPT':
            return { ...state, loadingType: true }

        case 'GET_OFFERS_TYPE_SUCCESS':
            return { ...INITIAL_STATE, offersType: action.offersType, loadingType: false }

        default:
            return state;
    }
}