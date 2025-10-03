import { View } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const Dashboard = ({ data<Array>}) => {
    const barData = [
        { value: 250, label: 'Jan' },
        { value: 500, label: 'Fev' },
        { value: 700, label: 'Mar' },
        { value: 300, label: 'Mai' },
        { value: 600, label: 'Abr' },
        { value: 250, label: 'Jun' },
        { value: 300, label: 'Jul' },
        { value: 300, label: 'Ago' },
        { value: 300, label: 'Set' },
        { value: 300, label: 'Out' },
        { value: 300, label: 'Nov' },
        { value: 300, label: 'Dez' },
    ];

    return (
        <View>
            <BarChart
                data={barData}
                barBorderRadius={4}
                barWidth={22}
                frontColor="#e6e3e6"
                noOfSections={6}
            />
        </View>
    )

}

export default Dashboard