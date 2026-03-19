import { notFound } from 'next/navigation';
import PublicStudentProfile from '@/components/PubicStudentProfile';
import PublicMentorProfile from '@/components/PublicMentorProfile';

async function getUserById(userId: number) {
  // Запрашиваем данные пользователя по его ID (без куки!)
  const response = await fetch(`http://127.0.0.1:8000/auth/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return null;
  
  const data = await response.json();
  return data.user;  // предполагаем, что /user/:id возвращает { user: {...} }
}

export default async function UserProfilePage({ params }) {
  const { id } = await params;
  const userId = parseInt(id);
  const user = await getUserById(userId);
  
  console.log('Fetched user:', user);  // отладка
  
  if (!user) {
    notFound();
  }
  
  return (
    <>
      {user.role === 'user' && <PublicStudentProfile userId={user.id} />}
      {user.role === 'mentor' && <PublicMentorProfile userId={user.id} />}
    </>
  );
}