import {configureStore} from "@reduxjs/toolkit" 
// import authReducer from "../features/authSlice.js"; 
import rootRedcuer from "./rootRedcuer";
import { authApi } from "../features/api/authApi.js";
import { courseApi } from "../features/api/courseApi.js";
import { purchaseApi } from "../features/api/purchaseApi.js";
import { courseProgressApi } from "@/features/api/courseProgressApi";


export const appStore = configureStore({
    reducer: rootRedcuer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware, courseApi.middleware, purchaseApi.middleware, courseProgressApi.middleware)
});


const initializeApp = async () => {
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();