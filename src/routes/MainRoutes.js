import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const Main = Loadable(lazy(() => import('views/main/default')));

// sample page routing
const Dashboard = Loadable(lazy(() => import('views/dashboard')));
const SamplePage = Loadable(lazy(() => import('views/personal-page')));
const Outsource = Loadable(lazy(() => import('views/outsource')));
const History = Loadable(lazy(() => import('views/history')));
const Settings = Loadable(lazy(() => import('views/settings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: 'main',
            children: [
                {
                    path: 'default',
                    element: <Dashboard />
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
            path: 'outsource',
            element: <Outsource />
        },
        {
            path: 'history',
            element: <History />
        },
        {
            path: 'settings',
            element: <Settings />
        },
       
    ]
};

export default MainRoutes;
