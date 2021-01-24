import * as React from 'react';
import { StyleSheet, Text, View, Button,Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Verify from './verify';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Test() {
    const renderContent = () => (
        <View
            style={{
               backgroundColor:'white',
                padding: 16,
                height: windowHeight,
            }}
        >
            <Verify/>
        </View>
    );

    const sheetRef = React.useRef(null);

    return (
        <>
            <View>
                <View
                    style={{
                        backgroundColor: 'papayawhip',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                    }}
                >
                    <Button
                        title="Open Bottom Sheet"
                       onPress={() => sheetRef.current.snapTo(1)}
                    />
                </View>
                <BottomSheet
                   ref={sheetRef}
                    snapPoints={[400,600,400]}
                    borderRadius={10}
                    renderContent={renderContent}
                />

            </View>
        </>
    );
}