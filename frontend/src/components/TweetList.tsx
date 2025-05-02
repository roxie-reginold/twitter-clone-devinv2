import React from 'react';
import Tweet from './Tweet';

interface TweetListProps {
  tweets: Array<{
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
  }>;
}

const TweetList: React.FC<TweetListProps> = ({ tweets }) => {
  if (tweets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
        <p className="text-xl font-bold mb-2">No tweets to display</p>
        <p className="text-gray-500">
          When new tweets are posted, they'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
};

export default TweetList;
