import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {Meal, MealsResponse} from "@/src/types/meal";

export const mealApi = createApi({
    reducerPath: 'mealApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
    endpoints: (build) => ({
        getMealByName: build.query<MealsResponse, string>({
            query: (name) => `search.php?s=${name}`,
        }),
        getMealById: build.query<MealsResponse, string>({
            query: (id) => `lookup.php?i=${id}`,
        }),
        getRandomMeal: build.query<MealsResponse, void>({
            query: () => `random.php`
            }
        ),
        getAllCategories: build.query<MealsResponse, void>({
            query: () => `categories.php`
        })
    }),
})


export const { useGetMealByNameQuery, useGetMealByIdQuery, useGetAllCategoriesQuery, useGetRandomMealQuery } = mealApi