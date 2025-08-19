import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container:{
        width: 361, 
        height: 230,
        marginLeft: 35,
       
        
    },

    gradientBackground:{
        backgroundColor: "#F973AD", 
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingLeft: 14,
        flex: 1,
        justifyContent: "space-around"
    }, 

    areaofDescription: {
        flex: 1,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        boxShadow: "0px 4px 8px rgba(0,0,0,0.25)",
        justifyContent: "space-evenly",
        paddingLeft: 18,
    },

    label:{
        backgroundColor: "#FFFFFF",
        width:125, 
        height: 25,
        paddingLeft: 14,
        borderRadius: 32,
        justifyContent: "center",
        marginBottom: 40,
        marginTop: 15,
       
    },

    labelText:{
        color: "#9A9A9A",
        fontWeight: 600, 
        fontSize: 16,
    },

    eventTile:{
        fontSize: 18, 
        fontWeight: 700,
       
    },

    eventDescription:{
         fontSize: 16, 
        fontWeight: 500,
    }
    
    


})

export default styles