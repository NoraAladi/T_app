import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';


export default {
    dropDownView:
    {
        justifyContent: 'space-between',
        width: g.windowWidth - 80,
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row-reverse',
        height: 55,
        backgroundColor: g.white,
        elevation: 2,
        marginTop: hp('2'),
        borderRadius: 10,
        padding: 12,
        shadowOffset: {
            width: 0,
            height: 5,
        },

        shadowOpacity: .1,
        shadowRadius: 1.49,
    },
    dropDownIcon:
    {
        fontSize: 22, marginTop: 3,
    },
    dropDownTxt:
    {
        fontFamily: g.Regular, color: g.BLACK, fontSize: 14,
    },
    staticHeight: {

        marginTop: -18,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        height: 120,
        width: wp('42.5')

    }
};