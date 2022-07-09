import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './component/error-fallback';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppContext from './context/app-context';
import { defaultQueryFn } from './api/query';
import App from './app';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            queryFn: defaultQueryFn
        },
    },
});

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <AppContext>
                    <App/>
                </AppContext>
            </QueryClientProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
