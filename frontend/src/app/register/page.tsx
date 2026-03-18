"use client"
import Image from 'next/image';
import styles from './page.module.css';
import {APIResponce, Roles} from "@/core/types";
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import useRegister from '@/modules/register/service';
import useAuth from '@/modules/auth/service';
import {useState} from "react";

export default function RegisterPage() {
  const role = useSearchParams().get("role") as Roles;
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  
  // Извлекаем ошибки из хука
  const {register, serverError, errors, loading} = useRegister();
  const {auth} = useAuth();
  
  const onSubmit = async() => {
      if (!role){
        router.back();
        return;
      }
      const data = {
        username: username,
        password: password,
        role: role
      }
      
      const res = await register(data);
      
      if (res.status === "success"){
        const authData = {username: username, password: password}
        const authRes = await auth(authData); // исправлено использование результата auth
        
        if (authRes.status === "success"){
          router.push("/profile/me");
          return;
        }
        console.log(authRes);
        return
      }
  }

  return (
    <div className={styles.container} suppressHydrationWarning>
      <main className={styles.content}>

        {/* Хедер */}
        <div className={styles.header}>
          <button className={styles.backButton} aria-label="Назад" onClick={router.back}>
             <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>

          <div className={styles.logoWrapper}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={90}
              height={90}
              priority
            />
          </div>
          <div style={{ width: 28 }} />
        </div>

        {/* Общая ошибка сервера (маленькая карточка сверху или снизу) */}
        {serverError && (
          <div className={styles.errorCardEmbedded} style={{ float: 'none', margin: '0 0 20px 0', maxWidth: '100%' }}>
            <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600' }}>
              {serverError.includes("UNIQUE") ? "Имя пользователя уже занято" : "Ошибка подключения"}
            </p>
          </div>
        )}

        <div className={styles.form}>
          {/* Поле Имя пользователя */}
          <div className={styles.inputCard} style={errors.username ? { borderColor: '#ef4444' } : {}}>
            <input
              type="text"
              placeholder="Имя пользователя"
              className={styles.inputField}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          {errors.username && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px', display: 'block', paddingLeft: '20px' }}>{errors.username}</span>}

          {/* Поле Пароль */}
          <div className={styles.inputCard} style={errors.password ? { borderColor: '#ef4444' } : {}}>
            <input
              type="password"
              placeholder="Пароль"
              className={styles.inputField}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {errors.password && <span style={{ color: '#ef4444', fontSize: '12px', marginTop: '-10px', marginBottom: '10px', display: 'block', paddingLeft: '20px' }}>{errors.password}</span>}

          {/* Кнопка с индикацией загрузки */}
          <button 
            onClick={onSubmit} 
            disabled={loading}
            className={`${styles.menuButton} ${styles.nextButton}`}
            type="button"
          >
            {loading ? "Загрузка..." : "Дальше"}
          </button>
        </div>

        <button className={styles.forgotPass}>Забыли пароль?</button>
      </main>
    </div>
  );
}