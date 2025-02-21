import { useState, useEffect } from "react";
import * as SecureStorage from 'expo-secure-store';
import api from "@/api/api";
import axios from "axios";

interface WalletResponse {
  success: boolean
  amount?: number,
  message?: string
}

export const useWallet = () => {
        const [loading, setLoading] = useState(false);
        const [amount, setAmount] = useState(0);
        const [error, setError] = useState("")
        useEffect(() => {
            setLoading(true);
            const handleSession = async() => {
                try {
                    setLoading(true);
                    const session = await SecureStorage.getItemAsync('session');
                    if(!session){
                        setLoading(false)
                        return
                    }
                    const response = await api.get<WalletResponse>('/api/wallet/fetchWallet');
                    const data:WalletResponse = response.data
                    if(data.success){
                        setAmount(data.amount ?? 0);
                    }
                } catch (error) {
                    if(axios.isAxiosError(error) && error.response){
                        setError(error.response.data.message)
                    }
                    setError("Something went wrong")
                }
                finally{
                    setLoading(false)
                }
            }
            handleSession();
        }, []);
        return {amount, loading, error};
}