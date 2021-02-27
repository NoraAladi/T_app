import React, { Component } from 'react';
import { View, Text, ImageBackground, Image, Dimensions, Animated } from 'react-native';
import styles from './style';
import { withNavigation } from "react-navigation";
import G from '../Gloabal';
import { ScrollView } from 'react-native-gesture-handler';

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

            dimensions: {
                window
            }
        };
    }

    onDimensionsChange = ({ window }) => {
        this.setState({ dimensions: { window } });
    };

    componentDidMount() {
        Dimensions.addEventListener("change", this.onDimensionsChange);
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
                        <Text style={styles.header}>{G.ONBOARD_P1}</Text>
                        <Text style={styles.txt}>{G.ONBOARD_P2}</Text>
                    </View>
                    {/*****slider */}
                    <View style={styles.scrollContainer}>
                        <ScrollView
                            horizontal={true}
                            style={styles.scrollViewStyle}
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event([
                                {
                                    nativeEvent: {
                                        contentOffset: {
                                            x: this.scrollX
                                        }
                                    }
                                }
                            ])}
                            scrollEventThrottle={1}
                        >
                            {images.map((image, imageIndex) => {
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
                                            source={image} style={styles.card}
                                        >
                                        </ImageBackground>
                                    </View>
                                );
                            })}
                        </ScrollView>
                        <View style={styles.indicatorContainer}>
                            {images.map((image, imageIndex) => {
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

                    {/*********slider */}
                    <View style={styles.slider}>
                        <View style={styles.Button} onStartShouldSetResponder={() => {
                            this.props.navigation.navigate('LoginScreen')
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

export default withNavigation(OnBoard)