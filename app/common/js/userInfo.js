import {AsyncStorage} from "react-native";

export function storeUserInfo(loggedInUserUID) {
    AsyncStorage.setItem('user',loggedInUserUID);
}


