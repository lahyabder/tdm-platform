export type User = {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'User';
    status: 'Active' | 'Inactive';
};

export const mockUsers: User[] = [
    { id: '1', name: 'Ahmed Ali', email: 'ahmed@tdm.demo', role: 'Admin', status: 'Active' },
    { id: '2', name: 'Sarah Smith', email: 'sarah@tdm.demo', role: 'User', status: 'Active' },
    { id: '3', name: 'Omar Khaled', email: 'omar@tdm.demo', role: 'User', status: 'Inactive' },
    { id: '4', name: 'Léa Dubois', email: 'lea@tdm.demo', role: 'Admin', status: 'Active' },
    { id: '5', name: 'Karim Hassan', email: 'karim@tdm.demo', role: 'User', status: 'Active' },
];

export const mockStats = {
    totalUsers: 1250,
    activeProjects: 45,
    revenue: '$12,400',
};
