import { Inter } from "next/font/google";
import Sidebar from "../../components/Sidebar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className='flex min-h-screen max-w-7xl mx-auto '>
      <Sidebar />
    </div>

  );
}
