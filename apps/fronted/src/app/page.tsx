import Hero from '@/components/Hero';
import Posts from '@/components/Posts';
import { fetchUserPosts } from '@/lib/actions/posts';
const Home = async () => {
  const { posts } = await fetchUserPosts({});
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
};

export default Home;
