import Hero from '@/components/Hero';
import Posts from '@/components/Posts';
import { CONFIG } from '@/constants';
import { fetchPosts } from '@/lib/actions/posts';
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
  const { posts, totalPosts } = await fetchPosts({ page, pageSize: limit });

  const totalPages = Math.floor(totalPosts / limit);
  return (
    <main>
      <Hero />
      <Posts posts={posts ?? []} currentPage={page} totalPages={totalPages} />
    </main>
  );
};

export default Home;
