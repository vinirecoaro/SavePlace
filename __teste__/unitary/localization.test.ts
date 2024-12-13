import Localization, { calculateDistanceBetweenLocalizations } from "@/model/localization"

describe('Localization functions', ()=>{
    it('should calculate the distance between two valid localizations', ()=>{
        const loc1 : Localization = new Localization(
            "",
            "",
            "-23.5505",
            "-46.6333",
            ""
        )

        const loc2 : Localization = new Localization(
            "",
            "",
            "-22.9068",
            "-43.1729",
            ""
        )

        const distance = calculateDistanceBetweenLocalizations(loc1,loc2)

        expect(distance).toBeCloseTo(360.75,2)
    })

    it('should return 0 for the distance between the same point', () => {
        const loc1 : Localization = new Localization(
            "",
            "",
            "-23.5505",
            "-46.6333",
            ""
        )

        const loc2 : Localization = new Localization(
            "",
            "",
            "-23.5505",
            "-46.6333",
            ""
        )

        const distance = calculateDistanceBetweenLocalizations(loc1,loc2)

        expect(distance).toBeCloseTo(0,0)
    })
})