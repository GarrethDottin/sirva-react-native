import { printCost, printPercentage, printValue, printDegrees } from '../../Utils/ReactHelpers';

export const costOfLiving = (__) => {
    return {
        householdCost: (value1, value2) => {
          return { title: __('costOfLiving.houseHoldTitle'),
                  subtitle: __('costOfLiving.houseHoldSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        avgHomeSalePrice: (value1, value2) => {
          return { title: __('costOfLiving.avgHomeSaleTitle'),
                  subtitle: __('costOfLiving.avgHomeSaleSubtitle'),
                  item1: printCost(value1), item2: printCost(value2) }
        },
        avgPropertyTax: (value1, value2) => {
          return { title: __('costOfLiving.avgPropertyTaxTitle'), item1: printCost(value1), item2: printCost(value2) , item2Subtitle: __('costOfLiving.avgPropertyTaxItemSubtitle') }
        },
        utilitiesCostIndex: (value1, value2) => {
          return { title: __('costOfLiving.utilitiesTitle'), item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        estimateStudioPrice: (value1, value2) => {
          return { title: __('costOfLiving.estimateStudioTitle'), subtitle: __('costOfLiving.estimateBedroomSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        estimateOneBedroomPrice: (value1, value2) => {
          return { title: __('costOfLiving.estimateOneBedroomTitle'), subtitle: __('costOfLiving.estimateBedroomSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        estimateTwoBedroomPrice: (value1, value2) => {
          return { title: __('costOfLiving.estimateTwoBedroomTitle'), subtitle: __('costOfLiving.estimateBedroomSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        estimateThreeBedroomPrice: (value1, value2) => {
          return { title: __('costOfLiving.estimateThreeBedroomTitle'), subtitle: __('costOfLiving.estimateBedroomSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        },
        estimateFourBedroomPrice: (value1, value2) => {
          return { title: __('costOfLiving.estimateFourBedroomTitle'), subtitle: __('costOfLiving.estimateBedroomSubtitle'),
                  item1: printCost(value1), item2: printCost(value2), item2Subtitle: __('costOfLiving.permonth') }
        }
    }
}

export const demographic = (__) =>  {
    return {
        population: (value1, value2) => {
            return { title: __('demographics.populationTitle'), item1: printValue(value1), item2: printValue(value2) }
        },
        populationDensity: (value1, value2) => {
            return { title: __('demographics.populationDensityTitle'), item1: printValue(value1), item2: printValue(value2), item2Subtitle: __('demographics.populationDensityItem2Subtitle') }
        },
        americanIndianPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.americanIndianTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        asianPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.asianTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        blackPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.blackTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        islandersPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.islandersTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        hispanicPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.hispanicTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        whitePopulationPercentage: (value1, value2) => {
            return { title: __('demographics.whiteTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        nonHispanicPopulationPercentage: (value1, value2) => {
            return { title: __('demographics.nonHispanicTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        multiRacePopulationPercentage: (value1, value2) => {
            return { title: __('demographics.multiRaceTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        otherRacePopulationPercentage: (value1, value2) => {
            return { title: __('demographics.otherRaceTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        avgHouseholdIncome: (value1, value2) => {
            return { title: __('demographics.avgHouHoldTitle'), item1: printCost(value1), item2: printCost(value2) }
        }
    }
}

export const commute = (__) => {
    return {
        travelTime: (value1, value2) => {
            return { title: __('commute.travelTimeTitle'), item1: printValue(value1), item2: printValue(value2), item2Subtitle: __('commute.travelTimeItem2Subtitle') }
        },
        driveToWorkPercentage: (value1, value2) => {
            return { title: __('commute.driveToWorkTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        publicTransportToWorkPercentage: (value1, value2) => {
            return { title: __('commute.publicTransportTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        walkToWorkPercentage: (value1, value2) => {
            return { title: __('commute.walkToWorkTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        bikeToWorkPercentage: (value1, value2) => {
            return { title: __('commute.bikeToWork'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        motorcycleToWorkPercentage: (value1, value2) => {
            return { title: __('commute.motorcycleToWorkTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        },
        otherTransportToWorkPercentage: (value1, value2) => {
            return { title: __('commute.otherTransportTitle'), item1: printPercentage(value1), item2: printPercentage(value2) }
        }
    }
}

export const safety = (__) => {
    return {
        crimeRiskIndex: (value1, value2) => {
            return { title: __('safety.crimeRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        robberyRiskIndex: (value1, value2) => {
            return { title: __('safety.robberyRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        burglaryRiskIndex: (value1, value2) => {
            return { title: __('safety.burglaryRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        motorVehicleTheftRiskIndex: (value1, value2) => {
            return { title: __('safety.motoVehicleTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        larcenyRiskIndex: (value1, value2) => {
            return { title: __('safety.lacernyRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        assaultRiskIndex: (value1, value2) => {
            return { title: __('safety.assaultRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        rapeRiskIndex: (value1, value2) => {
            return { title: __('safety.rapeRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        },
        murderRiskIndex: (value1, value2) => {
            return { title: __('safety.murderRiskTitle'), subtitle: __('safety.allSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        }
    }
}

export const weather = (__) => {
    return {
        avg_max_temp_jan: (value1, value2) => {
            return { title: __('weather.avgMaxTempJanTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        avg_temp_jan: (value1, value2) => {
            return { title: __('weather.avgTempJanTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        avg_min_temp_jan: (value1, value2) => {
            return { title: __('weather.avgMinTempJanTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        avg_max_temp_jul: (value1, value2) => {
            return { title: __('weather.avgMaxTempJulTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        avg_temp_jul: (value1, value2) => {
            return { title: __('weather.avgTempJulTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        avg_min_temp_jul: (value1, value2) => {
            return { title: __('weather.avgMinTempJulTitle'), item1: printDegrees(value1), item2: printDegrees(value2) }
        },
        preciptation: (value1, value2) => {
            return { title: __('weather.precipitationTitle'), subtitle: __('weather.precipitationSubtitle'),
                    item1: printValue(value1), item2: printValue(value2) }
        }
    }
}

export const createInfoData = (mapper, oriInfo, destInfo) => {
    return Object.keys(mapper).map((key) => {
        value1 = oriInfo[key];
        value2 = destInfo[key];

        return  mapper[key](value1, value2);
    })
}
