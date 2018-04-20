import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container : {
        backgroundColor:'#f4f4f4',
        flex: 1,
        alignItems:'center',
        justifyContent :'center'
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
    dropdown: {
        width: 280,
        backgroundColor: '#c1c1c1',
        borderRadius: 20,
        paddingHorizontal: 16,
        marginVertical: 10,
        height: 25
    },
    dropdown_text: {
        fontSize: 18,
        color: '#000000'
    },
    dropdown_dropdown:{
        width: 250,
        marginTop:3,
        height:100
    },
    dropdown_dropdownText: {
        fontSize: 18,
        color: '#000000'
    }

});