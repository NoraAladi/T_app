import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {

  arrow:
  {
    color: g.BLACK, fontsize: 18, marginTop: hp('5%'), marginLeft: wp('85%')
  },

  show:
  {
    fontsize: 18, marginTop: hp('2%'), marginLeft: wp('3%')
  },

  login:
  {
    fontSize: 24, color: g.BLACK,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),
    marginTop: hp('5%'), textAlign: 'right'
  },

  viewInput:
  {
    marginTop: hp('2%'), marginRight: 'auto', marginLeft: 'auto',
    borderColor: g.Light_Gray, borderWidth: .5, borderRadius: 10,
    justifyContent: 'center',
    height: hp('8%'), width: wp('80%'), textAlign: 'right'
  },
  input:
  {
    textAlign: 'right', fontSize: 16,
    fontFamily: g.Regular, padding: 10,
  },

  enter:
  {
    fontSize: 16, color: g.BLACK, fontFamily: g.Regular, marginRight: wp('10'),
    marginTop: hp('0'), textAlign: 'right'
  },

  username:
  {
    fontSize: 14, color: g.Gray, fontFamily: g.Regular, marginRight: wp('10'),
    marginTop: hp('5%'), textAlign: 'right'
  },



  forget:
  {
    fontSize: 16, color: g.Blue,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('60'),
    marginTop: hp('5%'), textAlign: 'right'
  },

  btn:
  {
    marginTop: hp('3%'), marginLeft: 'auto', marginRight: 'auto',
    borderRadius: 10, backgroundColor: g.Bold_blue, alignItems: 'center',
    justifyContent: 'center',
    height: hp('8%'), width: wp('80%')
  },

  txt_btn:
  {
    fontSize: 16, color: g.white,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'center'
  },
  sign1:
  {
    fontSize: 14, color: g.Ferany,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    marginRight: wp('10'),
    marginTop: hp('1%'), marginRight: wp('2%')
  },
  sign:
  {
    fontSize: 14, color: g.Blue,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),
    marginTop: hp('1%'), marginRight: wp('2%')
  },

  row:
  {
    flexDirection: 'row', marginLeft: wp('20%'), marginTop: hp('4%')
  },

  change:
  {
    color: g.BLACK, fontsize: 20, marginTop: hp('4%'), marginLeft: wp('40%')
    , fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),


  },

  change_title:
  {
    color: g.BLACK, fontsize: 20, marginTop: hp('4%'), marginRight: wp('35%'),
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),

  },
  error:
  {
     color: 'red',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'center', marginTop: 10
  }

};