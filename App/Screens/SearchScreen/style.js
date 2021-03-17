import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {

  arrow:
  {
    fontSize: 22, width: 30, marginTop: hp('2%')
  },

  userimg:
  {
    width: 50, height: 50, marginTop: 0
  },

  view1:
  {
    flexDirection: 'column', marginLeft: wp('5%'), marginTop: hp('1%')
  },

  username:
  {
    textAlign: 'center', fontFamily: g.Regular, marginTop: -10
  },

  code:
  {
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
  },

  offer:
  {
    textAlign: 'center', marginLeft: wp('20%'), fontSize: 20,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
  },

  card:
  {
    marginTop: wp('2%'),
    marginLeft: wp('0%'),
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: g.white,
    shadowColor: g.white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 4,
    width: wp('22%'), height: hp('14%'),
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: .1,
    shadowRadius: 1.49,

  },

  txt:
  {
    textAlign: 'center', color: g.white,
    marginTop: hp('-8%'),
    fontSize: 15,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, width: 65,
  },

  arr:
  {
    fontSize: 22, width: 30, marginTop: hp('0%'),
    marginLeft: 'auto', marginRight: 'auto', color: 'red'
  },

  img:
  {
    width: wp('22%'), height: hp('14%'), borderRadius: 10
  },

  txt1: {
    textAlign: 'right', marginLeft: 'auto',
    fontSize: 18, fontFamily: g.Regular,
    width: 200, margin: 2
  },

  img1:
  {
    width: 25, height: 25, marginTop: 15
  },

  // Doctor 
  viewInput:
  {
    marginTop: hp('2%'), marginRight: 'auto', marginLeft: 'auto',
    borderColor: g.Light_Gray, borderWidth: .5, borderRadius: 10,
    justifyContent: 'center',
    height: hp('8%'), width: wp('90%'), textAlign: 'right'
  },

  username1:
  {
    fontSize: 14, color: g.Gray, fontFamily: g.Regular, marginRight: wp('10'),
    marginTop: hp('5%')
  },

  input:
  {
    textAlign: 'right', fontSize: 16,
    fontFamily: g.Regular, padding: 10,
  },

  btn:
  {
    marginTop: hp('3%'), marginLeft: 'auto', marginRight: 'auto',
    borderRadius: 10, backgroundColor: g.Bold_blue, alignItems: 'center',
    justifyContent: 'center', marginBottom: hp('5%'),
    height: hp('8%'), width: wp('80%')
  },

  txt_btn:
  {
    fontSize: 16, color: g.white,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'center'
  },


  container:
  {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: g.white,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: .1,
    shadowRadius: 1.49,
  },

  irea:
  {
    textAlign: 'right', fontFamily: g.Regular, color: g.Gray, fontSize: 16,
  },

  city:
  {
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginLeft: wp('5%'), marginTop: -5
  },
  pouns:
  {
    height: 50, width: wp('42.5'), marginTop: hp('1%'), borderRadius: 10,
  },

  view2:
  {
    height: 50, width: wp('42.5'), marginTop: hp('1%'), borderRadius: 10,
  },

  view3:
  {
    height: 50, marginTop: hp('1%'), borderRadius: 10,
    paddingLeft: 10
  },

  view4:
  {
    marginLeft: wp('5%'), width: '90%', marginTop: hp('3%')
  },

  Title:
  {
    textAlign: 'right', marginLeft: wp('20%'), fontSize: 20,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null
    , width: 200
  },

  txt2:
  {
    textAlign: 'right', marginLeft: wp('40%'), fontSize: 16,
    fontFamily: g.Regular, marginTop: hp('1%'), color: g.Gray
    , width: 200, margin: 10
  },

  info:
  {
    padding: 10,
    marginTop: wp('2%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: g.white,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: .1,
    shadowRadius: 1.49,
    // height: hp('14%'),
    alignItems: 'center',
    flexDirection: 'row-reverse', width: wp('90%'),
  },

  view_img:
  {
    width: 70, height: 70, alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 90,
  },
  doctor_name:
  {
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, textAlign: 'right', width: wp('50%'), color: g.Blue, fontSize: 14,
    marginRight: wp('3%'),
    //  marginTop: hp('2'),
  },

  call:
  {
    color: g.Gray, fontSize: 20, marginTop: hp('.5%')
  },

  modal_txt:
  {
    fontSize: 22, color: g.BLACK,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),
    marginRight: 0,
  },
  semi:
  {
    width: wp('15%'), marginTop: hp('2%'), marginRight: 'auto',
    marginLeft: 'auto', borderRadius: 20,
    height: 5, backgroundColor: g.Light_Gray
  },

  input1:
  {
    textAlign: 'center', fontSize: 14,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, padding: 10, width: wp('85%')
  },
  inputMedicineName:
  {
    textAlign: 'right', fontSize: 14,
    fontFamily: g.Regular,
    padding: 10, width: wp('85%')
  },
  view5:
  {
    height: hp('20%'), marginTop: hp('2%'), marginRight: 'auto',
    marginLeft: 'auto', borderColor: g.Light_Gray, borderWidth: .5, borderRadius: 10,
    width: wp('90%'), textAlign: 'right'
  },

  add:
  {
    marginTop: hp('2%'), textDecorationLine: 'underline'
    , color: g.Blue
  },
  view6:
  {
    backgroundColor: g.Samawe, borderRadius: 0,
    width: 55, height: 55, alignItems: 'center',
    justifyContent: 'center', marginRight: wp('3%')
  },

  txt3:
  {
    textAlign: 'right', marginRight: wp('5%'), fontSize: 16,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null
    , width: 230, marginTop: 15,
  },

  line: {
    height: 1, marginTop: 5, marginBottom: 10, borderWidth: .5,
    borderColor: g.Light_Gray, width: wp('90%')
  },
  view7:
  {
    padding: 10,
    marginTop: wp('3%'),
    marginBottom: 5,
    backgroundColor: g.white,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: .1,
    shadowRadius: 1.49,
    // height: hp('14%'),
    width: wp('100%'),
  },

  view8:
  {
    padding: 10,
    marginTop: wp('2%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%'),
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: g.white,
    borderColor: g.Light_Gray, borderBottomWidth: .5,
    alignItems: 'center',
    flexDirection: 'row-reverse', width: wp('90%'),
  },
  no_data:
  {
    marginTop: hp('30%'),
    textAlign: 'center', fontFamily: g.Regular, color: g.Gray, fontSize: 20,

  },
  error:
  {
    color: 'red',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'center', marginTop: 10
  },
  ModalContainer:
  {
    width: wp('80'), height: hp('40'), backgroundColor: 'white',
    elevation: 4, borderRadius: 15,
    marginTop: hp('30%'), marginLeft: '10%',
  }
  ,
  modalText:
  {
    fontSize: 14, color: g.Gray, fontFamily: g.Regular,
    textAlign: 'right', paddingHorizontal: 5,
  },
  titleModal:
  {
    fontSize: 16, fontFamily: g.Bold,
    marginTop: hp('2%'), textAlign: 'right', paddingHorizontal: 20,
  },

};