import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type EventCardProps = {
  titleEvent: string;
  typeEvent: string;
  addressEvent: string;
  dateAndHourEvent: string;
  isAvailable: boolean;
  onClick: () => void;
};

const EventCard = (props: EventCardProps) => {
  const { titleEvent, typeEvent, addressEvent, dateAndHourEvent, isAvailable } =
    props;

  const isAvailable2 = isAvailable
    ? styles.areaofDescription
    : styles.areaofDescriptionDisabled;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F973AD', '#BCA3EB']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientBackground}
      >
        <View style={styles.label}>
          <Text style={styles.labelText}>{typeEvent}</Text>
        </View>
        <Text style={styles.eventTile}> {titleEvent} </Text>
      </LinearGradient>

      <View
        style={
          isAvailable
            ? styles.areaofDescription
            : styles.areaofDescriptionDisabled
        }
      >
        <Text style={styles.eventDescription}>
          <Text style={{ fontWeight: 700 }}>End. </Text>: {addressEvent}
        </Text>
        <Text style={styles.eventDescription}>
          <Text style={{ fontWeight: 700 }}>Data </Text>: {dateAndHourEvent}
          <FontAwesome name="clock-o" size={16} color="black" />
        </Text>

        <TouchableOpacity
          style={{
            width: 328,
            height: 31,
            backgroundColor: '#70AC3A',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 24,
          }}
        >
          <Text style={{ color: '#FFFF', fontWeight: 700, fontSize: 16 }}>
            Informações
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventCard;
