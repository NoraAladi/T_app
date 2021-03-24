import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Dimensions, Animated } from 'react-native';
import styles from './style';
import { withNavigation } from "react-navigation";
import G from '../Gloabal';
import { ScrollView } from 'react-native-gesture-handler';

import { Get_Board } from '../Actions/getBoardAction';
import { connect } from 'react-redux'
import Spinner from '../Navigation/Spinner'

const window = Dimensions.get("window");
const images = [

    require('../Images/vectorArt.png'),
    require('../Images/board1.jpg'),
    require('../Images/board2.jpg'),]
class OnBoard extends Component {
    scrollX = new Animated.Value(0);

    constructor(props) {
        super(props);
        this.state = {
            indexActive: 0,
            pageNo: 0,
            dimensions: {
                window
            }
        };
    }

    handleScroll = (event) => {
        const positionX = event.nativeEvent.contentOffset.x;
        const positionY = event.nativeEvent.contentOffset.y;
        console.log(positionX + ' ' + positionY);
        this.setState({
            pageNo: Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
        })
        console.log('currentScreenIndex', Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width));

    };

    onDimensionsChange = ({ window }) => {
        this.setState({ dimensions: { window } });
    };

    async componentDidMount() {
        Dimensions.addEventListener("change", this.onDimensionsChange);
        await this.props.Get_Board()
        console.log(JSON.stringify(this.props.onBoard));
    }

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.onDimensionsChange);
    }

    render() {
        const windowWidth = this.state.dimensions.window.width;

        return (

            <View style={styles.containerOnBoard}>
                <ScrollView
                    showsHorizontalScrollIndicator={false
                    }>
                    <View style={{ flexDirection: 'row-reverse' }}>
                        <Image source={require('../Images/logo.png')}
                            style={styles.logoSize}
                        />
                    </View>

                    <View>
                        <Text style={styles.header}>
                            {this.props.onBoard!='' ?
                                this.props.onBoard[this.state.pageNo].titleAr
                                : ''}
                        </Text>
                        <Text style={[styles.txt, {
                            width: '80%', marginLeft: 'auto', height: 100
                        }]}>
                            {this.props.onBoard!='' ?
                                this.props.onBoard[this.state.pageNo].descriptionAr : ''}</Text>
                    </View>
                    {/*****slider */}
                    {
                        this.props.loading
                            ?
                            <View style={{ height: 350 }} >
                                <Spinner />
                            </View>

                            :
                            <View style={styles.scrollContainer}>
                                <ScrollView
                                    horizontal={true}
                                    style={styles.scrollViewStyle}
                                    pagingEnabled
                                    showsHorizontalScrollIndicator={false}
                                    onScroll={Animated.event([{
                                        nativeEvent: {
                                            contentOffset: {
                                                x: this.scrollX
                                            }
                                        }
                                    }], { listener: (event) => this.handleScroll(event) })}



                                    scrollEventThrottle={1}
                                >
                                    {this.props.onBoard.map((image, imageIndex) => {
                                        return (
                                            <View
                                                style={{
                                                    width: windowWidth,
                                                    height: 250
                                                }}
                                                key={imageIndex}
                                            >
                                                <ImageBackground
                                                    resizeMode={'contain'}
                                                    source={{ uri: image.imageAR }}
                                                    style={styles.card}
                                                >
                                                </ImageBackground>
                                            </View>
                                        );
                                    })}
                                </ScrollView>
                                <View style={styles.indicatorContainer}>
                                    {this.props.onBoard.map((image, imageIndex) => {
                                        const width = this.scrollX.interpolate({
                                            inputRange: [
                                                windowWidth * (imageIndex - 1),
                                                windowWidth * imageIndex,
                                                windowWidth * (imageIndex + 1)
                                            ],
                                            outputRange: [8, 16, 8],
                                            extrapolate: "clamp"
                                        });
                                        return (
                                            <Animated.View
                                                key={imageIndex}
                                                style={[styles.normalDot, { width }]}
                                            />
                                        );
                                    })}
                                </View>
                            </View>
                    }
                    {/*********slider */}
                    <View style={styles.slider}>
                        <View style={styles.Button} onStartShouldSetResponder={() => {
                            this.props.navigation.navigate('LoginScreen')
                            //this.props.navigation.replace('VerificationScreen', { 'flag': 'signUp' })

                        }}>
                            <Text style={[styles.normalTxt, styles.specificMargin]}>{G.LOGIN}</Text>
                        </View>
                        <View
                            style={[styles.Button, styles.specificColor]}
                            onStartShouldSetResponder={() => {
                                this.props.navigation.navigate('PatientCodeScreen')
                            }}
                        >
                            <Text style={[styles.normalTxt, styles.specificMargin]}>{G.SIGNUP}</Text>
                        </View>
                    </View>

                    <Text
                        onPress={() => {
                            this.props.navigation.navigate('PatientCodeScreen')
                        }}
                        style={[styles.normalTxt, styles.questionCode]}>
                        {G.QUESTION_CODE}
                    </Text>

                </ScrollView>
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.onBoard.loading,
        onBoard: state.onBoard.onBoard,
    }
}

export default connect(mapStateToProps, { Get_Board })(withNavigation(OnBoard));
