import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/widgets/MainLayout';
import { MainPage } from '@/pages/main';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Navigate to="/main" replace /> },
            { path: 'main', element: <MainPage /> },
        ],
    },
]);

const RouterData = () => {
    return <RouterProvider router={router} />;
};

export default RouterData;
