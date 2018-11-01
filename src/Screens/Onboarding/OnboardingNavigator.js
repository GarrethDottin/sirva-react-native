import { StackNavigator } from 'react-navigation';

import Review1Screen from './Review1Screen';
import Review2Screen from './Review2Screen';
import Review3Screen from './Review3Screen';

export const OnboardingNavigator = StackNavigator(
    {
        Review1: { screen: Review1Screen },
        Review2: { screen: Review2Screen },
        Review3: { screen: Review3Screen }
    }, { headerMode: 'none' });
