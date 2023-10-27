import { Action, createReducer, on } from "@ngrx/store";
import { generateGuid } from "src/app/helpers/generate-guid";
import { IUser,IUserList } from "src/app/models/models";
import { AppActions } from "../actions/app.action";
import { initialState } from "../state/app.state";
const appReducer = createReducer(
    initialState,
    on(AppActions.registerUser, (state, { firstName, lastName, email, password }) => {
        const newUserList: IUser = {
            userId: generateGuid(),
            firstName,
            lastName,
            nickname: "Guest",
            email,
            password,
            phone: "Unknown",
            country: "Unknown",
            city: "Unknown",
            avatarURL:"../../../../../assets/no-avatar.png",
            createdDate: new Date()
        };

        return {...state, userList: [...state.userList, newUserList],currentUser: newUserList};
    }),

    on(AppActions.loginUser, (state, {user})=>{
        return {...state, currentUser: user}
    }),

    on(AppActions.logOut, state => {
        return {...state, currentUser: {}}
    }),

    on(AppActions.changeAvatar, (state, {imgPath})=>{
        return {
            ...state,
            userList: state.userList.map(user => 
                user.userId === state.currentUser.userId ? {
                    ...user, 
                    avatarURL: `../../../../../assets/${imgPath}`
                }: user),
            currentUser: {...state.currentUser, avatarURL: `../../../../../assets/${imgPath}`} 
        }
    }),

    on(AppActions.removeAvatar, state => {
        return{
            ...state,
            userList: state.userList.map(user => 
                user.userId === state.currentUser.userId ? {
                    ...user, 
                    avatarURL: "../../../../../assets/no-avatar.png"
                }: user),
            currentUser: {...state.currentUser, avatarURL: "../../../../../assets/no-avatar.png"} 
        }
    }),

    on(AppActions.editNotifications, (state,{
        notificationsEmail,
        notificationsPush,
        notificationsText,
        notificationsPhone,
        messagesEmail,
        messagesPush,
        messagesText,
    }) => {
        return{
            ...state,
            notifications: {
                notificationsEmail,
                notificationsPush,
                notificationsText,
                notificationsPhone,
                messagesEmail,
                messagesPush,
                messagesText,
            }
        }
    }),

    on(AppActions.editUserInfo, (state,{
        firstName,
        lastName,
        email,
        phone,
        country,
        city}) => {
            return {
                ...state,
                userList: state.userList.map(user => user.userId === state.currentUser.userId ? {
                    ...user, 
                    firstName, 
                    lastName, 
                    email, 
                    phone, 
                    country,
                    city
                }: user),
                currentUser: {...state.currentUser, 
                    firstName, 
                    lastName, 
                    email, 
                    phone, 
                    country,
                    city
                } 
            }
        }),
        
    on(AppActions.addUser, (state, {firstName,lastName,nickname,email,phone,userId,country,city})=>{
        let newUser: IUser = {
                userId: userId ? userId : generateGuid(),
                firstName,
                lastName,
                nickname,
                email,
                password: "Cardlord231202!",
                phone,
                country,
                city,
                avatarURL:"../../../../../assets/no-avatar.png",
                createdDate: new Date()
            }
        
        return {...state, userList: [...state.userList, newUser]};
    }),
    on(AppActions.editUser, (state, {firstName,lastName,nickname,email,phone,userId,country,city})=>{
        return {
            ...state, 
            userList: state.userList.map(user => user.userId === userId ? {
                ...user,
                userId, 
                firstName, 
                lastName,
                nickname, 
                email, 
                phone, 
                country,
                city
            }: user)
        };
    })
    
)

export function AppReducer(state: IUserList | undefined, action: Action) {
    return appReducer(state, action)
}