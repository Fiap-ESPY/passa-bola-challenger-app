import { StatusBar, ActivityIndicator } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { CardContainer, ChartTitle, ScreenContainer } from "./styles";
import { useEffect, useState } from "react";
import { NewsDocument, newsService } from "@/services/news/newsService";

const DEFAULT_BAR_COLOR = '#6c63ff';

interface ChartDataItem {
    value: number;
    label: string;
    frontColor?: string;
    showValuesOnTop?: boolean;
    topLabelContainerStyle?: object;
    topLabelTextStyle?: object;
}

const aggregateNewsByMonth = (newsList: NewsDocument[]): ChartDataItem[] => {
    const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

    const monthlyTotals = new Array(12).fill(0);

    newsList.forEach(news => {
        const views = news.viewCount || 0;
        if (news.createdAt) {
            const date = news.createdAt.toDate();
            const monthIndex = date.getMonth();
            monthlyTotals[monthIndex] += views;
        }
    });

    const currentMonthIndex = new Date().getMonth();
    const finalChartData: ChartDataItem[] = [];

    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonthIndex - i + 12) % 12;

        finalChartData.push({
            label: monthLabels[monthIndex],
            value: monthlyTotals[monthIndex],
        });
    }

    return finalChartData;
}

const Dashboard = () => {
    const [chartData, setChartData] = useState<ChartDataItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [dynamicMaxValue, setDynamicMaxValue] = useState(100);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const newsList = await newsService.getAllNews();
                const aggregatedData = aggregateNewsByMonth(newsList);

                const maxValue = Math.max(...aggregatedData.map(item => item.value));
                const roundedMaxValue = Math.ceil(maxValue / 100) * 100;
                setDynamicMaxValue(roundedMaxValue > 0 ? roundedMaxValue : 100);

                const styledBarData = aggregatedData.map(item => ({
                    ...item,
                    frontColor: DEFAULT_BAR_COLOR,
                    showValuesOnTop: true,
                    topLabelContainerStyle: { marginTop: 4 },
                    topLabelTextStyle: { color: '#333', fontSize: 10, fontWeight: '600' },
                }));

                setChartData(styledBarData);

            } catch (error) {
                console.error("Erro ao carregar dados do gráfico:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ScreenContainer>
            <StatusBar barStyle="dark-content" />
            <CardContainer>
                <ChartTitle>Performance das notícias (cliques)</ChartTitle>

                {isLoading ? (
                    <ActivityIndicator size="large" color={DEFAULT_BAR_COLOR} style={{ height: 250 }} />
                ) : (
                    <BarChart
                        data={chartData}
                        isAnimated
                        barWidth={20}
                        barBorderRadius={4}
                        spacing={20}
                        rulesType="dashed"
                        rulesColor="#E0E0E0"
                        yAxisThickness={0}
                        yAxisTextStyle={{ color: '#555' }}
                        noOfSections={4}
                        xAxisThickness={0}
                    />
                )}
            </CardContainer>
        </ScreenContainer>
    )
}

export default Dashboard;