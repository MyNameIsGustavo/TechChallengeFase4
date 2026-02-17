import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface Props<T> {
    dados: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    titulo?: string;
}

export function GraficoLinha<T>({
    dados,
    getLabel,
    getValue,
    titulo,
}: Props<T>) {

    const data = {
        labels: dados.map(getLabel),
        datasets: [
            {
                data: dados.map(item => Number(getValue(item)) || 0),
                strokeWidth: 2,
            },
        ],
    };

    return (
        <View style={styles.container}>
            {titulo && <Text style={styles.titulo}>{titulo}</Text>}

            <LineChart
                data={data}
                width={screenWidth - 32}
                height={220}
                bezier
                fromZero
                yAxisSuffix=""
                chartConfig={{
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 0,
                    color: (opacity = 1) =>
                        `rgba(6, 155, 255, ${opacity})`,
                    labelColor: () => "#000",
                }}
                style={styles.grafico}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        margin: "auto",
    },
    titulo: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#000",
    },
    grafico: {
        borderRadius: 8,
    },
});
