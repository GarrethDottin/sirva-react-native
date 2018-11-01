import Config from 'react-native-config';
import { Colors } from '../Theme'

//API @TODO: Make this build dependent
const baseApiUrl = Config.API_URL;
const apiVersion = 'v1'

const apiUrls = { }
apiUrls.login = `${baseApiUrl}${apiVersion}/transferee_token`
apiUrls.verifyLoginToken = `${baseApiUrl}${apiVersion}/transferee_token/verify`
apiUrls.verification = `${baseApiUrl}${apiVersion}/transferees/verification`
apiUrls.updatePassword = `${baseApiUrl}${apiVersion}/current/password`
//@TODO: Replace getAgreementData with getAllRelocationData
apiUrls.getAllRelocationData =`${baseApiUrl}${apiVersion}/current/relocation?include[]=origin_address&include[]=destination_address&include[]=transferee&include[]=company&include[]=company_address&include[]=hr_contact&include[]=relocation_counselor`
apiUrls.getAgreementData =`${baseApiUrl}${apiVersion}/current/relocation?include[]=origin_address&include[]=destination_address&include[]=transferee&include[]=company&include[]=company_address`
apiUrls.acceptAgreement =`${baseApiUrl}${apiVersion}/current/sign_repayment`
apiUrls.moodFeedback = `${baseApiUrl}${apiVersion}/current/mood_feedback_trackers`
apiUrls.updateRelocationInfo = `${baseApiUrl}${apiVersion}/current/relocation`
apiUrls.updateRelocationAddress = `${baseApiUrl}${apiVersion}/current/relocation/address`
apiUrls.saveNewDestinationAddress = `${baseApiUrl}${apiVersion}/current/relocation/destination_address`
apiUrls.getInventoryData = `${baseApiUrl}${apiVersion}/current/relocation?include[]=origin_address&include[]=destination_address&include[]=transferee&include[]=company`
apiUrls.getInventoryItemMatrix = `${baseApiUrl}${apiVersion}/inventory_matrix`
apiUrls.getMovingQuotes = `${baseApiUrl}${apiVersion}/current/relocation/moving_quotes?include[]=supplier`
apiUrls.requestMovingQuote = `${baseApiUrl}${apiVersion}/current/relocation/moving_quotes/request`
apiUrls.getTruckQuotes = `${baseApiUrl}${apiVersion}/current/relocation/truck_quotes`
apiUrls.getOffers = `${baseApiUrl}${apiVersion}/deals`
apiUrls.getMovingSupplies = `${baseApiUrl}${apiVersion}/moving_supplies`
apiUrls.supplyPricing = `${baseApiUrl}${apiVersion}/current/supply_order_info`
apiUrls.supplyOrders = `${baseApiUrl}${apiVersion}/current/supply_orders`
apiUrls.supplyOrdersWithSupply = `${baseApiUrl}${apiVersion}/current/supply_orders?include[]=supply`
apiUrls.resetPasswordRequest = `${baseApiUrl}${apiVersion}/transferees/reset_password`
apiUrls.verifyPasswordRequest = `${baseApiUrl}${apiVersion}/transferees/verify_reset_password_token`
apiUrls.resetPassword = `${baseApiUrl}${apiVersion}/transferees/password`
apiUrls.getDestinationWeather = `${baseApiUrl}${apiVersion}/current/relocation/weather`
apiUrls.verifyRoutingNumber = `${baseApiUrl}${apiVersion}/routing_numbers/`
apiUrls.createAchTransfer = `${baseApiUrl}${apiVersion}/current/relocation/ach_transfer`
apiUrls.sendMessageToReloSpecialists = `${baseApiUrl}${apiVersion}/current/relocation/message`
apiUrls.getRealEstateAgents = `${baseApiUrl}${apiVersion}/realtors?filter[city]={city}&filter[state]={state}&filter[zip_code]={zip}`
apiUrls.getRealEstateAgentsLatLng = `${baseApiUrl}${apiVersion}/realtors?filter[lat]={lat}&filter[lng]={lng}`
apiUrls.localizationJson = `${baseApiUrl}${apiVersion}/locales`
apiUrls.getLaborQuote = `${baseApiUrl}${apiVersion}/current/relocation/moving_labor_quotes/request_labor`
apiUrls.placeLaborOrder = `${baseApiUrl}${apiVersion}/current/relocation/moving_labor_quotes/book_moving_labor`
apiUrls.getLaborOrders = `${baseApiUrl}${apiVersion}/current/relocation/moving_labor_quotes/moving_orders?include[]=billing_address`
apiUrls.getCityNeighbourhoods = `${baseApiUrl}${apiVersion}/cities/{city_id}/neighbourhood`
apiUrls.getCityAreaInfo = `${baseApiUrl}${apiVersion}/cities/{city_id}/area_info`
apiUrls.citySearch = `${baseApiUrl}${apiVersion}/cities/search?filter[city_name]={city}&filter[state_code]={state}`
apiUrls.analyticEvent = `${baseApiUrl}${apiVersion}/analytics/events`
apiUrls.requestTempHousing = `${baseApiUrl}${apiVersion}/current/relocation/temp_house_requests/request_bookings`
apiUrls.requestRealtorLeadSubmission = `${baseApiUrl}${apiVersion}/current/realtors`
apiUrls.getLead = `${baseApiUrl}${apiVersion}/current/realtors/request_lead`
apiUrls.getSchools = `${baseApiUrl}${apiVersion}/current/relocation/schools?filter[category]={category}`
apiUrls.getTempHouses = `${baseApiUrl}${apiVersion}/current/relocation/temp_house_requests`
apiUrls.termsSeen = `${baseApiUrl}${apiVersion}/current/accept_terms_of_use`

