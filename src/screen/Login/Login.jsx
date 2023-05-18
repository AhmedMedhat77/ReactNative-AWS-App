import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  TextInput,
} from "react-native";
import { globalStyles } from "../../Global/GlobalStyles";

import Svg, { Image } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
const Login = () => {
  const [formState, setFormState] = React.useState({
    isRegester: false,
  });
  const imagePosition = useSharedValue(1);
  const imageAnimatedStyles = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });
  const buttonAnimatedStyles = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });
  const closeButtonAnimatedStyles = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, {
        duration: 1000,
      }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyles = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const loginHandler = () => {
    imagePosition.value = 0;
  };
  const RegesterHandler = () => {
    imagePosition.value = 0;
  };

  return (
    <View style={globalStyles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyles]}>
        <Svg width={width} height={height + 100}>
          <Image
            href={require("../../../assets/images/blob.jpg")}
            width={width + 100}
            height={height + 100}
            preserveAspectRatio="xMidyMid slice"
            clipPath="url(#clippathId)"
          />
        </Svg>
        <Animated.View
          style={[styles.colseButtonContainer, closeButtonAnimatedStyles]}
        >
          <Text onPress={() => (imagePosition.value = 1)}>X</Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.bottomContainer}>
        <Animated.View style={buttonAnimatedStyles}>
          <Pressable style={styles.Button} onPress={loginHandler}>
            <Text style={styles.btnText}>Login</Text>
          </Pressable>
          <Pressable
            style={styles.Button}
            onPress={() => {
              setFormState((old) => {
                return { ...old, isRegester: true };
              });
              RegesterHandler();
            }}
          >
            <Text style={styles.btnText}>Regester</Text>
          </Pressable>
        </Animated.View>
        <Animated.View style={[styles.formInputContainer, formAnimatedStyles]}>
          {formState.isRegester && (
            <TextInput
              placeholder="Email"
              style={styles.TextInput}
              placeholderTextColor={"#000"}
            />
          )}
          <TextInput
            placeholder="UserName"
            style={styles.TextInput}
            placeholderTextColor={"#000"}
          />
          <TextInput
            placeholder="Password"
            style={styles.TextInput}
            placeholderTextColor={"#000"}
          />
          <View style={styles.formButton}>
            <Text style={styles.btnText}>
              {formState.isRegester ? "Regester" : "Login"}
            </Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Button: {
    backgroundColor: "rgba(123,104,238,0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  btnText: {
    fontSize: 20,
    fontWeight: 600,
    color: "#fff",
    letterSpacing: 0.5,
  },
  bottomContainer: {
    height: height / 3,
  },
  TextInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.8)",
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    backgroundColor:'#eee'
  },
  formButton: {
    backgroundColor: "rgba(123,104,238,0.8)",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    marginBottom: 70,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: "center",
  },
  colseButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#fff",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    top: -20,
  },
});

export default Login;
