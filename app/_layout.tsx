import React from "react";
 // Assuming Toaster has a React Native version// Ensure this is compatible with React Native

import { useFonts } from "expo-font"; // Or use any font-loading library like react-native-global-fonts
import { Slot } from "expo-router";
import "../global.css"
import { SafeAreaView } from "react-native";
import Providers from "@/components/providers/Providers";

export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    Geist: require("../assets/fonts/Geist-Regular.ttf"),
    GeistBold: require("../assets/fonts/Geist-Bold.ttf"),
    GeistMedium: require("../assets/fonts/Geist-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null; // Or show a loading spinner
  }

  return (
      <Providers>
        <SafeAreaView className="bg-gray-100 min-h-screen">
            <Slot/>
        </SafeAreaView>
      </Providers>
  );
}