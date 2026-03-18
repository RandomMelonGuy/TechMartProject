"use client"
import Image from 'next/image';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import useAuth from '@/modules/auth/service';
import { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  
  // Получаем всё необходимое из хука авторизации
  const { auth, loading, errors, serverError } = useAuth();
  
  const onSubmit = async () => {
      const data = {
        username: username,
        password: password,
      };

      const res = await auth(data);
      
      if (res.status === "success") {
          router.push("/profile/me");
          return;
      }
  };

  const defineServerError = (err: string): string => {
    if (err.includes("No row") || err.includes("No users")) return "Пользователь не найден"
  }

  return (
    <div className={styles.container} suppressHydrationWarning>
      <main className={styles.content}>

        {/* Хедер */}
        <div className={styles.header}>
          <button className={styles.backButton} aria-label="Назад" onClick={() => router.back()}>
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

        {/* Карточка ошибки сервера */}
        {serverError && (
          <div className={styles.errorCardEmbedded} style={{ float: 'none', margin: '0 0 20px 0', maxWidth: '100%' }}>
            <p style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600' }}>
              {defineServerError(serverError)}
            </p>
          </div>
        )}

        <div className={styles.form}>
          <h1 className={styles.title} style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>Вход</h1>

          {/* Поле Имя пользователя */}
          <div className={styles.inputCard} style={errors.username ? { borderColor: '#ef4444' } : {}}>
            <input
              type="text"
              placeholder="Имя пользователя"
              className={styles.inputField}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </div>
          {errors.username && (
            <span className={styles.errorText} style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginBottom: '10px', paddingLeft: '20px' }}>
              {errors.username}
            </span>
          )}

          {/* Поле Пароль */}
          <div className={styles.inputCard} style={errors.password ? { borderColor: '#ef4444' } : {}}>
            <input
              type="password"
              placeholder="Пароль"
              className={styles.inputField}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {errors.password && (
            <span className={styles.errorText} style={{ color: '#ef4444', fontSize: '12px', display: 'block', marginBottom: '10px', paddingLeft: '20px' }}>
              {errors.password}
            </span>
          )}

          {/* Кнопка входа */}
          <button 
            onClick={onSubmit} 
            disabled={loading}
            className={`${styles.menuButton} ${styles.nextButton}`}
            type="button"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </div>

        <button className={styles.forgotPass} onClick={() => router.push('/recovery')}>
          Забыли пароль?
        </button>
      </main>
    </div>
  );
}