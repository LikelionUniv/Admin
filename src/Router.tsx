import { createBrowserRouter } from 'react-router-dom';
import SignUp from './routes/SignUp';
import LoginPage from './routes/LoginPage';
import LandingPage from './routes/LandingPage';
import Project from './routes/Project';
import Chat from './routes/Chat';
import Root from './routes/root';
import Mypage from './routes/Mypage';

import UnivPage from './routes/UnivPage';
import ProjectDetail from './components/project/Detail/ProjectDetail';
import ProjectRegister from './components/project/register/ProjectRegister';
import ProjectList from './components/project/ProjectList';
import Community from './components/community/Community';
import RecruitPage from './routes/RecruitPage';
import AboutPage from './routes/AboutPage';
import BabyLion from './components/recruit/apply/mobile/BabyLion';
import Recruit from './components/univrecruit/UnivRecruit';
import UnivRecruit from './components/univrecruit/UnivRecruit';
import CommunityWrite from './components/community/write/CommunityWrite';
import CommunityDetail from './components/community/detail/CommunityDetail';
import CommunityPage from './routes/CommunityPage';
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
                element: <LandingPage />,
            },
            {
                path: '/signup',
                element: <SignUp />,
            },
            {
                path: '/login',
                element: <LoginPage />,
            },
            {
                path: '/mypage',
                element: <Mypage />,
            },
            {
                path: '/project',
                element: <Project />,
                children: [
                    {
                        path: '',
                        element: <ProjectList />,
                    },
                    {
                        path: 'register',
                        element: <ProjectRegister />,
                    },
                    {
                        path: ':projectId',
                        element: <ProjectDetail />,
                    },
                ],
            },
            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/recruit',
                element: <RecruitPage />,
                children: [
                    {
                        path: '',
                        element: <UnivRecruit />,
                    },
                    {
                        path: 'babylion',
                        element: <BabyLion />,
                    },
                ],
            },
            {
                path: '/univ',
                element: <UnivPage />,
            },
            {
                path: '/community',
                element: <CommunityPage />,
                children: [
                    {
                        path: '',
                        element: <Community />,
                    },
                    {
                        path: ':communityId',
                        element: <CommunityDetail />,
                    },
                    {
                        path: 'write',
                        element: <CommunityWrite />,
                    },
                ],
            },

            {
                path: '/chat',
                element: <Chat />,
            },
            {
                path: '/about',
                element: <AboutPage />,
            },
            {
                path: '/admin',
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
