import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage } from '@/pages/main';

const RouterData = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default RouterData;
