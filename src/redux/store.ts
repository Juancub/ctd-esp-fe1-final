import { configureStore} from "@reduxjs/toolkit";
import imagesReducer from "../redux/dataSlice";

const store = configureStore({
   // Reducer ,
   
    reducer: {
        images: imagesReducer
    }

});

// Tipamos el hook useSelector y useDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;