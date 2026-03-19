"use client"
import React from 'react';
import { useEffect, useState } from 'react';
import useProfile from '@/modules/profile/service';
import styles from './page.module.css';
import request from '@/core/api';
import { User } from '@/core/types';
import { Profile } from '@/modules/profile/types';
import Link from "next/link"
import { Stats } from '../studentProfile/StudentProfile';
import { useRouter } from 'next/navigation';

export default function MentorProfile({userID}: {userID: number}) {
  const router = useRouter();
    const [students, setStudents] = useState<Array<User>>();
    const [profile, updateProfile] = useProfile(userID);
    const [rating, setRating] = useState<Array<Stats>>();
  /*const students = Array(8).fill({
    name: 'Алексей Федоров',
    course: 'Python Про',
    progress: 68,
    status: 'активен'
  });*/

  useEffect(() => {

    const getStudents = async(userID: number) => {
        const res = await request("/relationships/get_mentors", "post", {id: userID})
        if (res.status === "success"){
            setStudents(res.data);
            return;
        }
        console.log(res);
    }

    const getRating = async(userID: number) => {
        const res = await request("/relationships/get_rating", "post", {id: userID})
        if (res.status === "success"){
            setRating(res.data);
            console.log(res);
            return;
        }
        console.log(res);
    }

    getRating(userID);
    getStudents(userID);
  }, [userID])

const get_rating = (rating: Array<Stats>, user_id: number): number => {
    // Ищем индекс пользователя в массиве рейтинга
    const index = rating?.findIndex(item => item.user_id === user_id);
    
    // Если пользователь найден, возвращаем место (индекс + 1)
    // Если не найден, возвращаем -1 или 0 (выбирай сам)
    return index !== -1 ? index + 1 : 0;
}

  return (
    <div className={styles.container}>
      <main className={styles.content}>

        {/* ВЕРХНЯЯ ПАНЕЛЬ: Заголовок и поиск */}
        <header className={styles.header}>
          <div className={styles.titleInfo}>
            <h1>Личный кабинет Наставника</h1>
            <p>Приветствуем, {profile.username}</p>
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
              <div className={styles.bigNumber}>{students?.length}</div>
            </div>

            <div className={`${styles.card} ${styles.ratingCard}`}>
              <h3>Рейтинг</h3>
              <div className={styles.ratingList}>
                {rating?.map((pos, i) => (
                  <div key={i} className={styles.ratingItem}>
                    <span>{i+1}. {students?.filter(el => el.id == pos.user_id)[0].username}</span>
                    <span className={styles.score}>{pos.total_xp}</span>
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
                {students?.map((s, i) => (
                  <div key={i} className={styles.studentSmallCard}>
                    <div className={styles.studentInfo}>
                      <div className={styles.avatarMini} />
                      <div>
                        <h4>{s.username}</h4>
                        <span>В рейтинге: {get_rating(rating, s.id)}</span>
                      </div>
                    </div>
                    
                    <button className={styles.actionBtn} onClick={() => router.push(`/profile/${s.}`)}>В профиль</button>
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