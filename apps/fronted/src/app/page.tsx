import Hero from '@/components/Hero';
import Posts from '@/components/Posts';
import { CONFIG } from '@/constants';
import { fetchUserPosts } from '@/lib/actions/posts';
type HomeTypes = {
  searchParams?: Promise<{
    limit?: string;
    page?: string;
  }>;
};
const Home = async ({ searchParams }: HomeTypes) => {
  const params = await searchParams;
  const limit = parseInt(params?.limit ?? CONFIG.PAGE_SIZE.toString());
  const page = parseInt(params?.page ?? '1');
  const { posts } = await fetchUserPosts({ page, pageSize: limit });
  return (
    <main>
      <Hero />
      <Posts posts={posts} />
    </main>
  );
};

export default Home;
