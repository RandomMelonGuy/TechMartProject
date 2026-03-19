import React from 'react';
import styles from './page.module.css';
import UserGraph from '../components/Graph/UserGraph';

export default function MentorCabinet() {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <header className={styles.header}>
          <div className={styles.titleGroup}>
            <h1>Личный кабинет Наставника</h1>
            <p>Проект СтарПроф</p>
          </div>
        </header>

        <section style={{ marginBottom: '2.5rem' }}>
          <div className={styles.glassCard} style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontWeight: 300, letterSpacing: '1px' }}>
              КАРТА ПРОЕКТНЫХ СВЯЗЕЙ
            </h3>
            <UserGraph userId={1} />
          </div>
        </section>

        <div className={styles.mainGrid}>
            {/* Твои блоки с учениками и статистикой */}
        </div>
      </main>
    </div>
  );
}