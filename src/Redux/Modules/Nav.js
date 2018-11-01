import { AppNavigator } from '../../AppNavigator';


const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Landing')
);

const nav = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

export default nav;
