import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type texinputprops = {
  value: string;
  placeholder?: string;
  placeholderTextColor: string;
  passwordInput: string;
  onPress?: GestureResponderEvent;
  onChangeText: string;
  keyboardType: string;
  secureTextEntry: boolean;
  eyeIcon: boolean;
};

export default function TLPTextInput(textInputProps) {
  const {
    value = textInputProps.value,
    placeholder = textInputProps.placeholder,
    placeholderTextColor = textInputProps.placeholderTextColor || '#AFAFA',
    passwordInput = textInputProps.passwordInput,
    onPress = textInputProps.onPress,
    onChangeText = textInputProps.onChangeText,
    keyboardType = textInputProps.keyboardType || 'default',
    secureTextEntry = textInputProps.secureTextEntry,
    eyeIcon = textInputProps.eyeIcon,
  } = textInputProps;

  const [focus, setFocus] = useState<boolean>(false);
  const [filled, setFilled] = useState<boolean>(false);

  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={styles.textInput}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
        value={value}
        onBlur={() => setFocus(false)}
        onChangeText={text => onChangeText(text)}
        onFocus={() => setFocus(true)}
      />
      <View style={styles.textContainer} pointerEvents="none">
        <Text style={[styles.placeholderText, placeholderTextColor]}>
          {placeholder}
        </Text>
      </View>
      <View>
        <Icon
          name={eyeIcon ? 'eye' : 'eye-off'}
          style={styles.eyeIcon}
          size={25}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  textContainer: {
    position: 'absolute',
    left: 10,
  },
  textInput: {
    fontSize: 20,
  },
  placeholderText: {
    fontSize: 10,
    weight: 400,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
  },
});
