import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark'

const FontConstants = {
    color: isDarkMode ? "#FFFFFF" : "#000000",
    placeHolderTextColor: isDarkMode ? "#A9A9A9" : "#696969",
    sizeTitle: 28,
    sizeSubtitle: 24,
    sizeLabel: 20
}

const ScreenConstants = {
    backgroundColor: isDarkMode ? "#303030" : "#fffcf6"
}

const ButtonConstants = {
    backgroundColor: "#f4511e",
    textColor: "#FFFFFF"
}

const InputConstants = {
    backgroundColor: isDarkMode ? '#303030' : "#fffcf6",
    borderBottomColor: isDarkMode ? '#FFFFFF': "#000000",
}

const appIcon = {
    dark: require("@/assets/images/appIcon.png"),
    light: require("@/assets/images/appIconLight.png"),
};

const IconConstants = {
    appIcon: isDarkMode ? appIcon.light : appIcon.dark
}

export {
    FontConstants,
    ScreenConstants,
    ButtonConstants,
    InputConstants,
    IconConstants
}