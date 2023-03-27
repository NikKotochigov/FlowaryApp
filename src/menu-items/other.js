// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';
import { IconLayoutDashboard } from '@tabler/icons-react';
import { IconBrandCoinbase } from '@tabler/icons-react';
import { IconShare } from '@tabler/icons-react';
import { IconBrandGithub } from '@tabler/icons-react';
import { IconAdjustmentsAlt } from '@tabler/icons-react';
import { IconCalendarStats } from '@tabler/icons-react';
// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: IconLayoutDashboard,
            breadcrumbs: false
        },
        {
            id: 'persnal-page',
            title: 'Personal Page',
            type: 'item',
            url: '/personal-page',
            icon: IconBrandCoinbase,
            breadcrumbs: false
        },
        {
            id: 'outsource',
            title: 'Outsource',
            type: 'item',
            url: '/outsource',
            icon: IconShare,
            breadcrumbs: false
        },
        {
            id: 'history',
            title: 'Activity history',
            type: 'item',
            url: '/history',
            icon: IconCalendarStats,
            breadcrumbs: false
        },
        {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: IconAdjustmentsAlt,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://github.com/NikKotochigov/FlowaryApp',
            icon: IconBrandGithub,
            external: true,
            target: true
        },
   
    ]
};

export default other;
