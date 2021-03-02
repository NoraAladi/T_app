import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform , Dimensions } from 'react-native';
import g from '../../Gloabal';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const window = Dimensions.get("window");

export default {

  arrow:
  {
    color: g.BLACK, fontSize: 18, marginTop: hp('5%'), marginLeft: wp('80%')
  },

  show:
  {
    fontSize: 18, marginTop: hp('2%'), marginLeft: wp('3%')
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
    color: g.BLACK, fontSize: 20, marginTop: hp('4%'), marginLeft: wp('40%')
    , fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),


  },

  change_title:
  {
    color: g.BLACK, fontSize: 20, marginTop: hp('4%'), marginRight: wp('35%'),
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, marginRight: wp('10'),

  },
  error:
  {
     color: 'red',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular,
    fontWeight: Platform.OS == "ios" ? "800" : null,
    textAlign: 'center', marginTop: 10
  },

  view1 : 
  {

    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: windowWidth - 50,
    marginTop: 40,
    marginRight: 20,
  },

  view2 : 
  {
    width: 155,
                        height: 55,
                        backgroundColor: '#C0D0FF99',
                        borderRadius: 9,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.9,
                        shadowRadius: 2,
  },

  txt1 : 
  {

    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    color: 'white',
    fontSize: 16, marginTop: 10,
  },

  txt2 : 
  {

    width: 155,
    height: 55,
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,
    backgroundColor: '#273A70',

  },

  txt3 : 
  {
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null,
    color: 'white',
    fontSize: 16, marginTop: 10, marginTop: 10,
  },
  input1:
  {
    textAlign: 'center', fontSize: 14,
    fontFamily: Platform.OS == "android" ? g.Bold : g.Regular, fontWeight: Platform.OS == "ios" ? "800" : null, padding: 10, width: wp('85%')
  },
  ViewContainer:{
    flexDirection: 'row', paddingHorizontal: 25,
    marginTop: Platform.OS == "ios" ? hp('5%') : null
  },
  changePass: {
    fontSize: 18,
    marginLeft: wp('27'),
    marginTop: 30,
  },
  enter2: 
    { marginTop: hp('2%') },
    enter4: 
    { marginTop: hp('4%') },
  simpleRow: {
    flexDirection: 'row' 
  },
  enter5: { marginLeft: wp('5%'), },
  
  widthInput: {
    width: wp('60%')
  },
  SpinnerTopForget: {
    marginTop: '10%' 
  },
  SpinnerTopPatient: {
    marginTop: '20%' 
  },
  LoginContainer: {
    marginTop: Platform.OS == "ios" ? hp('5%') : null
  },

patientContainer:{
  flexDirection: 'row',
  paddingHorizontal: 25, width: g.windowWidth,
  justifyContent: 'space-between',
  marginTop: Platform.OS == "ios" ? hp('5%') : null,

},
};