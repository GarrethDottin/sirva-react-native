import LaborLandingScreen from './LaborLandingScreen';
import LaborDateTimeScreen from './LaborDateTimeScreen';
import LaborWorkersScreen from './LaborWorkersScreen';
import LaborReviewScreen from './LaborReviewScreen';
import LaborSuccessScreen from './LaborSuccessScreen';
import LaborOrderHistoryScreen from './LaborOrderHistoryScreen';
import LaborOrderDetailScreen from './LaborOrderDetailScreen';
import LaborLocationScreen from './LaborLocationScreen';
import { blueHeaderNavigationOptions } from '../../Theme';

export const LaborNavigationDefinition = {
    LaborLanding: {
        screen: LaborLandingScreen,
        navigationOptions: {
            title: "Labor",
        }
    },
    LaborDateTime: {
        screen: LaborDateTimeScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: "Hire Helpers",
        }
    },
    LaborLocation: {
        screen: LaborLocationScreen,
        navigationOptions: {
            ...blueHeaderNavigationOptions,
            title: "Hire Helpers",
        }
    },
    LaborWorkers: {
        screen: LaborWorkersScreen,
        navigationOptions: {
            title: "Hire Helpers",
        }
    },
    LaborReview: {
        screen: LaborReviewScreen,
        navigationOptions: {
            title: "Review Order",
        }
    },
    LaborSuccess: {
        screen: LaborSuccessScreen,
        navigationOptions: {
            title: "Order Confirmation",
            headerLeft: null,
            headerRight: null
        }
    },
    LaborOrderHistory: {
        screen: LaborOrderHistoryScreen,
        navigationOptions: {
            title: "Labor",
        }
    },
    LaborOrderDetail: {
        screen: LaborOrderDetailScreen,
        navigationOptions: {
            title: "Order Details",
        }
    }
}
