import { createAction, props } from "@ngrx/store";
import { IUser } from "src/app/models/models";

export namespace AppActions {
    export const registerUser = createAction("REGISTER_USER", props<{
        firstName:string, 
        lastName: string, 
        email: string, 
        password: string
    }>())

    export const loginUser = createAction("LOGIN_USER", props<{user: IUser}>())
    export const logOut = createAction("LOG_OUT")
    export const changeAvatar = createAction("CHANGE_AVATAR", props<{imgPath: string}>())
    export const removeAvatar = createAction("REMOVE_AVATAR");

    export const editNotifications = createAction("EDIT_NOTIFICATIONS", props<{
        notificationsEmail: boolean,
        notificationsPush: boolean,
        notificationsText: boolean,
        notificationsPhone: boolean,
        messagesEmail: boolean,
        messagesPush: boolean,
        messagesText: boolean,
    }>())

    export const editUserInfo = createAction("EDIT_USER_INFO", props<{
        firstName:string,
        lastName:string,
        email:string,
        phone:string,
        country:string,
        city:string
    }>())

    export const addUser = createAction("ADD_USER", props<{
        firstName: string,
        lastName: string,
        nickname: string,
        email: string,
        phone: string,
        userId: string,
        country: string,
        city: string
    }>()) 
    
    export const editUser = createAction("EDIT_USER", props<{
        firstName: string,
        lastName: string,
        nickname: string,
        email: string,
        phone: string,
        userId: string,
        country: string,
        city: string
    }>())
}