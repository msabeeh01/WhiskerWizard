import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider, useAuth } from '@/context/AuthProvider';
import NavBar from './components/NavBar/NavBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Component {...pageProps} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
