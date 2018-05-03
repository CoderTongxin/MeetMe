export function preventMultipleClick(load,navigation) {
    if(load){
        load=false;
        navigation.navigate('Profile');
        setTimeout(() => {
            load = true;
        }, 700);
    }
}