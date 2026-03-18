"use client"
import Image from 'next/image';
import styles from './page.module.css';
import {useState} from "react";
import {Roles} from "@/core/types"
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();  
  return (
    <div className={styles.container}>
      <main className={styles.content}>

        <button className={styles.backButton} onClick={router.back}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.logoWrapper}>
          <Image
            src="/logo.png"
            alt="Логотип"
            style={{marginTop: -80}}
            width={170}
            height={170}
            priority
          />
        </div>

        <h1 className={styles.title}>Регистрация</h1>

        
        <div className={styles.buttonContainer}>
          <Link href={{pathname: "/register", query: {role: "user"}}}>
          <button className={styles.card}>
            <div className={styles.iconCircle}>
              {/* Проверьте расширение: если файл .jpg, замените .png на .jpg */}
              <img src="/student-icon.png" alt="Ученик" />
            </div>
            <span className={styles.cardText}>Ученик</span>
          </button>
          </Link>
          <Link href={{pathname: "/register", query: {role: "mentor"}}}>
            <button className={styles.card}>
              <div className={styles.iconCircle}>
                <img src="/mentor-icon.png" alt="Наставник" />
              </div>
              <span className={styles.cardText}>Наставник</span>
            </button>
          </Link>
        </div>
        { /*<button className={styles.btn}>Далее</button> */ }
        <span style={{marginTop: 10}}>Есть аккаунт? <a href="/login">Войти</a></span>
      </main>
    </div>
  );
}