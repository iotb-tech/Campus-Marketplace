import Link from 'next/link';
import Button from './button';
import { signIn, signOut } from '../auth/actions';

export default function LandingHeader({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="bg-white sticky top-0 w-full z-50 border-b border-gray-200 shadow-sm">
      <div className="flex justify-between items-center h-12 sm:h-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link className="text-lg sm:text-2xl font-bold text-blue-600 shrink-0" href="/">
          CampusMarket
        </Link>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <form action={signOut}>
              <Button type="submit" variant="secondary" size="sm">Sign out</Button>
            </form>
          ) : (
            <form action={signIn}>
              <Button type="submit" variant="primary" size="sm">Sign in</Button>
            </form>
          )}
        </div>
      </div>
    </header>
  );
}