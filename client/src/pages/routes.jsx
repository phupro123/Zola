import { Routes, Route } from 'react-router-dom';

import Logout from './logout';
import Login from './login';
import Signup from './signup';
import Forgot from './forgot';
import ContactPage from './contact';
import NotifyPage from './notify';
import Timeline from './timeline';
import ChatPage from './chat';
import PostDetailPage from './detail';
import SettingPage from './setting';
import PrimaryLayout from '../components/PrimaryLayout';
import AddPostPage from './new';
import DiscoverPage from './discover';
import SearchPage from './search';
import Profile from './profile';
import Follower from './follower';
import Following from './following';
import EditProfile from './editprofile';
import Index from '.';
import PrivateRoute from '../components/PrivateRoute';
import FlexLayout from '../components/FlexLayout';
import FindUser from './finduser';
import ErrorPage from './404';
import ChatInfo from '../parts/Chat/ChatInfo';
import ChatBox from '../parts/Chat/ChatBox';

export const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route path="/auth/forgot" element={<Forgot />} />
      <Route path="/auth/logout" element={<Logout />} />
      <Route
        path="/messages"
        element={
          <PrivateRoute>
            <FlexLayout>
              <ChatPage />
            </FlexLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/messages/:page"
        element={
          <PrivateRoute>
            <FlexLayout>
              <ChatPage />
            </FlexLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/conversations"
        element={
          <PrivateRoute>
            <FlexLayout>
              <ChatBox />
            </FlexLayout>
          </PrivateRoute>
        }
      />

      <Route
        path="/messages/:page/:tab"
        element={
          <PrivateRoute>
            <FlexLayout>
              <ChatPage />
            </FlexLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <PrivateRoute>
            <FlexLayout>
              <SettingPage />
            </FlexLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/timeline"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <Timeline />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />
      <Route
        path="/explore"
        element={
          <FlexLayout>
            <DiscoverPage />
          </FlexLayout>
        }
      />
      <Route
        path="/search"
        element={
          <FlexLayout>
            <SearchPage />
          </FlexLayout>
        }
      />
      <Route
        path="/notifications"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <NotifyPage />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />
      <Route
        path="/notifications/:tab"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <NotifyPage />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />

      <Route
        path="/friends"
        element={
          <FlexLayout>
            <PrivateRoute>
              <ContactPage />
            </PrivateRoute>
          </FlexLayout>
        }
      />
      <Route
        path="/friends/find"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <FindUser />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />

      <Route
        path="/:username"
        element={
          <PrimaryLayout>
            <Profile />
          </PrimaryLayout>
        }
      />
      <Route
        path="/:username/:tab"
        element={
          <PrimaryLayout>
            <Profile />
          </PrimaryLayout>
        }
      />
      <Route
        path="/:username/following"
        element={
          <PrimaryLayout>
            <Following />
          </PrimaryLayout>
        }
      />
      <Route
        path="/:username/follower"
        element={
          <PrimaryLayout>
            <Follower />
          </PrimaryLayout>
        }
      />
      <Route
        path="/settings/profile"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />
      <Route
        path="/compose/post"
        element={
          <PrimaryLayout>
            <PrivateRoute>
              <AddPostPage />
            </PrivateRoute>
          </PrimaryLayout>
        }
      />

      <Route
        path="/:username/post/:postId"
        element={
          <PrimaryLayout>
            <PostDetailPage />
          </PrimaryLayout>
        }
      />
      <Route path="/404" element={<ErrorPage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};
