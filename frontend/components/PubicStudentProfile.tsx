'use client';
import { useState, useEffect } from 'react';
import request from '@/core/api';
import styles from './studentProfile/public.module.css';

export default function PublicStudentProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      // Загружаем публичные данные
      const [profileRes, achRes, mentorsRes, statsRes] = await Promise.all([
        request(`/profile/get/${userId}`, 'get'),
        request(`/achivement/get/${userId}`, 'get'),
        request('/relationships/get_users', 'post', { id: userId }),
        request(`/gamification/stats/${userId}`, 'get')
      ]);

      if (profileRes.status === 'success') setProfile(profileRes.data);
      if (achRes.status === 'success') {
        // Фильтруем только подтверждённые достижения для публичного профиля
        const publicAch = achRes.data.filter(ach => ach.status === 1);
        setAchievements(publicAch);
      }
      if (mentorsRes.status === 'success') setMentors(mentorsRes.data);
      if (statsRes.status === 'success') setStats(statsRes.data);
      
      setLoading(false);
    }
    
    fetchData();
  }, [userId]);


  return (
    <div className={styles.container}>
      {/* Шапка профиля */}
      <div className={styles.header}>
        <div className={styles.avatar}>👤</div>
        <div className={styles.info}>
          <h1>{profile?.username}</h1>
          <p className={styles.role}>Ученик</p>
        </div>
      </div>

      {/* Статистика */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats?.total_xp || 0}</span>
          <span className={styles.statLabel}>Всего опыта</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{stats?.level || 1}</span>
          <span className={styles.statLabel}>Уровень</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{achievements.length}</span>
          <span className={styles.statLabel}>Достижений</span>
        </div>
      </div>

      {/* Достижения (только подтверждённые) */}
      <section className={styles.section}>
        <h2>Достижения</h2>
        <div className={styles.achievementsGrid}>
          {achievements?.map(ach => (
            <div key={ach.id} className={styles.achievementCard}>
              <div className={styles.achievementIcon}>🏆</div>
              <div className={styles.achievementInfo}>
                <h3>{ach.name}</h3>
                <p className={styles.achievementOrg}>{ach.org}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Наставники */}
      <section className={styles.section}>
        <h2>Наставники</h2>
        <div className={styles.mentorsList}>
          {mentors?.map(mentor => (
            <div key={mentor.id} className={styles.mentorCard}>
              <div className={styles.mentorAvatar}>👨‍🏫</div>
              <div className={styles.mentorInfo}>
                <h4>{mentor.username}</h4>
                <p>Наставник</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}