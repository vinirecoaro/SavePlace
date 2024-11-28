import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark'

const FontConstants = {
    color: isDarkMode ? "#FFFFFF" : "#000000",
    sizeTitle: 28,
    sizeSubtitle: 24,
    sizeLabel: 20
}

const ScreenConstants = {
    backgroundColor: isDarkMode ? "#023047" : "#FFFFFF"
}

const ButtonConstants = {
    backgroundColor: "#f4511e",
    textColor: "#FFFFFF"
}

const InputConstants = {
    backgroundColor: isDarkMode ? '#000000' : "#FFFFFF",
    borderBottomColor: isDarkMode ? '#FFFFFF': "#000000",
}

export {
    FontConstants,
    ScreenConstants,
    ButtonConstants,
    InputConstants
}