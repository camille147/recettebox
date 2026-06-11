import {Meal} from "@/src/types/meal";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface favoriteSlice {meal: Meal[]}

const initialState: favoriteSlice = {meal: []}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Meal>) => {
            const found = state.meal.findIndex((i) => i.idMeal === action.payload.idMeal);
            if (found !== -1) {
                state.meal.splice(found, 1);
            } else {
                state.meal.push(action.payload);
            }
        }
    }

})


export const {toggleFavorite} = favoriteSlice.actions
export default favoriteSlice.reducer