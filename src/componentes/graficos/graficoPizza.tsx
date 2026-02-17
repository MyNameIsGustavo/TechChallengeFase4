import React from "react";
import { Dimensions, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface Props<T> {
    dados: T[];
    getLabel: (item: T) => string;
    getValue: (item: T) => number;
    titulo?: string;
}

export function GraficoPizza<T>({
    dados,
    getLabel,
    getValue,
    titulo,
}: Props<T>) {

    if (!dados || dados.length === 0) {
        return <Text style={{ textAlign: "center", color: "#777" }}>Sem dados</Text>;
    }

    const data = dados.map((item, index) => ({
        name: String(getLabel(item) ?? ""),
        population: Number(getValue(item)) || 0,
        color: index % 2 === 0 ? "#54a0f2" : "#c6c6c6",
        legendFontColor: "#000",
        legendFontSize: 12,
    }));

    return (
        <View>
            {titulo && (
                <Text style={{ textAlign: "center", fontWeight: "bold", marginBottom: 8 }}>
                    {titulo}
                </Text>
            )}

            <PieChart
                data={data}
                width={screenWidth - 32}
                height={220}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                chartConfig={{
                    color: () => "#000",
                }}
                absolute
            />
        </View>
    );
}
