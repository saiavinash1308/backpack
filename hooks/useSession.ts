import { useEffect, useState } from "react"
import * as SecureStorage from 'expo-secure-store';

export const useSession = () => {
    const [session, setSession] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if(session) return;
        setLoading(true);
        const handleSession = async() => {
            const session = await SecureStorage.getItemAsync('session');
            setLoading(false);
            setSession(session);
        }
        handleSession();
    }, [session]);
    return {session, loading};
}