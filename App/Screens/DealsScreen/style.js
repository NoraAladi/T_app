import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {
  fitImageWithSize: {
    height: 50,
    width: 50,

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
    marginTop: Platform.OS == "ios" ? hp('5%') : null,
  },
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
    flexDirection: 'column', marginTop: hp('1%'), width: '70%'
  },
  viewHeader: {
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

  irea:
  {
    textAlign: 'right',
    fontFamily: g.Regular,
    color: g.Gray,
    fontSize: 16,
    width: wp('50')
  },

  city:
  {
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,

    marginLeft: wp('5%'), marginTop: -5
  },

  pouns:
  {
    height: 50, width: 150, marginTop: hp('1%'), borderRadius: 10,
    paddingLeft: 10
  },

  flat:
  {
    marginRight: 'auto', marginLeft: 'auto',
  },

  center:
  {
    justifyContent: 'center', alignItems: 'center', marginTop: hp('0%'), height: 60,

  },
  title1:
  {
    marginTop: hp('.5%'),
    fontSize: 18,
  },

  title2:
  {
    width: 60, textAlign: 'center', color: g.Gray,
    marginTop: hp('4.5%'), height: 60,
    fontSize: 14, fontFamily: g.Regular,
    transform: Platform.OS == "ios" ? [{ rotateY: '0deg' }] : [{ rotateY: '180deg' }]
  },

  img_view:
  {
    justifyContent: 'center', alignItems: 'center',
    width: 120, height: 40, padding: 20,
    marginLeft: 10,
  },

  card:
  {
    marginTop: wp('5%'),
    width: wp('90%'), marginLeft: wp('5%'), marginRight: wp('5%'),
    borderRadius: 10,

  },

  logo:
  {
    width: 60, height: 60, borderRadius: 60, marginTop: -30, marginLeft: 'auto',
    marginRight: 10,
  },

  txt:
  {
    textAlign: 'right',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null, width: '68%', marginRight: wp('2')
  },

  rowTitle: {
    width: '100%',paddingHorizontal: 15,
  },
  txt1:
  {
    textDecorationLine: 'line-through',
    width: 50, fontSize: 12, color: g.Ferany, fontFamily: g.Regular, marginLeft: 20
  },

  txt2:
  {
    fontFamily: g.Regular,
    fontSize: 13, color: g.Gray, 
  },
  sale:
  {
    backgroundColor: '#F64E4E50', borderRadius: 20, color: '#F64E4E'
    , width: 90, height: 30, fontFamily: g.Regular, textAlign: 'center'
  },
  img:
  {
    width: wp('100%'), height: hp('35%'), marginTop: hp('0%')
  },
  title3:
  {
     marginRight: wp('1%'), fontSize: 18,
    color: g.white,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'right',marginLeft: wp('2%')
  },

  down:
  {
    marginTop: hp('1%'),  color: g.white
  },

  view2:
  {
    alignItems: 'center', justifyContent: 'center', height: hp('35%'),
  },

  line:
  {
    width: wp('90%'), marginTop: hp('4%'),
    borderColor: g.Light_Gray, height: 1, borderWidth: .5
  },

  branch:
  {
    marginRight: wp('0%'), fontSize: 14, width: '25%',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, color: g.Blue, marginTop: hp('2%')

  },

  txt3:
  {
    marginTop: hp('2%'), textAlign: 'right', width: wp('90%')
  },

  txt4:
  {
    width: 70, fontSize: 16, color: g.Blue,
  },

  txt5:
  {
    fontFamily: g.Regular, color: g.Ferany, textAlign: 'right', width: wp('90%')
  },

  txt6:
  {
    color: g.Gray, fontFamily: g.Regular, textAlign: 'right'
  },

  txt7:
  {
    marginRight: wp('5%'), marginTop: hp('1%'),
    textAlign: 'right', width: wp('90%')
  },

  txt8:
  {
    fontFamily: g.Regular, color: g.Ferany,
    marginRight: wp('5%'), marginTop: hp('1%'),
    textAlign: 'right', width: wp('85%')
  },

  semi:
  {
    width: wp('15%'), marginTop: hp('1%'), marginRight: 'auto',
    marginLeft: 'auto', borderRadius: 20,
    height: 5, backgroundColor: g.Light_Gray
  },
  txt9:
  {
    textAlign: 'center', color: g.Gray,
    marginTop: hp('-.5%'),
    fontSize: 14, fontFamily: g.Regular,
    transform: Platform.OS == "ios" ? [{ rotateY: '0deg' }] : [{ rotateY: '180deg' }],
    fontSize: 12, width: 70
  },

  view3:
  {
    borderWidth: .5, borderRadius: 20,
    borderColor: g.Light_Gray,
    justifyContent: 'center', alignItems: 'center',
    padding: 10, height: 37, marginLeft: 5,
  },
  no_data:
  {
    marginTop: hp('30%'),
    textAlign: 'center', fontFamily: g.Regular, color: g.Gray, fontSize: 20,
  },
  forFlex: {
    width: null, height: '100%', resizeMode: 'contain'
  },
  spinner: {
    marginTop: hp('35%')
  },
  specificCard: {
   // height: 300,
    flexDirection: 'column',
    marginBottom: 5,
    paddingBottom: 15,
  },
  imageCard: {
    width: wp('90%'),
    height: hp('20%'),
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    
  },
  minusMargin: {
    marginTop: -30,
    color: g.Ferany
  },

  simpleRowRevers: {
    flexDirection: 'row-reverse'
  },

  specificTxt: {
    width: 70,
    fontSize: 14,
    color: g.Blue
  },
  discount:
  {
    flexDirection: 'row-reverse',
    marginTop: hp('.5%'),
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 25,
  },
  flatListHeight: {
    height: g.windowHeight - 55
  },
  flag: {
    flexDirection: 'row',
    margin: 20
  },
  imageLogo: {
    width: 100,
    height: 100, marginLeft: 60
  },
  spinnerTop: {
    marginTop: hp('35%')
  },
  discountView: {
    alignItems: 'flex-end', padding: 20,
  },
  enter: {
    marginTop: hp('1%')
  },
  enter2: {
    marginTop: hp('2%')
  },
  viewBranch: {
    flexDirection: 'row',
    margin: 20,
    width: '100%',
    paddingRight: '5%',
    paddingLeft: '5%',
  }
  ,
  txtIOS: {
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null,

  },
  popModal: {
    flexDirection: 'row', marginLeft: 'auto',padding:5,paddingRight: 10,
    backgroundColor: '#00000070', borderRadius: 15, position: 'absolute',
    top:'15%',right:'2%'
  }
};