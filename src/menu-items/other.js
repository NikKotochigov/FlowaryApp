// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons';

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
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'company-page',
            title: 'Company Page',
            type: 'item',
            url: '/company-page',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'history',
            title: 'Activity history',
            type: 'item',
            url: '/history',
            icon: icons.IconBrandChrome,
            breadcrumbs: false
        },
        {
            id: 'documentation',
            title: 'Documentation',
            type: 'item',
            url: 'https://github.com/NikKotochigov/FlowaryApp',
            icon: icons.IconHelp,
            external: true,
            target: true
        }
    ]
};

export default other;
