import React, { FC } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { commonStyles } from '../../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import { showMessage } from 'react-native-flash-message';

interface ISettingsItem {
  title: string;
  btnTitle: string;
  btnAction: string;
  isLogin: boolean;
}

const SettingsItem: FC<ISettingsItem> = ({
  title,
  btnTitle,
  btnAction,
  isLogin,
}) => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.settingsItemContainer}>
      <Text style={styles.settingsItemText}>{title}</Text>
      <TouchableOpacity
        style={styles.settingsItemBtn}
        onPress={() => {
          isLogin ? navigate(btnAction) : showMessage({
            message: ('First login ..'),
            duration: 5000,
            type: 'warning',
          });
        }}>
        <Text style={styles.settingsBtnText}>{btnTitle}</Text>
      </TouchableOpacity>
    </View >
  );
};

const styles = StyleSheet.create({
  settingsItemContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
    marginBottom: Pixel(45),
    alignItems: 'center',
  },
  settingsItemText: {
    fontFamily: Fonts.bold,
    color: Colors.dark,
    fontSize: Pixel(35),
  },
  settingsItemBtn: {
    paddingVertical: Pixel(17),
    paddingHorizontal: Pixel(28),
    backgroundColor: Colors.minColor,
    borderRadius: Pixel(35),
    ...commonStyles.boxShadow,
  },
  settingsBtnText: {
    fontFamily: Fonts.regular,
    color: Colors.dark,
    fontSize: Pixel(23),
  },
});

export default SettingsItem;
