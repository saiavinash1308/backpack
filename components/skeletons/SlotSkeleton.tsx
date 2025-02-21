import type React from "react"
import { useEffect, useRef } from "react"
import { View, Animated } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

// Define the props for our SkeletonLoader componen

const StyledLinearGradient = LinearGradient
export default function SlotSkeleton({main}: {main?: boolean}){
  // Create a reference for the animation
  const animatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Create the shimmer animation
    const shimmer = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false, // We can't use native driver with backgroundColor interpolation
      }),
    )

    // Start the animation
    shimmer.start()

    // Clean up the animation when the component unmounts
    return () => shimmer.stop()
  }, [animatedValue])

  // Interpolate the animated value to create the shimmer effect
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["-100%", "100%"],
  })

  return (
    <View className={`overflow-hidden h-20`} style = {{boxShadow: "0px 3px 2px rgba(0, 0, 0, 0.35)", borderRadius: 12}}>
      <StyledLinearGradient
        colors={[`${main ? "black" : "#57575766"}`, `${main ? "black" : "#57575766"}`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="absolute top-0 bottom-0 left-0 right-0"
      />
      <Animated.View
        className="absolute top-0 bottom-0 left-0 right-0"
        style={{
          transform: [{ translateX }],
        }}
      >
        <StyledLinearGradient
          colors={["transparent", "rgba(255, 255, 255, 0.1)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="w-full h-full"
        />
      </Animated.View>
    </View>
  )
}


