import * as React from "react";
import { Avatar, Card } from "react-native-paper";
import { StyleSheet, TouchableOpacity } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";

interface CartaoListaProps<T> {
    item: T;
    getNome: (item: T) => string;
    getData: (item: T) => string;
    getImagem: (item: T) => string;
    aoDeletar?: (item: T) => void;
    aoPressionar?: (item: T) => void;
}


export function CartaoLista<T>({
    item,
    getNome,
    getData,
    getImagem,
    aoDeletar,
    aoPressionar,
}: CartaoListaProps<T>) {
    return (
        <TouchableOpacity
            onPress={() => aoPressionar?.(item)}
            style={styles.container}
        >
            <Card.Title
                title={getNome(item)}
                subtitle={getData(item)}
                left={(props) => (
                    <Avatar.Image
                        {...props}
                        source={{ uri: getImagem(item) }}
                    />
                )}
                right={() =>
                    aoDeletar ? (
                        <EvilIcons
                            name="trash"
                            size={30}
                            color="black"
                            onPress={() => aoDeletar(item)}
                        />
                    ) : null
                }
            />
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 6,
        backgroundColor: "#f5f5f5",
    },
});