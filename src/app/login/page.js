"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useState } from 'react'


export default function SignupPage() {

/*

const logout = async () => {
    try {
        await axios.get('/api/users/logout');
        router.push('/login')
    } catch (error: any) {
        console.log(error.message)   
    }
}

*/


    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

      const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            router.push("/");
            
        } catch (error) {
            console.log("Login failed", error.message);
            
        }finally {
            setLoading(false);
        }
    }


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}>Login</button>
            
            <Link href="/signup">Visit signup page</Link>
        </div>
    )

}