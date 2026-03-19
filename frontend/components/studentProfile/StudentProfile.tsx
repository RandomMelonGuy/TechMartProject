"use client"
import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import useProfile from '@/modules/profile/service';
import { Profile } from '@/modules/profile/types';
import { APIResponce, Entity, User } from '@/core/types';
import request from '@/core/api';

type Achivement = {
  id: number,
  filepath: string | null,
  attached_to: number,
  name: string,
  desc: string,
  org: string,
  participants: Array<number>,
  status: 0 | 1 | 2, // 0 - pending | 1 - accepted | 2 - discarded
  verified_by: number
}

type Meta = {
  filepath: string | null,
  attached_to: number,
  org: string,
  participants: Array<number>,
  status: 0 | 1 | 2, // 0 - pending | 1 - accepted | 2 - discarded
  verified_by: number
}

/*
"user_id": user_id,
            "total_xp": total_xp,
            "level": (total_xp // 500) + 1,
            "confirmed_count": confirmed_count,
            "badges": unlocked_badges */

export type Stats = {
  user_id: number,
  total_xp: number,
  level: number,
  badges: Array<string>
}

type Badge = {
  
}

export default function StudentProfile({userID}: {userID: number}) {
  const [profile, updateProfile] = useProfile(userID);
  const [mentors, setMentors] = useState<Array<User>>();
  const [achievements, setAchivements] = useState<Array<Achivement>>();
  const [stats, setStats] = useState<Stats>();
  const [login, setLogin] = useState<string>("");
  //const user_id = profile.user_id;
  const [mentorError, setMentorError] = useState('');
const [mentorSuccess, setMentorSuccess] = useState('');

const handleAddMentor = async () => {
  if (!login.trim()) {
    setMentorError('Введите логин наставника');
    setMentorSuccess('');
    return;
  }

  setMentorError('');
  setMentorSuccess('');

  try {
    const res = await request("/relationships/assign-mentor", "post", {login, user_id: userID});

    if (res.status === 'success') {
      setMentorSuccess('Наставник успешно добавлен!');
      setLogin(''); // очищаем поле
    } else {
      setMentorError(res.error || 'Ошибка при добавлении наставника');
    }
  } catch (err) {
    console.log(err);
    setMentorError('Ошибка соединения с сервером');
  } finally {
    
    // Автоматически скрываем сообщение об успехе через 3 секунды
    setTimeout(() => {
      setMentorSuccess('');
    }, 3000);
  }
};
  useEffect(() => {
    async function fetchAchivements(user_id: number){
      const res = await request(`/achivement/get/${userID}`, "get");
      if (res.status === "success"){
        const data = (res.data as Array<Entity>).map(el => {
          const meta: Meta = JSON.parse(el.meta);
          const ach: Achivement = {id: el.id as number, name: el.name, desc: el.description, filepath: meta.filepath, participants: meta.participants, attached_to: meta.attached_to, org: meta.org, verified_by: meta.verified_by, status: meta.status}
          return ach; 
        })
        setAchivements(data); // ignore
      }
    }

    async function fetchMentors(user_id: number) {
      const res = await request("/relationships/get_users", "post", {id: user_id});
      if (res.status === "success"){
        console.log(`MENTORS: ${res.data}`)
        setMentors(res.data as Array<User>);
      }
      console.log(res);
    }

    async function fetchStats(user_id: number){
      const res = await request(`/gamification/stats/${user_id}`, "get");
      if (res.status === "success"){
        setStats(res.data as Stats);
        console.log(`STATS: ${JSON.stringify(res.data)}`);
        return;
      }
      console.log(`STATS: ${res}`);
    }

    fetchAchivements(userID);
    fetchMentors(userID);
    fetchStats(userID);
  }, [userID]
);

  return (
    <div className={styles.container}>
      <main className={styles.wrapper}>
        <header className={styles.glassCard}>
          <div className={styles.headerContent}>
            <div className={styles.iconCircle}>🏆</div>
            <div className={styles.headerText}>
              <h1>Личный реестр наград</h1>
              <p>{profile.username} | Профиль ученика</p>
            </div>
          </div>
        </header>

        <section className={styles.statsGrid}>
          <div className={styles.glassCard}>
            <span className={styles.label}>Баллы</span>
            <span className={styles.value}>{stats?.total_xp} ⭐</span>
          </div>
          <div className={styles.glassCard}>
            <span className={styles.label}>Кол-во побед</span>
            <span className={styles.value}>{achievements?.filter(el => el.status == 1).length}</span>
          </div>
          <div className={styles.glassCard}>
            <span className={styles.label}>Мои награды</span>
            <div className={styles.badges}>
              {stats?.badges?.map(el => el.icon)}
            </div>
          </div>
        </section>

        <section className={`${styles.glassCard} ${styles.feedSection}`}>
          <h2 className={styles.sectionTitle}>Достижения и грамоты</h2>
          <div className={styles.scrollContainer}>
            
            {achievements && achievements.length > 0 ? (
    achievements.map((ach) => (
      <div key={ach.id} className={styles.achievementBox}>
        <div className={styles.textSide}>
          <div className={styles.titleRow}>
            <h3>{ach.name}</h3>
            {/* Динамический класс для статуса */}
            <span className={`${styles.statusBadge} ${styles[`status${ach.status}`]}`}>
              {ach.status === 0 ? "На проверке" : ach.status === 1 ? "Подтверждено" : "Отклонено"}
            </span>
          </div>
          
          <div className={styles.orgInfo}>
            <span className={styles.orgName}>{ach.org}</span>
          </div>

          <p className={styles.achievementDesc}>{ach.desc}</p>
          
          <div className={styles.participantsCount}>
            Участников: {ach.participants?.length}
          </div>
        </div>

        <div className={styles.mediaSide}>
          {ach.filepath ? (
            <img src={ach.filepath} alt={ach.name} className={styles.achievementImage} />
          ) : (
            <div className={styles.imagePlaceholder}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Грамота</span>
            </div>
          )}
        </div>
      </div>
    ))
  ) : (
    <div className={styles.errorState}>
       <p className={styles.errorMessage}>Не удалось загрузить достижения</p>
       <span>Попробуйте обновить страницу позже</span>
    </div>
  )}
          </div>
        </section>

        <section className={`${styles.glassCard} ${styles.mentorsSection}`}>
          <h2 className={styles.sectionTitle}>Наставники</h2>
          <div className={styles.mentorsList}>
            {mentors?.map((m, i) => (
              <div key={i} className={styles.mentorProfile}>
                <div className={styles.mentorAvatar}>👤</div>
                <div className={styles.mentorInfo}>
                  <h4>{m.username}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className={styles.glassCard}>
  <div className={styles.mentorAccess}>
    <span className={styles.mentorLabel}>Добавление наставника:</span>
    <input 
      type="text" 
      className={styles.mentorInput} 
      placeholder="Логин Наставника" 
      onChange={e => setLogin(e.target.value)} 
      value={login} 
    />
    <button 
      className={styles.submitBtn} 
      onClick={handleAddMentor}
    >
     Подтвердить
    </button>
  </div>
  
  {/* Сообщение об ошибке */}
  {mentorError && (
    <div className={styles.errorState} style={{ marginTop: '15px', padding: '12px' }}>
      <p className={styles.errorMessage}>⚠️ {mentorError}</p>
    </div>
  )}
  
  {/* Сообщение об успехе */}
  {mentorSuccess && (
    <div className={styles.errorState} style={{ 
      marginTop: '15px', 
      padding: '12px',
      background: 'rgba(0, 150, 0, 0.1)',
      border: '1px dashed rgba(0, 150, 0, 0.3)'
    }}>
      <p className={styles.errorMessage} style={{ color: '#006600' }}>✅ {mentorSuccess}</p>
    </div>
  )}
</footer>

      </main>
    </div>
  );
}