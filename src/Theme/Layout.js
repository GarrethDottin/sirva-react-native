import { Dimensions } from 'react-native'
import  Variables  from './Variables'

export default Layout = {
    fullHeight: {
        minHeight: Dimensions.get('window').height
    },
    screenWrapper: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
    },
    screenWrapperAlt: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'stretch',
        backgroundColor:'transparent'
    },
    bottomSpacer: {
        paddingBottom: 50
    },
    outerContainer: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
        paddingBottom: 12,
        paddingTop: 24,
        width: '100%',
    },
    outerContainerAlt: {
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    },
    innerContainerNarrowed: {
        paddingLeft:38,
        paddingRight:38,
    },
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
    },
    contentContainer: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems: 'center',
        width: '100%',
        paddingLeft: Variables.smallGutter,
        paddingRight: Variables.smallGutter,
    },
    vCenter: {
        justifyContent: 'center',
    },
}
