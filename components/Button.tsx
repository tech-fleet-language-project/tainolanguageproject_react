import { useMemo } from 'react';
import { Pressable, Text, StyleSheet} from 'react-native';
import { default as Colors}  from '../constants/Colors';


// https://reactnative.dev/docs/accessibility#accessibility-actions

type buttonprops = {
    title: string,
    titleColor: string,
    titleSize: number,
    backgroundColor: string | null | undefined,
    width: string | null | undefined,
    accessibilityLabel: string,
    onPressFunction: Function,
} & typeof defaultProps;


const defaultProps = {
    title: 'Button',
    titleColor: '#ffffff',
    titleSize: 14,
    backgroundColor: '#000000',
    width: '100%',
    accessibilityLabel: 'button',   
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




export default function Button(buttonProps: buttonprops) {

    const {
        title = buttonProps.title,
        titleColor = buttonProps.titleColor,
        titleSize = buttonProps.titleSize,
        backgroundColor = buttonProps.backgroundColor,
        width = buttonProps.width,
        accessibilityLabel = buttonProps.accessibilityLabel,
        onPress = buttonProps.onPress,   
    } = buttonProps;

    // const props = useMemo((buttonProps: buttonprops) => { return { title: buttonProps.title,
    //     titleColor: buttonProps.titleColor,
    //     titleSize: buttonProps.titleSize,
    //     backgroundColor: buttonProps.backgroundColor,
    //     width: buttonProps.width,
    //     accessibilityLabel: buttonProps.accessibilityLabel,
    //     onPress: buttonProps.onPress }; });

    return(
        <Pressable 
            onPress={''} 
            style = { [styles.buttonContainer, {{opacity: pressed ? 0.5 : 1 },  backgroundColor: backgroundColor, width: width}] }
        > 
        <Text style={ [styles.buttonText, {color: titleColor, size: titleSize}] }>{title}</Text>
        </Pressable>

    );
};

<Button title={title} color={backgroundColor}  />
// change based on style guide
Button.defaultProps = defaultProps;



const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 42,
        borderRadius: 4,
        padding: 12,
    },
    buttonText: {
        fontWeight: '500',
    },

});