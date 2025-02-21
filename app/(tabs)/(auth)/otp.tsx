import { Link, router } from "expo-router"
import React, { useState, useRef, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from "react-native"
import * as SecureStorage from 'expo-secure-store'
import { resendOtp, verifyOtp } from "@/actions/auth/auth"

const OTP_LENGTH = 6
const RESEND_COOLDOWN = 60

export default function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [activeIndex, setActiveIndex] = useState(0)
  const [canResend, setCanResend] = useState(true)
  const [cooldownTime, setCooldownTime] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  const inputRefs = useRef<Array<TextInput | null>>(Array(OTP_LENGTH).fill(null))

  useEffect(() => {
    if (!canResend) {
      const timer = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer)
            setCanResend(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [canResend])

  useEffect(() => {
    if (otp.every((digit) => digit !== "") && otp.length === OTP_LENGTH) {
      verifyOTP()
    }
  }, [otp])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      if (value && index < OTP_LENGTH - 1) {
        setActiveIndex(index + 1)
        inputRefs.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace") {
      const newOtp = [...otp]
      if (newOtp[index]) {
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        newOtp[index - 1] = ''
        setOtp(newOtp)
        setActiveIndex(index - 1)
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleResend = async() => {
    try {
      if (canResend) {
          setOtp(Array(OTP_LENGTH).fill(''))
          setActiveIndex(0)
          inputRefs.current[0]?.focus()
          const mobile = await SecureStorage.getItemAsync("mobile");
          if(!mobile){
            console.log("Mobile number not found");
            return
          }
          await resendOtp(mobile);
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setCanResend(false)
      setCooldownTime(RESEND_COOLDOWN)
    }
  }

  const verifyOTP = async () => {
    const mobile = await SecureStorage.getItemAsync("mobile");
    if(!mobile){
      console.log("Mobile number not found");
    }
    setIsVerifying(true)
    try {
        const {success, message, authToken} = await verifyOtp(mobile!, otp.join(''))
        if(success){
          await SecureStorage.setItemAsync("session", authToken!);
          setOtp(Array(OTP_LENGTH).fill(''));
          setActiveIndex(0)
          inputRefs.current[0]?.focus()
          router.push("/")
        }
        else{
          setOtp(Array(OTP_LENGTH).fill(''))
          setActiveIndex(0)
          inputRefs.current[0]?.focus()
        }
    } 
    catch (error) {

      setOtp(Array(OTP_LENGTH).fill(''))
      setActiveIndex(0)
      inputRefs.current[0]?.focus()
    } finally {
      setIsVerifying(false)
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }




  return (
    <View className="flex py-10 px-4 justify-center items-center min-h-screen gap-10">
      <Text className="font-geist text-2xl mb-6">Enter OTP</Text>
      <View className="flex flex-row justify-between w-full mb-6">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            className={` border-[#d1d5db] border-2 rounded-xl text-lg px-4 py-3 shadow-black/50 font-geist w-[50px] text-center ${
              index === activeIndex ? "border-[#5a5c5d]" : ""
            }`}
            style = {{boxShadow: "rgba(0, 0, 0, 0.35)"}}
            value={digit}
            onChangeText={(text) => handleChange(index, text)}
            onKeyPress={(event) => handleKeyPress(index, event.nativeEvent.key)}
            onFocus={() => setActiveIndex(index)}
            autoFocus={index === 0}
            keyboardType="numeric"
            maxLength={1}
            cursorColor="#434242"
            editable={!isVerifying}
            selectTextOnFocus
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={handleResend}
        disabled={isVerifying || !canResend}
        style={{ transitionProperty: "all", transitionDuration: "300ms", transitionTimingFunction: "ease-in-out" }}
        className={`
          px-4 py-3 w-full rounded-xl
          ${(isVerifying || !canResend) ? "bg-[black] opacity-70" : "bg-black active:bg-[#222222]"}
        `}
      >
        <View className="flex flex-row items-center justify-center gap-4">
          {isVerifying && <ActivityIndicator color="#e0d9e6" />}
          <Text
            className={`
              font-geist text-lg
              ${isVerifying ? "text-[#e0d9e6]" : "text-white"}
            `}
          >
            {isVerifying ? "Verifying..." : (
              canResend ? <>RESEND OTP</> : (
                <>
                  Resend in {formatTime(cooldownTime)}
                </>
              )
            )}
          </Text>
        </View>
      </TouchableOpacity>
          <Link href={'/login'} className="text-blue-600 font-geist text-md underline">Back to Login</Link>
    </View>
  )
}