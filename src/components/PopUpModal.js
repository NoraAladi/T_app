import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { Colors, Fonts, Pixel } from '../constants/styleConstants';

class PopUpModal extends Component {
  state = {
    modalVisible: this.props.modalVisible
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
            this.props.closeModal()
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.props.title}</Text>
              <View style={{
                flexDirection: 'row', width: '70%', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <Pressable
                  style={[styles.button, styles.buttonSubmit]}
                  onPress={() => {
                    this.props.submitAction()
                  }}
                >
                  <Text style={styles.textStyle}>{this.props.yes}</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    this.setModalVisible(!modalVisible)
                    this.props.closeModal()
                  }}
                >
                  <Text style={styles.textStyle}>{this.props.no}</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: '80%',
    paddingTop: 35,
    paddingBottom: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 7,
    padding: 10,
    elevation: 2,
    width: '35%'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonSubmit: {
    backgroundColor: Colors.colorSacand,
  },
  buttonClose: {
    backgroundColor: Colors.minColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 30,
    textAlign: "center",
    fontFamily: Fonts.bold,
    fontSize: 18
  }
});

export default PopUpModal;