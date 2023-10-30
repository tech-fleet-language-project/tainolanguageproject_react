import {useMemo} from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {default as Colors} from '../constants/Colors';

// materialUI
// https://reactnative.dev/docs/accessibility#accessibility-actions
// use Themed.tsx and StyledText.tsx text: if it will be the same throughout the program or override properties

type buttonprops = {
  title: string;
  titleColor?: string;
  titleSize: number;
  backgroundColor?: string;
  width?: number;
  accessibilityLabel: string;
};

// onPress default should route to error message or default action?

// const buttonProps: buttonprops = {
//     title: '',
//     titleColor: '',
//     titleSize: 0,
//     backgroundColor: '',
//     width:'',
//     accessibilityLabel: '',
//     onPress: {},
// };

export default function StyledButton(
  buttonProps: buttonprops,
  onPress: ((event: GestureResponderEvent) => void) | null | undefined,
  icon: any,
) {
  const {
    title = buttonProps.title,
    titleColor = buttonProps.titleColor,
    titleSize = buttonProps.titleSize,
    backgroundColor = buttonProps.backgroundColor,
    width = buttonProps.width,
    accessibilityLabel = buttonProps.accessibilityLabel,
  } = buttonProps;

  // const props = useMemo((buttonProps: buttonprops) => { return { title: buttonProps.title,
  //     titleColor: buttonProps.titleColor,
  //     titleSize: buttonProps.titleSize,
  //     backgroundColor: buttonProps.backgroundColor,
  //     width: buttonProps.width,
  //     accessibilityLabel: buttonProps.accessibilityLabel,
  //     onPress: buttonProps.onPress }; });

  return (
    <Pressable
      onPress={onPress}
      style={[styles.buttonContainer, {backgroundColor, width}]}>
      <TouchableOpacity>
        {icon ? (
          <Icon.Button
            name={icon}
            onPress={onPress}
            style={styles.buttonIcon}
          />
        ) : null}
        <Text
          style={[styles.buttonText, {color: titleColor, fontSize: titleSize}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Pressable>
  );
}

{
  /* <Button title={title} color={backgroundColor}  /> */
}
// change based on style guide
StyledButton.defaultProps = {
  title: 'Button',
  titleColor: '#ffffff',
  titleSize: 14,
  backgroundColor: '#000000',
  width: 100,
  accessibilityLabel: 'button',
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    borderRadius: 4,
    justifyContent: 'center',
    minHeight: 42,
    padding: 12,
  },
  buttonIcon: {
    padding: 8,
  },
  buttonText: {
    fontWeight: '500',
  },
});

// buttonContainer: {
//     elevation: 8,
//     borderRadius: 10,
//     paddingVertical: 10,
//     paddingHorizontal: 12
//   },
//   buttonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//     alignSelf: "center",
//     textTransform: "uppercase"
//   }
