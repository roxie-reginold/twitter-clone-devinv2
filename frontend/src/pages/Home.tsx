import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = React.lazy(() => import('../components/Sidebar'));
const TweetForm = React.lazy(() => import('../components/TweetForm'));
const TweetList = React.lazy(() => import('../components/TweetList'));
const RightSidebar = React.lazy(() => import('../components/RightSidebar'));

interface Tweet {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
  likes: number;
  retweets: number;
  comments: number;
  liked: boolean;
  retweeted: boolean;
}

const Home: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        
        setTweets([
          {
            id: '1',
            content: 'Just setting up my Twitter clone!',
            user: {
              id: '1',
              username: 'johndoe',
              name: 'John Doe',
              avatar: 'https://via.placeholder.com/50',
            },
            createdAt: new Date().toISOString(),
            likes: 5,
            retweets: 2,
            comments: 1,
            liked: false,
            retweeted: false,
          },
          {
            id: '2',
            content: 'This Twitter clone is looking great!',
            user: {
              id: '2',
              username: 'janedoe',
              name: 'Jane Doe',
              avatar: 'https://via.placeholder.com/50',
            },
            createdAt: new Date(Date.now() - 3600000).toISOString(),
            likes: 10,
            retweets: 3,
            comments: 2,
            liked: true,
            retweeted: false,
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch tweets');
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  const handleNewTweet = (tweet: Tweet) => {
    setTweets([tweet, ...tweets]);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-twitter-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-twitter-background">
      <Sidebar />
      <main className="flex-1 border-x border-twitter-extra-light">
        <div className="max-w-2xl mx-auto">
          <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm p-4 border-b border-twitter-extra-light">
            <h1 className="text-xl font-bold">Home</h1>
          </div>
          <TweetForm onNewTweet={handleNewTweet} />
          <TweetList tweets={tweets} />
        </div>
      </main>
      <RightSidebar />
    </div>
  );
};

export default Home;
