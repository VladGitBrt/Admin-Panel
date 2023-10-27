import { createFeatureSelector,createSelector, State, Store } from "@ngrx/store";
import { IUserList } from "src/app/models/models";

export namespace AppSelectors {
    export const state = createFeatureSelector<IUserList>('app');
    export const userList = createSelector(state, (state)=>state.userList);
    export const dashboardData = createSelector(state, (state)=>state.dashboardData);
    export const currentUser = createSelector(state, state=> state.currentUser);
    export const currentNotification = createSelector(state, state=> state.notifications);
}