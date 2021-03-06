import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container : {
        flex: 1,
        padding:20,
        backgroundColor: '#ffffff'
    },
    textContent : {
        flexGrow: 1,
        alignItems:'flex-end',
        justifyContent :'center',
        paddingVertical:16,
        flexDirection:'row'
    },
    text: {
        color:'#000000',
        fontSize:16
    },
    textLink: {
        color:'#616161',
        fontSize:16,
        fontWeight:'500'
    },
    inputContainer : {
        flexGrow: 1,
        justifyContent:'center',
        alignItems: 'center'
    },

    inputBox: {
        width: 280,
        backgroundColor: '#c1c1c1',
        borderRadius: 20,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#000000',
        marginVertical: 10,
        height: 25
    },

});
