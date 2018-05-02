import {AsyncStorage} from "react-native";

export function storeUserInfo(user) {
    AsyncStorage.setItem('user',JSON.stringify(user));
}


