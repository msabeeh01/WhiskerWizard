//create auth context
import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/dist/client/router";

type AuthContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    //get user via supabase auth and onAuthStateChange
    useEffect(() => {
        checkAuthState();
    }, [])

    const checkAuthState = async () => {
        const {data: authListener} = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if(session) {
                    setUser(session.user)
                    setLoading(false)
                } else {
                    setUser(null)
                    setLoading(false)
                    router.push('/login')
                }
            }
        )
    }

    //logout user
    const login= async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        else{
            router.push('/');
        }
    }

    const logout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    const value = { user, setUser, loading, setLoading, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

