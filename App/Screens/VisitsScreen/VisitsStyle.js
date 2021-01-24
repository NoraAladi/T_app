import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {


    header:
    {
        flexDirection: 'row-reverse',
        height: 60, marginTop: hp('1%'),
        backgroundColor: g.white,
        shadowColor: g.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 6, width: '100%', justifyContent: 'space-between',
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
        shadowColor: g.white,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.37,
        shadowRadius: 3.49,
        elevation: 4,
        paddingVertical:10 ,
    },

    img:
    {
        width: 40, height: 40, marginTop: hp('2%'),
        marginLeft: wp('5%')
    },

    title:
    {
        fontFamily: g.Bold, color: g.Gray, fontSize: 16,
        color: g.Gray, textAlign: 'right', width: wp('65%')
    },

    txt:
    {
        textAlign: 'center', fontFamily: g.Bold,
        marginLeft: wp('15%'), width: wp('50%'),
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
        fontFamily: g.Bold, marginTop: -5, color: g.Blue,
        fontSize: 18
    },
    // Tretment
    arrow:
    {
        fontSize: 22, width: 30, margin: hp('2%')
    },

    doctor_name:
    {
        fontFamily: g.Bold,
        textAlign: 'right', width: wp('65%'), color: g.Blue, fontSize: 14,
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
        fontFamily: g.Bold, textAlign: 'center',
        color: g.COLOR_NO, height: 20
    },

    month:
    {
        fontFamily: g.Regular, textAlign: 'center',
        color: g.COLOR_NO, height: 20, fontSize: 12
    },
    normalTxt: {
        textAlign: 'center', fontFamily: g.Regular,fontSize: 12
    }

};