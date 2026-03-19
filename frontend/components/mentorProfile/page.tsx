import React from 'react';
import styles from './page.module.css';

export default function MentorProfile() {
  const students = Array(8).fill({
    name: 'Алексей Федоров',
    course: 'Python Про',
    progress: 68,
    status: 'активен'
  });

  return (
    <div className={styles.container}>
      <main className={styles.content}>

        {/* ВЕРХНЯЯ ПАНЕЛЬ: Заголовок и поиск */}
        <header className={styles.header}>
          <div className={styles.titleInfo}>
            <h1>Личный кабинет Наставника</h1>
            <p>Приветствуем, Алексей Смирнов!</p>
          </div>
          <div className={styles.searchBox}>
            <input type="text" placeholder="Поиск ученика..." className={styles.searchInput} />
          </div>
        </header>

        {/* ОСНОВНАЯ СЕТКА ПО ТВОЕМУ ЧЕРТЕЖУ */}
        <div className={styles.mainGrid}>

          {/* ЛЕВАЯ КОЛОНКА (Количество и Рейтинг) */}
          <aside className={styles.leftCol}>
            <div className={`${styles.card} ${styles.statCard}`}>
              <h3>Количество учеников</h3>
              <div className={styles.bigNumber}>24</div>
            </div>

            <div className={`${styles.card} ${styles.ratingCard}`}>
              <h3>Рейтинг</h3>
              <div className={styles.ratingList}>
                {[1, 2, 3, 4, 5].map((pos) => (
                  <div key={pos} className={styles.ratingItem}>
                    <span>{pos}. Елена Петрова</span>
                    <span className={styles.score}>4.9</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* ПРАВАЯ КОЛОНКА (Профили учеников) */}
          <section className={styles.rightCol}>
            <div className={`${styles.card} ${styles.profilesCard}`}>
              <h3>Профили учеников</h3>
              <div className={styles.studentsGrid}>
                {students.map((s, i) => (
                  <div key={i} className={styles.studentSmallCard}>
                    <div className={styles.studentInfo}>
                      <div className={styles.avatarMini} />
                      <div>
                        <h4>{s.name}</h4>
                        <span>{s.course}</span>
                      </div>
                    </div>
                    <div className={styles.progressBar}>
                      <div className={styles.progressFill} style={{width: `${s.progress}%`}} />
                    </div>
                    <button className={styles.actionBtn}>Связаться</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}