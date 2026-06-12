import {Text, TextInput, StyleSheet, FlatList, View, TouchableOpacity, Image} from "react-native";
import {useState} from "react";
import RecipeCard from "@/src/components/RecipeCard";
import {HomeStackParamList} from "@/src/navigation/AppNavigator";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useGetMealByNameQuery, useLazyGetRandomMealQuery} from '../../services/api'
import { useDebounce } from "use-debounce";

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export default function HomeScreen({navigation}: Props) {

    const [query, setQuery] = useState('')

    const [debounceQuery, setDebounceQuery] = useDebounce(query, 500) //relance la recherche toutes les 500ms, évite de lancer la recherche à chaque lettre
    const [randomMeal] = useLazyGetRandomMealQuery()

    const { data, error, isLoading } = useGetMealByNameQuery(debounceQuery)

    const handleRandom = async () => {
        const result = await randomMeal()
        if (result.data?.meals?.[0]) {
            navigation.navigate('Detail', { idMeal: result.data.meals[0].idMeal })
        }
    }

    if(isLoading) {
        return <Text>isLOadinf</Text>
    }
    if(error) {
        return <Text> uen erreur est survenu </Text>
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Rechercher une recette..."
                value={query}
                onChangeText={setQuery}
            />

            <TouchableOpacity style={styles.card} onPress={handleRandom}>
                <View style={styles.info}>
                    <Text style={styles.title}>Surprise !</Text>
                </View>
            </TouchableOpacity>

            {data?.meals ?
                <FlatList
                    data={data.meals}
                    keyExtractor={(item) => item.idMeal}
                    renderItem={({ item }) => (
                        <RecipeCard
                            meal={item}
                            onPress={() => navigation.navigate('Detail', { idMeal: item.idMeal })}
                        />
                    )}
                />
                :
                <Text>Aucune recette trouvée</Text>
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        margin: 16,
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
        fontSize: 15,
        elevation: 2,
    },
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
});