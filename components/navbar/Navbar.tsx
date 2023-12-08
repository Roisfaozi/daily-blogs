import Link from "next/link";
import LoginForm from "./LoginForm";
export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="groups">
        <Link href="/" className="text-2xl font-bold">
          Daily Blogs
        </Link>
        <div className="h-1 w-0 group-hover:w-full transition-all bg-green-500"></div>
      </div>
      <LoginForm />
    </nav>
  );
}
