import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import counterReducer from "./counterSlice";
import cartSlice from "./cartSlice";
import loadingSlice from "./loadingSlice";
import trackSlice from "./trackSlice";
import likedSlice from "./likedSlice";
import recommendSlice from "./listSong/recommendSlice";

const persistConfig = {
  key: "root",
  storage
};

const rootReducer = combineReducers({
  counter: counterReducer,
  cart: cartSlice,
  loading: loadingSlice,
  track: trackSlice,
  liked: likedSlice,
  song: recommendSlice
  // other slices
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
