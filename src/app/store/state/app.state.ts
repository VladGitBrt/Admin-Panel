import { generateGuid } from "src/app/helpers/generate-guid";
import { IUserList } from "src/app/models/models";

export const initialState: IUserList = {
    userList: [
        {
            userId: generateGuid(), 
            firstName: "Ivan",
            lastName: "Ivanov",
            nickname: "SampleUser",
            email: "user@mail.com",
            password:"Cardlord231202!",
            phone: "0980954256",
            country: "Ukraine",
            city: "Vinnytsia",
            avatarURL:"../../../../../assets/no-avatar.png",
            createdDate: new Date()
        }
    ],
    dashboardData: {
        budget: 24000,
        totalUsers: 1600,
        progress: 75.5,
        totalProfit: 23200
    },
    products: [
        {
            imgUrl: "../../../../../assets/products/dropbox.svg",
            title: "Dropbox",
            text: "Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud."
        },
        {
            imgUrl: "../../../../../assets/products/medium.svg",
            title: "Medium Corporation",
            text: "Medium is an online publishing platform developed by Evan Williams, and launched in August 2012."
        },
        {
            imgUrl: "../../../../../assets/products/stack.svg",
            title: "Slack",
            text: "Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield."
        },
        {
            imgUrl: "../../../../../assets/products/lyft.svg",
            title: "Lyft",
            text: "Lyft is an on-demand transportation company based in San Francisco, California."
        },
        {
            imgUrl: "../../../../../assets/products/git.svg",
            title: "GitHub",
            text: "GitHub is a web-based hosting service for version control of code using Git."
        },
        {
            imgUrl: "../../../../../assets/products/squarespace.svg",
            title: "Squarespace",
            text: "Squarespace provides software as a service for website building and hosting. Headquartered in NYC."
        },
        
    ],
    currentUser: {},
    notifications: {
        notificationsEmail: false,
        notificationsPush: false,
        notificationsText: false,
        notificationsPhone: false,
        messagesEmail: false,
        messagesPush: false,
        messagesText: false,
    }
}
