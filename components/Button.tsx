import { useMemo } from 'react';
import { Pressable, Text, StyleSheet, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { default as Colors}  from '../constants/Colors';

// materialUI
// https://reactnative.dev/docs/accessibility#accessibility-actions

type buttonprops = {
    title: string,
    titleColor?: string,
    titleSize: number,
    backgroundColor?: string,
    width?: number,
    accessibilityLabel: string,
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




export default function StyledButton(buttonProps: buttonprops, onPress, icon) {

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

    return(
        <Pressable onPress={onPress} 
                   style={ [styles.buttonContainer, 
                           {backgroundColor: backgroundColor, width: width}] 
                         }                
        > 
            <TouchableOpacity>
                {icon ? <Icon.Button name={icon}
                                    onPress={onPress}
                                    style={styles.buttonIcon}></Icon.Button> : null}
                <Text style={ [styles.buttonText, 
                              {color: titleColor, 
                              fontSize: titleSize}] 
                              }
                >{title}
                </Text>
            </TouchableOpacity>
        </Pressable>
        

    );
};

{/* <Button title={title} color={backgroundColor}  /> */}
// change based on style guide
StyledButton.defaultProps  = {
    title: 'Button',
    titleColor: '#ffffff',
    titleSize: 14,
    backgroundColor: '#000000',
    width: 100,
    accessibilityLabel: 'button',   
};

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
    buttonIcon: {
        padding: 8,
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
