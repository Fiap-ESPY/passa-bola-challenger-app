import { Image, Text, View } from 'react-native';
import styles from './style';

const TeamsCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.labelText}> Confronto </Text>
      </View>

      <View style={styles.teamsContainer}>
        <View style={styles.teams}>
          <View style={styles.teamsSection}>
            <View style={styles.teamsIcons}>
              <Image
                source={require('@/assests/example_team.png')}
                style={{ width: '90%', height: '90%' }}
                alt='Example team'
              />
            </View>

            <Text style={styles.nameTeams}> Nome 1 </Text>

            <View style={styles.score}>
              <Text style={styles.scoreText}> 0 </Text>
            </View>
          </View>

          <Image
            source={require('@/assests/hugeicons_versus.png')}
            style={{ width: 44, height: 44 }}
            alt="Versus icon"
          />

          <View style={styles.teamsSection}>
            <View style={styles.teamsIcons}>
              <Image
                source={require('@/assests/example_team.png')}
                style={{ width: '90%', height: '90%' }}
                alt="Example team"
              />
            </View>

            <Text style={styles.nameTeams}> Nome 1 </Text>

            <View style={styles.score}>
              <Text style={styles.scoreText}> 0 </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TeamsCard;
