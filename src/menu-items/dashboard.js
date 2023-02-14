// assets
import { IconDashboard } from '@tabler/icons';

// constant
const icons = { IconDashboard };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const main = {
    id: 'main',
    type: 'group',
    children: [
        {
            id: 'main',
            title: 'Main',
            type: 'item',
            url: '/main/default',
            icon: icons.IconDashboard,
            breadcrumbs: false
        }
    ]
};

export default main;
