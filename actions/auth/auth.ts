import api from "@/api/api";
import { loginValidator, otpValidator, signupValidator } from "@/zod/userSchema";
import axios from "axios";
import { router } from "expo-router";
import * as SecureStorage from 'expo-secure-store'; 

interface AuthResponse {
    success: boolean,
    message: string
}

interface SessionResponse{
    success: boolean,
    message?: string,
    authToken?: string
}

export async function signUp(username:string, mobile: string): Promise<SessionResponse>{
    try {
        const validateSignup = signupValidator.safeParse({mobile, username})
        if(!validateSignup.success){
            return {success: false, message: validateSignup.error.errors[0].message} as AuthResponse
        }
        const response = await api.post("/api/auth/signup", {
            mobile, username
        });
        const data: AuthResponse = await response.data;
        return data
    } catch (error) {
        if(axios.isAxiosError(error) && error.response){
            return {success: false, message: error.response.data.message} as AuthResponse
        }
        return {success: false, message: "Something went wrong"} as AuthResponse
    }
}

export async function signIn(mobile: string): Promise<AuthResponse>{
    try {
        const validateLogin = loginValidator.safeParse({mobile});
        if(!validateLogin.success){
            return {success: false, message: validateLogin.error.errors[0].message} as AuthResponse
        }
        const response = await api.post("/api/auth/login", {
            mobile
        });
        const data: AuthResponse = await response.data;
        return data
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {success: false, message: error.response?.data.message} as AuthResponse
        }
        return {success: false, message: "Something went wrong"} as AuthResponse
    }
}

export async function verifyOtp(mobile: string, otp: string): Promise<SessionResponse>{
    try {
        const validateOtp = otpValidator.safeParse({mobile, otp});
        if(!validateOtp.success){
            return {success: false, message: validateOtp.error.errors[0].message} as SessionResponse
        }
        const response = await api.post("/api/auth/verifyotp", {
            mobile, otp
        });
        const data: SessionResponse = await response.data;
        return data
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {success: false, message: error.response?.data.message} as SessionResponse
        }
        return {success: false, message: "Something went wrong"} as SessionResponse
    }
}

export async function resendOtp(mobile: string){
    try {
        const validateLogin = loginValidator.safeParse({mobile});
        if(!validateLogin.success){
            return {success: false, message: validateLogin.error.errors[0].message} as AuthResponse
        }
        const response = await api.post("/api/auth/resendotp", {
            mobile
        });
        const data: AuthResponse = await response.data;
        return data
    } catch (error) {
        if(axios.isAxiosError(error)){
            return {success: false, message: error.response?.data.message} as AuthResponse
        }
        return {success: false, message: "Something went wrong"} as AuthResponse
    }
}

export async function logout(){
    try {
        SecureStorage.deleteItemAsync("session");
        router.push("/login")
    } catch (error) {
        console.log(error)
    }
}


