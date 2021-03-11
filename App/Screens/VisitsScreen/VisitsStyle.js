import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {


    header:
    {
        flexDirection: 'row-reverse',
        height: 60, marginTop: hp('1%'),
        backgroundColor: g.white,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .1,
        shadowRadius: 1.49, width: '100%', justifyContent: 'space-between',
        paddingHorizontal: 40,


    },

    card:
    {
        marginTop: wp('2%'),
        width: wp('90%'),
        marginLeft: wp('5%'),
        borderRadius: 10,
        flexDirection: 'row',
        marginBottom: 5,
        backgroundColor: g.white,
        elevation: 4,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: .1,
        shadowRadius: 1.49,
        paddingVertical: 10,
    },

    img:
    {
        width: 40, height: 40, marginTop: hp('2%'),
        marginLeft: wp('5%')
    },

    title:
    {
        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, color: g.Gray, fontSize: 16,
        color: g.Gray, textAlign: 'right', width: wp('65%')
    },

    txt:
    {
        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginLeft: wp('15%'), width: wp('50%'),
        textAlign: 'right',
    },

    btn:
    {
        alignItems: 'center', backgroundColor: g.white,
        shadowColor: g.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 4,
        borderRadius: 5, marginLeft: 'auto', marginTop: hp('1%'),
        height: hp('5%'), marginBottom: hp('2%'),
        width: wp('20%')
    },
    offer:
    {
        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginTop: -5, color: g.Blue,
        fontSize: 18
    },
    // Tretment
    arrow:
    {
        fontSize: 22, width: 30, margin: hp('2%')
    },

    doctor_name:
    {
        fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right', width: wp('65%'), color: g.Blue, fontSize: 14,
        marginRight: wp('5%'),
        //  marginTop: hp('2'),
    },

    date:
    {
        width: wp('15%'), height: hp('9%'),
        marginLeft: wp('3%'), borderRadius: 10, justifyContent: 'center', alignItems: 'center',
        marginTop: hp('1')
    },

    date_txt:
    {
        fontFamily: Platform.OS == "android" ? g.Regular : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'center',
        color: g.COLOR_NO, height: 20
    },

    month:
    {
        fontFamily: g.Regular, textAlign: 'center',
        color: g.COLOR_NO, height: 20, fontSize: 12
    },
    normalTxt: {
        textAlign: 'center', fontFamily: g.Regular, fontSize: 12
    },

    no_data : 
    {
      marginTop: hp('30%'),
      textAlign: 'center', fontFamily: g.Regular, color: g.Gray, fontSize: 20,
    }
    

};