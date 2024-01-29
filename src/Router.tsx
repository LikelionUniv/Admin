import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root';

import AdminBoardPage from './routes/AdminBoardPage';
import AdminPage from './routes/AdminPage';
import RecruitAlarm from './components/admin/RecruitAlarm';
import User from './components/admin/User';
import LoginPage from './routes/LoginPage';
// import Admin from './components/admin/Admin';
// import Superuser from './components/admin/Superuser';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/',
                element: <AdminPage />,
                children: [
                    {
                        path: '',
                        element: <User />,
                    },
                    // {
                    //     path: 'superuser',
                    //     element: <Superuser />,
                    // },
                    {
                        path: 'recruitalarm',
                        element: <RecruitAlarm />,
                    },
                ],
            },

            {
                path: '/login',
                element: <LoginPage />,
            },
            /*             {
                path: '/adminboard',
                element: <AdminBoardPage />,
                children: [
                    {
                        path: '',
                        element: <Admin />,
                    },
                ],
            }, */
        ],
    },
]);

export default router;
