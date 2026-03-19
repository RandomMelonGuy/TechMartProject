'use client';
import { useState, useEffect } from 'react';
import request from '@/core/api';
import styles from './mentorProfile/public.module.css';

export default function PublicMentorProfile({ userId }) {
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      
      const [profileRes, studentsRes] = await Promise.all([
        request(`/profile/get/${userId}`, 'get'),
        request('/relationships/get_mentors', 'post', { id: userId })
      ]);

      if (profileRes.status === 'success') setProfile(profileRes.data);
      if (studentsRes.status === 'success') setStudents(studentsRes.data);
      
      setLoading(false);
    }
    
    fetchData();
  }, [userId]);

  return (
    <div className={styles.container}>
      {/* Шапка профиля */}
      <div className={styles.header}>
        <div className={styles.avatar}>👨‍🏫</div>
        <div className={styles.info}>
          <h1>{profile?.username}</h1>
          <p className={styles.role}>Наставник</p>
        </div>
      </div>

      {/* Статистика */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{students.length ? students.length : 0}</span>
          <span className={styles.statLabel}>Учеников</span>
        </div>
      </div>

      {/* Ученики наставника */}
      <section className={styles.section}>
        <h2>Ученики</h2>
        <div className={styles.studentsGrid}>
          {students.map(student => (
            <div key={student.id} className={styles.studentCard}>
              <div className={styles.studentAvatar}>👤</div>
              <div className={styles.studentInfo}>
                <h4>{student.username}</h4>
                <p>Ученик</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}