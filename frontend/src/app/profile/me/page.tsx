// app/profile/me/page.js
import StudentProfile from "@/components/studentProfile/StudentProfile";
import MentorProfile from "@/components/mentorProfile/MentorProfile";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

async function getUserFromCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) {
    redirect('/login');
  }
  
  // Отправляем токен на FastAPI для проверки
  const response = await fetch('http://127.0.0.1:8000/auth/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  const data = await response.json();
  
  if (!data.valid) {
    redirect('/login');
  }
  
  return data.user;
}

export default async function MyProfilePage() {
  const user = await getUserFromCookie();  // ← теперь работает!
  
  return (
    <>
      {user.role === 'user' && <StudentProfile userID={user.id} />}
      {user.role === 'mentor' && <MentorProfile userID={user.id} />}
    </>
  );
}