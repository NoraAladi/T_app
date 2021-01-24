import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {

  container:
  {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: g.white,
    shadowColor: g.white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 4,
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
    flexDirection: 'column', marginLeft: wp('5%'), marginTop: hp('1%')
  },

  username:
  {
    textAlign: 'center', fontFamily: g.Regular, marginTop: -10
  },

  code:
  {
    textAlign: 'center', fontFamily: g.Bold
  },

  offer:
  {
    textAlign: 'center', marginLeft: wp('20%'), fontSize: 20, fontFamily: g.Bold
  },

  irea:
  {
    textAlign: 'center', fontFamily: g.Regular, color: g.Gray, fontSize: 16,
    marginLeft: wp('10%')
  },

  city:
  {
    textAlign: 'center', fontFamily: g.Bold,
    marginLeft: wp('5%'), marginTop: -5
  },

  pouns:
  {
    height: 50, width: 150, marginTop: hp('1%'), borderRadius: 10,
    paddingLeft: 10
  },

  flat:
  {
    marginRight: 'auto',marginLeft: 'auto',
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
    width: 60, height: 60, borderRadius: 60, marginTop: hp('-5'), marginLeft: wp('60%')
  },

  txt:
  {
    textAlign: 'center', fontFamily: g.Bold,
    marginLeft: wp('5%'), width: 200
  },

  txt1:
  {
    textDecorationLine: 'line-through',
    width: 50, fontSize: 12, color: g.Ferany, fontFamily: g.Regular
  },

  txt2:
  {
    fontFamily: g.Regular, marginTop: hp('.5%'),
    width: 150, fontSize: 12, color: g.Gray, marginLeft: 0
  },
  sale:
  {
    backgroundColor: g.sale, borderRadius: 20
    , width: 90, height: 30, color: g.red
  },
  img:
  {
    width: wp('100%'), height: hp('35%'), marginTop: hp('0%')
  },
  title3:
  {
    marginTop: hp('-31%'), marginRight: wp('1%'), fontSize: 18,
    color: g.white, fontFamily: g.Bold, textAlign: 'right'
  },

  down:
  {
    marginTop: hp('-30%'), height: 40, color: g.white
  },

  view2:
  {
    alignItems: 'center', justifyContent: 'center', height: hp('35%')
  },

  line:
  {
    width: wp('90%'), marginTop: hp('4%'),
    borderColor: g.Light_Gray, height: 1, borderWidth: .5
  },

  branch:
  {
    marginRight: wp('20%'), fontSize: 14, fontFamily: g.Bold, color: g.Blue, marginTop: hp('2%')

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
    color: g.Gray, fontFamily: g.Regular
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

  semi : 
  {
    width: wp('15%'), marginTop: hp('2%'), marginRight : 'auto' , 
           marginLeft : 'auto' , borderRadius : 20 ,
           height: 5 , backgroundColor : g.Light_Gray
  },
  txt9 : 
  {
    textAlign: 'center', color: g.Gray,
     marginTop: hp('-.5%'),
     fontSize: 14, fontFamily: g.Regular,
    transform: Platform.OS == "ios" ? [{ rotateY: '0deg' }] : [{ rotateY: '180deg' }],
    fontSize: 12, width: 60
  },

  view3 : 
  {
    borderWidth: .5, borderRadius: 20,
    borderColor: g.Light_Gray , 
    justifyContent: 'center', alignItems: 'center',
     padding:10, height: 37, marginLeft: 5,
  }

};