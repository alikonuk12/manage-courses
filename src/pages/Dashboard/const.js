import {  
    BookmarkBorder, 
    SchoolOutlined, 
    Payment,
    PersonOutline
} from '@mui/icons-material';

export const CARD_LIST = [
    {
        icon: <SchoolOutlined htmlColor='#74C1ED' fontSize='large' />,
        text: 'Students',
        amount: '243',
        background: '#F0F9FF'
    },
    {
        icon: <BookmarkBorder htmlColor='#EE95C5' fontSize='large' />,
        text: 'Course',
        amount: '13',
        background: '#FEF6FB'
    },
    {
        icon: <Payment htmlColor='#F6C762' fontSize='large' />,
        text: 'Payments',
        amount: '556,000₺',
        background: '#FEFBEC'
    },
    {
        icon: <PersonOutline htmlColor='#FFFFFF' fontSize='large' />,
        text: 'Users',
        amount: '3',
        background: 'linear-gradient(90deg, #FEAF00, #F8D442)'
    }
];