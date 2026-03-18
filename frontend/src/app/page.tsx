"use client"
import React from 'react';
import styles from './page.module.css';
import Link from 'next/link';
import starico from "./starico.png"

const SearchPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Эффекты свечения поверх текстуры */}
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />

      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <img src={starico.src} style={{maxWidth: 60, maxHeight: 60}}/>
          </div>
          <div className={styles.navRight}>
            <a className={styles.loginLink} href="/auth">Войти</a>
            <div className={styles.menuIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </div>
          </div>
        </nav>
      </header>
      <main>
        
        <h1>СтарПроф - </h1>
      <div className={styles.card}>
        {/* Искорки как на референсе */}
        <span className={styles.sparkle} style={{ top: '35px', left: '20px' }}>✦</span>
        <span className={styles.sparkle} style={{ bottom: '80px', right: '15px', opacity: 0.5 }}>✦</span>
        <span className={styles.sparkle} style={{ bottom: '25px', right: '60px', opacity: 0.3 }}>✦</span>

        <h1 className={styles.title}>
          Напишите ФИО, чтобы найти нужного вам человека
        </h1>

        <form onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputWrapper}>
            <input 
              type="text" 
              placeholder="ФИО" 
              className={styles.inputField} 
            />
          </div>
          <button type="submit" className={styles.submitBtn}>
            Продолжить
          </button>
        </form>
      </div>
      </main>
    </div>
  );
};

export default SearchPage;