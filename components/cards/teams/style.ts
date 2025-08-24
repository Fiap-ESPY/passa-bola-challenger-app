import {StyleSheet} from "react-native"


const styles = StyleSheet.create({
    container:{
        width: 365, 
        height: 280,
        borderWidth: 1,
        backgroundColor: "#0022ee",
        borderColor: "#E4E4E4",
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
        alignItems: "center"
        
        
    }, 

    teams:{
        backgroundColor: "#D9D9D9",
        width: 290,
        height: 168,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }, 

    teamsIcons:{
        backgroundColor: "#e00505ff",
        width:80,
        height: 80, 
        borderRadius: "100%",
        alignItems: "center",
        justifyContent: "center"
    },

    
})



export default styles