import {Image, Text, View, StyleSheet, TouchableOpacity, ScrollView, Linking} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {HomeStackParamList} from "@/src/navigation/AppNavigator";
import {useGetMealByIdQuery} from "@/src/services/api";
import {getIngredients} from "@/src/utils/getIngredients";
import {RootState} from "@/src/app/store";
import {useSelector, useDispatch} from "react-redux";
import {toggleFavorite} from "@/src/features/favorites/favoriteSlice";
import {Ionicons} from "@expo/vector-icons";

type Props = NativeStackScreenProps<HomeStackParamList, 'Detail'>;

export default function DetailsScreen({route} : Props) {

    const favoriteItems = useSelector((state: RootState) => state.favorites.meal);
    const dispatch = useDispatch();


    const {idMeal} = route.params
    const {data, isError, isLoading} = useGetMealByIdQuery(idMeal)

    if(isLoading) {
        return <Text>isLOadinf</Text>
    }
    if(!data?.meals) {
        return <Text> Aucune info</Text>
    }
    if(isError) {
        return <Text> uen erreur est survenu </Text>

    }

    const meal = data.meals[0]
    const ingredients = getIngredients(meal)
    const estFavori = favoriteItems.some((i) => i.idMeal === meal.idMeal)

    return (
        <ScrollView style={styles.container}>

            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

            <View style={styles.content}>

                <Text style={styles.title}>{meal.strMeal}</Text>
                <View style={styles.meta}>
                    <Text style={styles.badge}>{meal.strCategory}</Text>
                    {meal.strArea ?
                        <Text style={styles.badge}>{meal.strArea}</Text>
                        :
                        null
                    }

                </View>
                <TouchableOpacity style={styles.favoriteBtn}  onPress={() => dispatch(toggleFavorite(meal))}>
                    <Text style={{ fontSize: 24 }}>{estFavori ? <Ionicons name="heart-circle" size={30} color="red" /> : <Ionicons name="heart-circle-outline" size={30} color="black" />}</Text>
                </TouchableOpacity>


                <Text style={styles.sectionTitle}>Ingrédients</Text>
                {ingredients.map((ing, index) => (
                    <View key={index} style={styles.ingredientRow}>
                        <Text style={styles.ingredientName}>{ing.name}</Text>
                        <Text style={styles.ingredientMeasure}>{ing.measure}</Text>
                    </View>
                ))}

                <Text style={styles.sectionTitle}>Instructions</Text>
                <Text style={styles.instructions}>{meal.strInstructions}</Text>

                {meal.strYoutube ?
                    <TouchableOpacity
                        style={styles.videoBtn}
                        onPress={() => Linking.openURL(meal.strYoutube as string)}
                    >
                        <Text style={styles.videoBtnText}> Voir la vidéo</Text>
                    </TouchableOpacity>
                 : null}

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    centered: {
        flex: 1,
        textAlign: 'center',
        marginTop: 100,
    },
    image: {
        width: '100%',
        height: 250,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    meta: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },
    badge: {
        backgroundColor: '#e63946',
        color: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        fontSize: 12,
    },
    favoriteBtnText: {
        color: '#e63946',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        marginTop: 8,
    },
    ingredientRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    ingredientName: {
        fontSize: 15,
    },
    ingredientMeasure: {
        fontSize: 15,
        color: '#888',
    },
    instructions: {
        fontSize: 15,
        lineHeight: 24,
        color: '#333',
    },
    favoriteBtn: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 24,
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    videoBtn: {
        backgroundColor: '#e63946',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginTop: 16,
    },
    videoBtnText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})
