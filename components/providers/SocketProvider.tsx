import { createContext, useEffect, useRef, useState } from "react";
import { Socket, io } from 'socket.io-client'
import * as SecureStorage from 'expo-secure-store'


export const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const ioRef = useRef<Socket | null>(null);
    useEffect(() => {

        async function connectToSocket(){
            if(socket) return;
            const session = await SecureStorage.getItemAsync('session');
            if(!session){
                console.log("Session not found")
                return
            }
            const _io = io(`${process.env.EXPO_PUBLIC_WS_URL}`, {
                auth: { session}
            });

            ioRef.current = _io;
            setSocket(_io);
        }

        connectToSocket()
        return () => {
            ioRef.current?.disconnect();
            setSocket(null);
        }
    }, [])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};