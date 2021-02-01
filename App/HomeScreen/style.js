import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Platform, I18nManager, Dimensions } from 'react-native';
import G from '../Gloabal';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default {
  containerSplash: {
    height: '100%',
    width: '100%',
    backgroundColor: '#273A70',
    alignItems: 'center',
  },
  containerOnBoard: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
     width: 60,
    marginTop: 40,
    marginLeft: (windowWidth/2)-30,

  },
  shape: {
    width: 11, height: 11, borderRadius: 50, backgroundColor: '#C2C2C2'
  },
  activeShape:{
    width: 11, height: 11, borderRadius: 50, backgroundColor: '#273A70'

  },
  logoRight: {
    width: 180,
    height: 60,
    marginLeft: windowWidth - 205,
    marginTop: 25,
    marginBottom: 10,
  },
  header: {
    textAlign: 'right',
    fontFamily: Platform.OS == "android" ?  G.Bold  : G.Regular , fontWeight : Platform.OS == "ios" ? "800": null , 
    color: 'black',
    fontSize: 24,
    paddingRight: 20,
    padding: 5,
    marginTop : Platform.OS == "ios" ? hp('5%') : null 
  },
  txt: {
    textAlign: 'right',
    fontFamily: G.Regular,
    color: 'black',
    fontSize: 16,
    paddingRight: 20,
    padding: 5,
  },
  normalTxt: {
    textAlign: 'center',
    fontFamily: Platform.OS == "android" ?  G.Bold  : G.Regular , fontWeight : Platform.OS == "ios" ? "800": null , 
    color: 'white',
    fontSize: 16,
    
  },
  container: {
    flex: 1,
  },
  Button: {
    width:155,
    height: 55,
    backgroundColor: '#273A70',
    borderRadius: 9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 2,

  },
  scrollContainer: {
    height: 350,
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold"
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4
  },
  indicatorContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }

};