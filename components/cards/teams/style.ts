import {StyleSheet} from "react-native"


const styles = StyleSheet.create({
    container:{
        width: 365, 
        height: 280,
        borderWidth: 1,
        borderColor: "#000000ff",
        borderRadius: 16, 
        marginLeft: 40,
        marginTop: 50, 

    },
    
    label:{
        backgroundColor: "#9A9A9A",
        width: 100, 
        height: 25,
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 32, 
        marginTop: 17,
        marginLeft: 16, 

       
    },

    labelText:{
        color: "#FFF",
        fontWeight: 600, 
        fontSize: 16,

    },

    teamsContainer:{
        marginTop: 25,
        width: "100%", 
        height: 169,
        alignItems: "center",
        
        
    }, 

    teams:{
        width: 295,
        backgroundColor: "#0022ee",
        height: 82,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginBottom: 22,

    }, 

    teamsIcons:{
        borderRadius: "100%",
        backgroundColor: "#D9D9D9",
        width:80,
        height: 80, 
        alignItems: "center",
        justifyContent: "center",

    },

    staticGame:{
        width: 290,
        height: 68,
        alignItems: "center",
        backgroundColor: "red"
    },

    nameteamsDiv:{
        width: 295, 
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 14,
        paddingRight: 14,

    }, 

    nameTeams:{
        fontSize: 12, 
        color: "#9A9A9A",
        fontWeight: 500,

    },


    score:{
        width: 295, 
        flexDirection: "row", 
        justifyContent: "space-between",
        paddingLeft: 40,
        paddingRight: 40,
    },

    scoreText:{
        fontSize: 32,
        fontWeight: 500,

    }

})



export default styles