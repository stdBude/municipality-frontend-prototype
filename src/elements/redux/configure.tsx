import { configureStore } from "@reduxjs/toolkit";

import { munticipalityApi } from "./APIs";
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [munticipalityApi.reducerPath]: munticipalityApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(munticipalityApi.middleware),
});

export default store;
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;