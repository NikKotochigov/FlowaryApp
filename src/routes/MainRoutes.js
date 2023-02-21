import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Main = Loadable(lazy(() => import('views/main/default')));

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const SamplePage = Loadable(lazy(() => import('views/personal-page')));
const History = Loadable(lazy(() => import('views/history')));
const Demo = Loadable(lazy(() => import('views/demo')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Main />
        },
        {
            path: 'main',
            children: [
                {
                    path: 'default',
                    element: <Main />
                }
            ]
        },
        {
            path: 'dashboard',
            element: <Dashboard />
        },
        {
            path: 'personal-page',
            element: <SamplePage />
        },
        {
            path: 'history',
            element: <History />
        },
        {
            path: 'demo',
            element: <Demo />
        },
       
    ]
};

export default MainRoutes;
