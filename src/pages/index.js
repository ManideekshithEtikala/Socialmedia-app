import { Inter } from "next/font/google";
import Sidebar from "../../components/Sidebar";
import Feeds from "../../components/Feeds";
import Widgets from "../../components/Widgets";
const inter = Inter({ subsets: ["latin"] });

export default function Home({newsResult}) {
  return (
    <div className='flex min-h-screen max-w-7xl mx-auto '>
      {/* Sidebar */}
      <Sidebar />
      {/* Feeds */}
      <Feeds />
        {/* widgets */}
      <Widgets articles={newsResult.articles}/>
    </div>

  );
}
export async function getServerSideProps() {
  const newsResult = await fetch(
    "https://saurav.tech/NewsAPI/everything/cnn.json"
  ).then((res) => res.json());
  
  return {
    props: {
      newsResult,
    },
  };
}

