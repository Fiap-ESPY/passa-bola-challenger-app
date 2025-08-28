import { View, Text, TouchableOpacity } from "react-native";
import styles from "./style";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const EventCard = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F973AD", "#BCA3EB"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <View style={styles.label}>
          <Text style={styles.labelText}>Campeonato</Text>
        </View>
        <Text style={styles.eventTile}> Copa Passa Bola - 4ª edição</Text>
      </LinearGradient>

      <View style={styles.areaofDescription}>
        <Text style={styles.eventDescription}>
          <Text style={{ fontWeight: 700 }}>End. </Text>: Rua Passa Bola, nº 123
          - Centro, SP.
        </Text>
        <Text style={styles.eventDescription}>
          <Text style={{ fontWeight: 700 }}>Data </Text>: 01/06{" "}
          <FontAwesome name="clock-o" size={16} color="black" /> 12:00h
        </Text>

        <TouchableOpacity
          style={{
            width: 328,
            height: 31,
            backgroundColor: "#70AC3A",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 24,
          }}
        >
          <Text style={{ color: "#FFFF", fontWeight: 700, fontSize: 16 }}>
            Informações
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventCard;
