import {View, Text,} from "react-native";
import styles from "./style";
import Icon from "@react-native-vector-icons/fontawesome6";


const EventCard = () =>{
    return(
        <View style = {styles.container}>
            <View style = {styles.gradientBackground} >
                <Text>Campeonato</Text>
                <Text>Copa Passa Bola - 4ª edição</Text>
            </View>

            <View>
                <Text>End.: Rua Passa Bola, nº 123 - Centro, SP.</Text>
                <Text>Data: 01/06  12:00h</Text> 
            </View>
        </View>
    );
}


export default EventCard