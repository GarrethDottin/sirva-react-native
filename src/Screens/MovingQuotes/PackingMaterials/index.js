import PackingMaterialsWrapper from "./PackingMaterialsWrapper";
import PackingMaterialsDetailScreen from "./PackingMaterialsDetailScreen";
import PackingMaterialsOrderSuccessScreen from "./PackingMaterialsOrderSuccessScreen";
import PackingMaterialsOrderDetailScreen from "./PackingMaterialsOrderDetailScreen";
import Colors from '../../../Theme/Colors';

export const PackingMaterialsNavigationDefinition = {
    PackingMaterialsList: {
        screen: PackingMaterialsWrapper,
        navigationOptions: {
            title: "Packing Supplies",
        }
    },
    PackingMaterialsDetail: {
        screen: PackingMaterialsDetailScreen,
        navigationOptions: {
            title: "Details"
        }
    },
    PackingMaterialsOrderSuccess: {
        screen: PackingMaterialsOrderSuccessScreen,
        navigationOptions: {
            title: 'Order Confirmation',
            headerLeft: null,
            headerRight: null,
            headerStyle: {
                backgroundColor: Colors.white,
            },
        }
    },
    PackingMaterialsOrderDetailScreen: {
        screen: PackingMaterialsOrderDetailScreen,
        navigationOptions: {
            title: "Packing Materials"
        }
    }
}
