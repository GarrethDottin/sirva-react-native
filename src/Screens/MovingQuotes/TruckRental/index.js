import TruckQuoteListScreen from "./TruckQuoteListScreen";
import TruckQuoteDetailScreen from "./TruckQuoteDetailScreen";

export const TruckRentalNavigationDefinition = { 
    TruckQuoteList: {
        screen: TruckQuoteListScreen,
        navigationOptions: {
            title: 'Rental Trucks'
        }
    },
    TruckQuoteDetail: {
        screen: TruckQuoteDetailScreen,
        navigationOptions: {
            title: 'Estimate Details'
        }
    }
}
