import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { albums_api } from "./apis/albums-api";
import { photos_api } from "./apis/photos-api";
import { users_api } from "./apis/users-api";
import { main_slice } from "./slices/main-slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [users_api.reducerPath]: users_api.reducer,
    [albums_api.reducerPath]: albums_api.reducer,
    [photos_api.reducerPath]: photos_api.reducer,

    [main_slice.name]: main_slice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(users_api.middleware, albums_api.middleware, photos_api.middleware),
});

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

setupListeners(store.dispatch);
