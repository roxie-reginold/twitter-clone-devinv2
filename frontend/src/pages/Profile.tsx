import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Sidebar = React.lazy(() => import('../components/Sidebar'));
const TweetList = React.lazy(() => import('../components/TweetList'));
const RightSidebar = React.lazy(() => import('../components/RightSidebar'));

interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio: string;
  location: string;
  website: string;
  joinedDate: string;
  following: number;
  followers: number;
  isFollowing: boolean;
}

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

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'tweets' | 'media' | 'likes'>('tweets');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        
        setUser({
          id: '1',
          username: username || 'user',
          name: 'User Name',
          avatar: 'https://via.placeholder.com/150',
          bio: 'This is my Twitter clone profile!',
          location: 'San Francisco, CA',
          website: 'https://example.com',
          joinedDate: 'January 2023',
          following: 120,
          followers: 85,
          isFollowing: false,
        });
        
        setTweets([
          {
            id: '1',
            content: 'Just setting up my Twitter clone!',
            user: {
              id: '1',
              username: username || 'user',
              name: 'User Name',
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
              id: '1',
              username: username || 'user',
              name: 'User Name',
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
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [username]);

  const handleFollow = async () => {
    if (!user) return;
    
    try {
      
      setUser({
        ...user,
        isFollowing: !user.isFollowing,
        followers: user.isFollowing ? user.followers - 1 : user.followers + 1,
      });
    } catch (err) {
      console.error('Failed to follow/unfollow user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-twitter-blue"></div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">{error || 'User not found'}</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-twitter-background">
      <Sidebar />
      <main className="flex-1 border-x border-twitter-extra-light">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header */}
          <div className="sticky top-0 z-10 bg-white bg-opacity-90 backdrop-blur-sm p-4 border-b border-twitter-extra-light">
            <div className="flex items-center">
              <button className="mr-4 p-2 rounded-full hover:bg-twitter-extra-light">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <g>
                    <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                  </g>
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold">{user.name}</h1>
                <p className="text-sm text-gray-500">{tweets.length} Tweets</p>
              </div>
            </div>
          </div>
          
          {/* Profile Banner & Info */}
          <div>
            <div className="h-48 bg-twitter-blue"></div>
            <div className="px-4 py-3 relative">
              <div className="absolute -top-16 left-4 border-4 border-white rounded-full overflow-hidden">
                <img src={user.avatar} alt={user.name} className="h-32 w-32 object-cover" />
              </div>
              
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleFollow}
                  className={`px-4 py-2 rounded-full font-bold ${
                    user.isFollowing
                      ? 'border border-twitter-light text-black'
                      : 'bg-black text-white'
                  }`}
                >
                  {user.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-500">@{user.username}</p>
                
                {user.bio && <p className="mt-3">{user.bio}</p>}
                
                <div className="flex flex-wrap mt-3 text-gray-500">
                  {user.location && (
                    <div className="flex items-center mr-4 mb-2">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-1" fill="currentColor">
                        <g>
                          <path d="M12 14.315c-2.088 0-3.787-1.698-3.787-3.786S9.913 6.74 12 6.74s3.787 1.7 3.787 3.787-1.7 3.785-3.787 3.785zm0-6.073c-1.26 0-2.287 1.026-2.287 2.287S10.74 12.814 12 12.814s2.287-1.025 2.287-2.286S13.26 8.24 12 8.24z"></path>
                          <path d="M20.692 10.69C20.692 5.9 16.792 2 12 2s-8.692 3.9-8.692 8.69c0 1.902.603 3.708 1.743 5.223l.003-.002.007.015c1.628 2.07 6.278 5.757 6.475 5.912.138.11.302.163.465.163.165 0 .33-.053.467-.162.197-.155 4.847-3.84 6.475-5.912l.007-.014.002.002c1.14-1.516 1.742-3.32 1.742-5.223zM12 20.29c-1.224-.99-4.52-3.715-5.756-5.285-.94-1.25-1.436-2.742-1.436-4.312C4.808 6.727 8.035 3.5 12 3.5s7.192 3.226 7.192 7.19c0 1.57-.497 3.062-1.436 4.313-1.236 1.57-4.532 4.294-5.756 5.285z"></path>
                        </g>
                      </svg>
                      <span>{user.location}</span>
                    </div>
                  )}
                  
                  {user.website && (
                    <div className="flex items-center mr-4 mb-2">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 mr-1" fill="currentColor">
                        <g>
                          <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z"></path>
                          <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932.832 1.127 1.176 2.51.968 3.895s-.942 2.605-2.068 3.438l-3.53 2.608c-.756.558-1.64.827-2.52.827z"></path>
                        </g>
                      </svg>
                      <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-twitter-blue hover:underline">
                        {user.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                  
                  <div className="flex items-center mb-2">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 mr-1" fill="currentColor">
                      <g>
                        <path d="M19.708 2H4.292C3.028 2 2 3.028 2 4.292v15.416C2 20.972 3.028 22 4.292 22h15.416C20.972 22 22 20.972 22 19.708V4.292C22 3.028 20.972 2 19.708 2zm.792 17.708c0 .437-.355.792-.792.792H4.292c-.437 0-.792-.355-.792-.792V6.418c0-.437.354-.79.79-.792h15.42c.436 0 .79.355.79.79V19.71z"></path>
                        <circle cx="7.032" cy="8.75" r="1.285"></circle>
                        <circle cx="7.032" cy="13.156" r="1.285"></circle>
                        <circle cx="16.968" cy="8.75" r="1.285"></circle>
                        <circle cx="16.968" cy="13.156" r="1.285"></circle>
                        <circle cx="12" cy="8.75" r="1.285"></circle>
                        <circle cx="12" cy="13.156" r="1.285"></circle>
                        <circle cx="7.032" cy="17.486" r="1.285"></circle>
                        <circle cx="12" cy="17.486" r="1.285"></circle>
                      </g>
                    </svg>
                    <span>Joined {user.joinedDate}</span>
                  </div>
                </div>
                
                <div className="flex mt-3">
                  <div className="mr-5">
                    <span className="font-bold">{user.following}</span>{' '}
                    <span className="text-gray-500">Following</span>
                  </div>
                  <div>
                    <span className="font-bold">{user.followers}</span>{' '}
                    <span className="text-gray-500">Followers</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Tabs */}
          <div className="border-b border-twitter-extra-light">
            <div className="flex">
              <button
                onClick={() => setActiveTab('tweets')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'tweets'
                    ? 'text-twitter-blue border-b-2 border-twitter-blue'
                    : 'text-gray-500 hover:bg-twitter-extra-light'
                }`}
              >
                Tweets
              </button>
              <button
                onClick={() => setActiveTab('media')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'media'
                    ? 'text-twitter-blue border-b-2 border-twitter-blue'
                    : 'text-gray-500 hover:bg-twitter-extra-light'
                }`}
              >
                Media
              </button>
              <button
                onClick={() => setActiveTab('likes')}
                className={`flex-1 py-4 text-center font-medium ${
                  activeTab === 'likes'
                    ? 'text-twitter-blue border-b-2 border-twitter-blue'
                    : 'text-gray-500 hover:bg-twitter-extra-light'
                }`}
              >
                Likes
              </button>
            </div>
          </div>
          
          {/* Tweets */}
          <TweetList tweets={tweets} />
        </div>
      </main>
      <RightSidebar />
    </div>
  );
};

export default Profile;
