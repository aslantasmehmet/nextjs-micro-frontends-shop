import { redirect } from 'next/navigation';

export default function CartPage() {
  // /cart sayfasına gelindiğinde ana sayfaya yönlendir
  redirect('/');
} 