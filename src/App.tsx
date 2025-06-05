import Header from './components/Header/Header.tsx';
import './index.css';
import { mockPosts } from './mock/mockPosts.ts';
import PostCard from './components/Post/PostCard.tsx';
import PostCreator from './components/Post/PostCreator.tsx';
import UserProfileCard from './components/UserProfileCard/UserProfileCard.tsx';

function App() {
  return (
    <>
      <Header />
      <UserProfileCard
        name="Ivaylo Bachvarov"
        title="Co-Founder, HackSoft"
        avatar="https://i.pravatar.cc/150?img=5"
        likes={210}
        posts={4}
        onEdit={() => alert('Edit profile')}
      />
      <PostCreator />
      <main className="max-w-xl mx-auto p-4">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>
    </>
  );
}

export default App;
