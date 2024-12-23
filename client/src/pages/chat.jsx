import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from '../parts/Chat/ChatBox';
import ChatNew from '../parts/Chat/ChatNew';
import ChatWelcome from '../parts/Chat/ChatWelcome';
import ChatInfo from '../parts/Chat/ChatInfo';
import ChatInvite from '../parts/Chat/ChatInvite';
import ChatRoom from '../parts/Chat/ChatRoom';
import { useMediaQuery } from 'react-responsive';

function ChatPage() {
  useEffect(() => {
    document.title = 'Nhắn tin - Zola';
  }, []);
  const { page, tab } = useParams();
  const renderPage = useMemo(() => {
    switch (page) {
      case undefined:
      case 'welcome':
        return <ChatWelcome />;
      case 'new':
        return <ChatNew />;
      default: {
        switch (tab) {
          case 'info':
            return <ChatInfo />;
          case 'invite':
            return <ChatInvite />;
          default:
            return <ChatRoom />;
        }
      }
    }
  }, [page, tab]);
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1224px)',
  });
  return (
    <div className="flex grow justify-center">
      {isDesktopOrLaptop && <ChatBox />}
      <div className="grow">{renderPage}</div>
    </div>
  );
}

export default ChatPage;
