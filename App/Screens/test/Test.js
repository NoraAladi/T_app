import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import { withNavigation } from 'react-navigation';
import g from '../../Gloabal';

class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
    }
    sheetRef = React.createRef()

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Text>Your content</Text>
                <TouchableOpacity onPress={() => {
                    // this.sheetRef.current.togglePanel()
                    this.setState({
                        modal: !this.state.modal
                    })

                }}>
                    <Text>Toggle</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modal}
                >
                    <View
                        style={{
                            position: 'absolute',
                            width: g.windowWidth,
                            height: g.windowHeight,
                        }}>
                        <View style={{
                            backgroundColor: g.white, height: g.windowHeight - 250,
                            borderTopLeftRadius: 25,borderTopRightRadius: 25,
                            marginTop: g.windowHeight - (g.windowHeight - 250),
                        }}>
                            
                        </View>
                    </View>
                </Modal>

                <BottomSheet
                    isOpen={false}
                    ref={ref => this.sheetRef.current = ref}
                    sliderMinHeight={0}
                >
                    <View style={{ backgroundColor: 'red', height: 300 }}>
                        <ScrollView >
                            <TouchableOpacity onPress={() => alert('ss')}>
                                <Text>Toggle</Text>
                            </TouchableOpacity>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                            <Text>ssa</Text>
                        </ScrollView>

                    </View>

                </BottomSheet>
            </View>
        );
    }
}
export default withNavigation(Test);
