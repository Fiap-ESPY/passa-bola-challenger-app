import { StatusBar, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { CardContainer, ChartTitle, ScreenContainer } from "./styles";

const Dashboard = () => {
    const barData = [
        { value: 413, label: 'Abr' },
        { value: 752, label: 'Jun' },
        { value: 606, label: 'Jul' },
        { value: 525, label: 'Ago' },
        { value: 500, label: 'Set' },
        { value: 150, label: 'Out' }
    ];

    return (
        <ScreenContainer>
            <StatusBar barStyle="dark-content" />
            <CardContainer>
                <ChartTitle>Performance das notícias (cliques)</ChartTitle>
                <BarChart
                    data={barData}
                    barBorderRadius={4}
                    barWidth={20}
                    frontColor="#6c63ff"
                    yAxisTextStyle={{ color: '#555' }}
                    xAxisLabelTextStyle={{ color: '#555' }}
                    noOfSections={6}
                />
            </CardContainer>
        </ScreenContainer>
    )
}

export default Dashboard