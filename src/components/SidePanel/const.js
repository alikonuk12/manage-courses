import { 
    HomeOutlined, 
    BookmarkBorder, 
    SchoolOutlined, 
    Payment,
    AssessmentOutlined,
    DisplaySettings
} from '@mui/icons-material';

export const HEADER = 'MANAGE COURSES';
export const NAME = 'John Doe';
export const ROLE = 'Admin';
export const LOGOUT_TEXT = 'Logout';

export const TABS = [
    {
        label: 'Home',
        icon: <HomeOutlined />,
        value: '/dashboard'
    },
    {
        label: 'Course',
        icon: <BookmarkBorder />,
        value: '/course'
    },
    {
        label: 'Students',
        icon: <SchoolOutlined />,
        value: '/students'
    },
    {
        label: 'Payment',
        icon: <Payment />,
        value: '/payment'
    },
    {
        label: 'Report',
        icon: <AssessmentOutlined />,
        value: '/report'
    },
    {
        label: 'Settings',
        icon: <DisplaySettings />,
        value: '/settings'
    },
];