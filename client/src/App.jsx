import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import 'yet-another-react-lightbox/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Dropdown.css';

import { SocketContext, socket } from '~/context/socket';
import AppManager from './AppManager';

const queryClient = new QueryClient({});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SocketContext.Provider value={socket}>
          <AppManager />
        </SocketContext.Provider>
      </BrowserRouter>
      <ReactQueryDevtools initialisopen="true" />
    </QueryClientProvider>
  );
}
