import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <header className="header">Main layout header</header>
            <div className="content">
                <Outlet />
            </div>
            <footer className="footer">Main layout footer</footer>
        </>
    );
};

export default MainLayout;
