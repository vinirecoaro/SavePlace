import { Appearance } from "react-native";
const isDarkMode = Appearance.getColorScheme() == 'dark'

const FontConstants = {
    color: isDarkMode ? "#FFFFFF" : "#023047",
    sizeTitle: 28,
    sizeSubtitle: 24,
    sizeLabel: 20
}

const ColorConstants = {
    backgroundColor: isDarkMode ? "#023047" : "#FFFFFF"
}

const SizeConstants = {

}

export {
    FontConstants,
    ColorConstants,
    SizeConstants
}