import {Meal} from "@/src/types/meal";

type Ingredient = {
    name: string
    measure: string
}

export function getIngredients(meal: Meal): Ingredient[] {
    const ingredients: Ingredient[] = []

    for (let i = 1; i <= 20; i++) {
        const name = meal[`strIngredient${i}` as keyof Meal]
        const measure = meal[`strMeasure${i}` as keyof Meal]

        if(!name || name.trim() === '') break

        ingredients.push({name, measure: measure ?? ''})
    }

    return ingredients
}