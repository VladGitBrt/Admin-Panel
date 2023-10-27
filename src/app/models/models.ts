export interface IUser{
    userId: string;
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    city: string;
    avatarURL: string;
    createdDate: Date;
}

export interface IUserList {
    userList: IUser[];
    dashboardData: IDashboardGraph;
    products: IProductList[];
    currentUser: any,
    notifications: INotifications;
}

export interface INotifications{
    notificationsEmail: boolean,
    notificationsPush: boolean,
    notificationsText: boolean,
    notificationsPhone: boolean,
    messagesEmail: boolean,
    messagesPush: boolean,
    messagesText: boolean,
}

export interface IProductList {
    imgUrl: string;
    title: string;
    text: string;
}

export interface IDashboardGraph{
    budget: number;
    totalUsers: number;
    progress: number;
    totalProfit: number;
}