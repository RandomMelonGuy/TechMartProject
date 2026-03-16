"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import useRegister from "@/modules/register/service"
import useAuth from "@/modules/auth/service";


export default function Home() {
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, register] = useRegister();
  const [authLoading, auth] = useAuth();

  const clickHandler = async() => {
    const data = await register({password, username, email});
    if (data.status === "success"){
      console.log(data.data);
    }
    else{
      console.log(data.error)
    }
  }

  const clickHandler1 = async() => {
    const data = await auth({password, username});
    if (data.status === "success"){
      console.log(data.data);
    }
    else{
      console.log(data.error)
    }
  }

  return (
    <>
    <h1>Register</h1>
    <div>
      <input onChange={e => {setPassword(e.target.value)}} value={password} placeholder="pass" />
      <input onChange={e => {setUsername(e.target.value)}} value={username} placeholder="username" />
      <input onChange={e => {setEmail(e.target.value)}} value={email} placeholder="email" />
      <h2>{loading ? "LOADING" : ""}</h2>
      <button onClick={clickHandler}>SEND</button>
    </div>

    <h1>Auth</h1>
    <div>
      <input onChange={e => {setPassword(e.target.value)}} value={password} placeholder="pass" />
      <input onChange={e => {setUsername(e.target.value)}} value={username} placeholder="username" />
      <h2>{authLoading ? "LOADING" : ""}</h2>
      <button onClick={clickHandler1}>SEND</button>
    </div>
    </>
  )
}
