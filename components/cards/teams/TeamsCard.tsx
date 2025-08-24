import { View, Text, Image } from "react-native";
import styles from "./style";

const TeamsCard = () => {
  return (
    <View style={styles.container}>

      <View style={styles.label}>
        <Text style={styles.labelText}> Confronto </Text>
      </View>

      <View style={styles.teamsContainer}>

        <View style={styles.teams}>
          <View style={styles.teamsIcons}>
            <Image
              source={require("@/assests/example_team.png")}
              style={{ width: "90%", height: "90%"}}
            />
          </View>
          <Image
            source={require("@/assests/hugeicons_versus.png")}
            style={{ width: 44, height: 44 }}
          />
          <View style={styles.teamsIcons}>
            <Image
              source={require("@/assests/example_team.png")}
              style={{ width: "90%", height: "90%" }}
            />
          </View>
        </View>

         <View style ={styles.staticGame}>
            <View style = {styles.nameteamsDiv}>
              <Text style={styles.nameTeams} >Nome Time 1</Text>
              <Text  style={styles.nameTeams} >Nome Time 2</Text>
            </View>

             <View style={styles.score}> 
              <Text style ={styles.scoreText} >0</Text>
              <Text style ={styles.scoreText} >3</Text>
            </View>


          </View>

      </View>
    </View>
  );
};

export default TeamsCard;
