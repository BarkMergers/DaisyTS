import { StrictMode } from 'react'
import './index.css'
import App from './App.tsx'
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const msalInstance = new PublicClientApplication(msalConfig);
const queryClient = new QueryClient;

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render( 
    <StrictMode>
        <MsalProvider instance={msalInstance}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </MsalProvider>  
    </StrictMode>
)
