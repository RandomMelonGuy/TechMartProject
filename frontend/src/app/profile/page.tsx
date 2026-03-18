import Image from 'next/image';
import styles from './page.module.css';

export default function ProfilePage() {
  return (
    // suppressHydrationWarning по-прежнему нужен, если используешь Dark Reader
    <div className={styles.container} suppressHydrationWarning>
      <main className={styles.content}>

        {/* Хедер с логотипом слева */}
        <div className={styles.topHeader}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={60} // Чуть крупнее, чем на входе
            height={60}
            priority
          />
        </div>

        {/* Блок профиля */}
        <div className={styles.profileCard}>
          <div className={styles.avatarWrapper}>
            {/* Используем иконку ученика как аватар */}
            <img src="/student-icon.png" alt="Аватар" className={styles.avatar} />
          </div>
          <div className={styles.userInfo}>
            <h1 className={styles.userName}>Фамилия Имя</h1>
            <p className={styles.userRole}>Ученик</p>
          </div>
        </div>

        {/* Навигационное меню */}
        <nav className={styles.menuNavigation}>
          <button className={styles.menuButton}>
            Профиль
            <span className={styles.arrowIcon}>&gt;</span>
          </button>

          <button className={styles.menuButton}>
            Достижения
            <span className={styles.arrowIcon}>&gt;</span>
          </button>

          {/* Отдельная кнопка выхода */}
          <button className={`${styles.menuButton} ${styles.logoutButton}`}>
            Выйти
          </button>
        </nav>

      </main>
    </div>
  );
}