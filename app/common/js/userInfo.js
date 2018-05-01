import {AsyncStorage} from "react-native";

export function storeUserInfo(loggedInUser) {
    AsyncStorage.setItem('user',JSON.stringify(loggedInUser));
}


