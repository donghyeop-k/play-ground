import { createRoot } from 'react-dom/client';
import { ReactQueryProvider } from '@/app/provider';
import App from './App';

createRoot(document.querySelector('#root')).render(
    <ReactQueryProvider>
        <App />
    </ReactQueryProvider>,
);
