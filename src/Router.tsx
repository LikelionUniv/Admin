import { createBrowserRouter } from 'react-router-dom';

import Root from './routes/root';

import AdminBoardPage from './routes/AdminBoardPage';
import AdminPage from './routes/AdminPage';
import RecruitAlert from './components/admin/RecruitAlert';
import User from './components/admin/User';
import Admin from './components/admin/Admin';

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

                    {
                        path: 'recruitalert',
                        element: <RecruitAlert />,
                    },
                ],
            },
            {
                path: '/adminboard',
                element: <AdminBoardPage />,
                children: [
                    {
                        path: '',
                        element: <Admin />,
                    },
                ],
            },
        ],
    },
]);

export default router;
