import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform } from 'react-native';
import g from '../../Gloabal';

export default {

  card:
  {
    flexDirection: 'row-reverse',
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: g.white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 2,
    width: wp('90'),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  head:
  {
    flexDirection: 'row-reverse',
    padding: 15,
    paddingHorizontal: 20,
    backgroundColor: g.white,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.37,
    shadowRadius: 3.49,
    elevation: 2,
    width: wp('90'),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
    height: Platform.OS == "ios" ? hp('10%') : null,
    width: g.windowWidth, alignItems: 'center', elevation: 5
  },

  icon:
  {
    fontSize: 20
  },
  icon1:
  {
    fontSize: 22
  },

  img:
  {
    width: 88, height: 88,
    borderRadius: 44,borderWidth: .5,borderColor: '#00000020',
  },

  txt: {
    fontSize: 14, fontFamily: g.Regular,
    textAlign: 'right',
  },
  txtBold: {
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'right', fontSize: 16,
  }
  ,

  viewInput:
  {
    borderColor: g.Light_Gray, borderWidth: .5, borderRadius: 10,
    // justifyContent: 'center',
    height: hp('8%'), width: wp('80%'), textAlign: 'right', marginTop: 10,
  },
  input:
  {
    textAlign: 'right', fontSize: 14,
    fontFamily: g.Regular, paddingHorizontal: 15, padding: 15,
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
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'center'
  },
  noFound: {
   
    fontFamily: Platform.OS == "android" ? g.Regular : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'center',
    color: g.Gray,
    fontSize: 20,
    marginTop: hp('5'),

  }

};