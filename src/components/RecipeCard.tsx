import {Text, Image, TouchableOpacity, StyleSheet, View} from "react-native";
import {Meal} from "@/src/types/meal";

type Props = {
    meal: Meal
    onPress: () => void
}

export default function RecipeCard({meal, onPress}: Props) {
    return(
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: meal.strMealThumb }}
                style={styles.image}
            />
            <View style={styles.info}>
                <Text style={styles.title}>{meal.strMeal}</Text>
                <Text style={styles.category}>{meal.strCategory}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginHorizontal: 16,
        marginVertical: 8,
        overflow: 'hidden',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    category: {
        fontSize: 13,
        color: '#888',
    },
});