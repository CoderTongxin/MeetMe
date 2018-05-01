import {AsyncStorage} from "react-native";

export function storeUserInfo(loggedInUser) {
    AsyncStorage.setItem('user',JSON.stringify(loggedInUser),()=>{
        // console.log(loggedInUser)
    });
}
export function getUserInfo(user, fn){
    AsyncStorage.getItem(user, (err, result) => {
        fn(JSON.parse(result));
    });
}