const googleApiKey = 'AIzaSyDl8eH2cJYpKp_LfOZiogxpi7K6KRCuLN0'
//const googleApiKey = 'AIzaSyBwmLkR5RAh68Uxrv06POZIsk26jFgCej8'

const googleMapsApiData = {
    googleApiKey: googleApiKey,
    autocompleteBaseUrl: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${googleApiKey}&`,
    geocodeBaseUrl:  `https://maps.googleapis.com/maps/api/geocode/json?key=${googleApiKey}&`,
    placeDetailsBaseUrl: `https://maps.googleapis.com/maps/api/place/details/json?key=${googleApiKey}&`,
    autocompleteRange: 80000 //radius in meters (80000 is approx 50mi)
}

const externalUrls = {
    resetPassword: 'account/reset_password',
    login: 'account/login'
}

//Local Device storage
const iMoveDeviceStoragePrefix = '@iMoveDeviceStore'
const dsKeyAuthEmail = iMoveDeviceStoragePrefix + ':' + 'authEmail'
const dsKeyAuthToken = iMoveDeviceStoragePrefix + ':' + 'authToken'
const feedbackCounter = iMoveDeviceStoragePrefix + ':' + 'feedbackCounter'
const feedbackNeverShow = iMoveDeviceStoragePrefix + ':' + 'feedbackNeverShow'

const moodTrackerTempHousing = iMoveDeviceStoragePrefix + ':' + 'moodTrackerTempHousing'
const moodTrackerPackageMats =iMoveDeviceStoragePrefix + ':' + 'moodTrackerPackageMats'
const moodTrackerLabor =iMoveDeviceStoragePrefix + ':' + 'moodTrackerLabor'
const moodTrackerRealEstate =iMoveDeviceStoragePrefix + ':' + 'moodTrackerRealEstate'
const moodTrackerMoverQuote =iMoveDeviceStoragePrefix + ':' + 'moodTrackerMoverQuote'

const regexes = {
    email: /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
}

//Misc. App Variables
const navHeaderHeight = 64

const passwordData = {
    strengthLevels: [
        {
            label: 'Very Weak',
            labelColor: Colors.red,
            widthPercent: 25,
            innerBarColor: Colors.red
        },
        {
            label: 'Weak',
            labelColor: Colors.orange,
            widthPercent: 50,
            innerBarColor: Colors.orange
        },
        {
            label: 'Fair',
            labelColor: Colors.teal,
            widthPercent: 75,
            innerBarColor: Colors.teal
        },
        {
            label: 'Strong',
            labelColor: Colors.green,
            widthPercent: 100,
            innerBarColor: Colors.green
        },
        {
            label: 'Very Strong',
            labelColor: Colors.green,
            widthPercent: 100,
            innerBarColor: Colors.green
        }
    ],
    tooShortData: {
        enabled: true,
        label: 'Too short',
        labelColor: Colors.red,
        widthPercent: 25,
        innerBarColor: Colors.red
    }
}

export {
    apiUrls,
    externalUrls,
    dsKeyAuthEmail,
    dsKeyAuthToken,
    feedbackCounter,
    feedbackNeverShow,
    regexes,
    navHeaderHeight,
    passwordData,
    googleMapsApiData,
    moodTrackerTempHousing,
    moodTrackerPackageMats,
    moodTrackerLabor,
    moodTrackerRealEstate,
    moodTrackerMoverQuote
}
