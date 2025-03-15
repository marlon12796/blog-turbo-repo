import Hero from '@/components/Hero';
import Posts from '@/components/Posts';

export default function Home() {
  return (
    <main>
      <Hero />
      <Posts posts={[]} />
    </main>
  );
}
