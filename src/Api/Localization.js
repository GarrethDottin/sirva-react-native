import { apiUrls } from '../Config/Constants'
import { buildJsonPayload, doPost, doGet, doPatch } from './Helper'

const tmpData = {
    "IntroScreen": {
        "swipertext": "SWIPE TO LEARN MORE",
        "buttonnext": "Next",
        "screen1": {
            "title": "Welcome to iMOVE,\nyour personal\nrelocation assistant."
        },
        "screen2": {
            "title": "Every detail,\nall in one spot.",
            "subtitle": "From door to door, plan your entire\nmove and book every service you\nneed, right here on your phone."
        },
        "screen3": {
            "title": "Manager your\nmoving budget.",
            "subtitle": "Get access to your lump sum and\nfind and pay for services directly."
        },
        "screen4": {
            "title": " We're always\nhere to help.",
            "subtitle": "Your dedicated iMove specialist will\nbe with you every step of the way."
        }
    },

    "LoginScreen": {
        "help": "Help & Support",
        "title": "Welcome to iMOVE",
        "password": "Password",
        "email": "Email",
        "forgotpassword": "Forgot Password?",
        "button": "Log in"
    },

    "ForgotPasswordScreen": {
        "title": "Forgot Password",
        "subtitle": "We'll send you a link to the email provided to reset your password.",
        "email": "Email",
        "button": "Send reset link",
        "cancel": "Cancel"
    },

    "ForgotPasswordSuccessScreen": {
        "title": "Forgot Password",
        "subtitle": "We’ll send a reset password link to this email if there is an iMOVE account created. Reset password links expire in 24 hours.",
        "button": "Back to log in"
    },

    "ResetPasswordScreen": {
        "title": "Reset your password",
        "button": "Next",
        "strengthchecker": {
            "label": "Strength",
            "placeholder": "Enter new password",
            "hintTitle": "YOUR PASSWORD MUST INCLUDE:",
            "hint1": "8 characters or more",
            "hint2": "1 uppercase letter",
            "hint3": "1 lowercase letter",
            "hint4": "1 number or special character",
            "gotit": "Got it!"
        }
    },

    "RegisterScreen": {
        "title": "Verify your account",
        "subtitle": "Verify your account with your\nphone number.",
        "label": "Phone Number",
        "button": "Next"
    },

    "SetPasswordScreen": {
        "title": "Create a new password",
        "button": "Next",
        "strengthchecker": {
            "label": "Strength",
            "placeholder": "Enter password",
            "hintTitle": "YOUR PASSWORD MUST INCLUDE:",
            "hint1": "8 characters or more",
            "hint2": "1 uppercase letter",
            "hint3": "1 lowercase letter",
            "hint4": "1 number or special character",
            "gotit": "Got it!"
        }
    },

    "RepaymentAgreementScreen": {
        "introcopy": "Let's get you moving,",
        "employerlabel": "YOUR EMPLOYER",
        "datelabel": "START DATE",
        "summary": "has been provided for your\nrelocation. You may use these funds\nin accordance with your company.",
        "disclaimer": "By continuing, you accept the\nrepayment aggreement terms.",
        "button": "Next"
    },

    "Review1Screen": {
        "title": "iMOVE Setup",
        "subtitle": "Here's the information we got from your new employer. Please contact %s with any changes.",
        "homeaddress": "Current Home Address",
        "workaddress": "New Work Address",
        "company": "Company",
        "startdate": "Start Date",
        "daycount": "In %s days",
        "button": "Next"
    },

    "Review2Screen": {
        "title": "iMOVE Setup",
        "subtitle": "How many people are moving with you?",
        "adults": "Adults",
        "children": "Children",
        "button": "Next"
    },

    "Review3Screen": {
        "title": "iMOVE Setup",
        "subtitle": "How many bedrooms \nis your current home?",
        "beds": "Beds",
        "note": "Choose 0 for studio apartments",
        "house": "House",
        "apartment": "Apartment",
        "button": "Next"
    },

    "HomeScreen": {
        "navtitle": "Home",
        "protiptext": "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
        "protipmodalprompt": "Consectetur adipiscing",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni. \n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "diffdays": "%s days",
        "introcardtitle": "Let's plan your move.",
        "introcardcopy": "We'll help you get to your new home on time, under budget, and stress-free. You can access and monitor all aspects of your move right here.",
        "movingcardtitle": "MOVING",
        "movingcardsubtitle": "Let’s find you a \nmoving company.",
        "movingcardtext": "Take inventory, research moving companies and get instant estimates to compare.",
        "movingcardbutton": "Get Started",
        "housingcardtitle": "HOUSING",
        "housingcardsubtitle": "Find a home to call home",
        "housingcardtext": "Choose a real estate agent to find a home, neighborhood, and community that fits your lifestyle.",
        "housingcardbutton": "Get Started",
    },

    "ContactsScreen": {
        "conciergecardtitle": "iMOVE CONCIERGE",
    },

    "OfferDetailsScreen": {
        "button": "Visit Website"
    },

    "LumpSumLandingScreen": {
        "title": "LUMP SUM",
        "summarytransfercopy": "Transfer your lump sum directly to your bank account. Use these funds to help pay for movers, packaging and other services.",
        "summarycompletecopy": "is your lump sum. Use these funds to help pay for movers, packaging and other services.",
        "buttontransfer": "Transfer Funds",
        "buttondetails": "Transfer Details",
        "repaylink": "Repaymeent Agreement",
        "lumpsumlink": "Lump Sum Policy"
    },

    "LumpSumTransferScreen": {
        "title": "LUMP SUM",
        "subtitle": "Transfer these funds to your bank account.",
        "routingnumberplaceholder": "Routing Number",
        "accountnumberplaceholder": "Account Number",
        "button": "Transfer Lump Sump",
    },

    "LumpSumStatusScreen": {
        "title": "Transfer Details",
        "subtitle": "LUMP SUM",
        "repaylink": "Repaymeent Agreement",
        "note": "It may take 3-5 days for your transfer to be processed.",
        "transactionnumber": "TRANSACTION #",
        "requesteddate": "REQUESTED DATE",
        "amount": "AMOUNT",
        "routingnumber": "ROUTING #",
        "bankaccount": "BANK ACCOUNT",
        "endingin": "Ending in #%s"
    },

    "ProfileScreen": {
        "worktitle": "WORK",
        "office": "Office",
        "officeaddress": "Office Address",
        "startdate": "Start Date",
        "hometitle": "CURRENT HOME",
        "homeaddress": "Address",
        "homesize": "Size",
        "homeroomcount": "%s-bedroom",
        "edit": "EDIT",
        "inventorytitle": "INVENTORY",
        "inventoryrooms": "%s rooms",
        "inventoryitems": "%s items",
        "inventorynote": "For more accurate moving estimates, please inventory the items you plan to move.",
        "familytitle": "WHO'S MOVING",
        "adults": "ADULTS",
        "children": "CHILDREN\nUNDER 18",
        "newhometitle": "NEW HOME",
        "movedate": "Move Date",
        "newaddress": "New Address"
    },

    "FeedbackScreen": {
        "intro": "We are always looking to improve the app and address any issues. We would love to hear your thoughts.",
        "placeholder": "Leave feedback...",
        "button": "Send"
    },

    "FeedbackThankYouScreen": {
        "title": "Thanks!",
        "intro": "We're always looking for feedback to improve the experience",
        "button": "Home"
    },

    "MqLandingScreen": {
        "pickmovedate": "Let's pick a move date",
        "protiptext": "Did you know that you can save money by moving towards te end of the month?",
        "protipmodalprompt": "Help me pick a date",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "How to pick a move date",
        "protipmodaltext": "Working backwards from your work start date, you’ll want to give yourself at least 8-12 weeks to move.\n\nQuicker timelines are more expensive and difficult. It takes time to get out of a lease or sell a home and find a new one. And packing always takes a lot longer than you think.",
        "inventorycardtitle": "Inventory",
        "inventorycardtext": "We'll help you build an inventory so you can get more accurate moving estimates.",
        "inventorycardactiontext": "Start Inventory",
        "movingcardtitle": "Moving Options",
        "professionalmovers": "Professional Movers",
        "rentaltruck": "Rental Truck",
        "loadingunloading": "Loading/Unloading",
        "driving": "Driving",
        "laborcardtitle": "Moving Help",
        "laborcardtext": "Hire professionals to help load and unload your rental truck.",
        "labordcardactiontext": "Find Helpers",
        "materialscardtitle": "Packing Materials",
        "materialscardtext": "Buy all the things you need to properly pack and protect your stuff.",
        "materialscardactiontext": "Get Packing Materials"
    },

    "MqMovingDateScreen": {
        "introtextstart": "Your new job starts on",
        "introtextend": "Be sure to give yourself plenty of time to arrange housing and schools, and to pack, unpack and get settled.",
        "button": "Choose this date",
    },

    "MqInventoryScreen": {
        "title": "Inventory your home for more accurate estimates.",
        "addroom": "Add a room",
        "itemcount": "%s items",
        "itemcountsingular": "%s item"
    },

    "MqInventoryAddRoomScreen": {
        "placeholder": "Room Name",
        "errormessage": "Please provide a room name",
        "roomtype": "ROOM TYPE",
        "button": "Add Room"
    },

    "MqInventoryRoomScreen": {
        "edit": "EDIT",
        "roomtype": "ROOM TYPE",
        "button": "Add item"
    },

    "MqInventoryEditRoomScreen": {
        "placeholder": "Room Name",
        "errormessage": "Please provide a room name",
        "roomtype": "ROOM TYPE",
        "deletebutton": "Delete Room",
        "savebutton": "Save",
        "deletemodaltitle": "Are you sure you want to delete %s?",
        "deletemodalcopy": "Your inventory of 17 items for this room will be lost.",
        "deletemodalbutton": "Delete Room"
    },

    "MqInventoryAddItemScreen": {
        "placeholder": "Desk, chair, lamp...",
        "itemaddedmessage": "%s has been added to %s.",
        "notfoundmessage": "The item you are looking doesn’t seem to be in our inventory. Try searching by another name or notify your mover directly."
    },

    "FsQuoteListScreen": {
        "prompttitle": "It’s best to create an inventory before getting estimates. Let’s take a minute to inventory your items first.",
        "promptcopy": "Don’t worry, you can just guess to get started and update it later. But creating an inventory will help us give you:",
        "promptbullet1": "A more accurate estimate",
        "promptbullet2": "Tips on how to save money",
        "promptestimatesbutton": "View estimates",
        "promptinventorybutton": "Start an inventory",
        "introcardtext": "To get more accurate estimates make sure to inventory your items.",
        "introcardbutton": "Inventory my items",
        "protiptext": "Professional movers load, drive, and unload a moving truck.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni. \n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "listtitle": "Estimates",
        "inventorymessage": "Based on your inventory of %s items.",
        "bedroomcountmessage": "Based on an average %s bedroom home.",
        "notreadytitle": "Estimates not ready",
        "notreadytext": "Your moving estimates aren't ready yet. Check back soon."
    },

    "FsQuoteDetailScreen": {
        "bannerlabel": "ESTIMATES",
        "residencelabel": "RESIDENCE",
        "movedatelabel": "MOVE DATE",
        "requestquotebutton": "Request Quote",
        "housedescription": "%s bedroom %s",
        "services": "Services",
        "provided": "PROVIDED",
        "contact": "Contact",
        "about": "About",
    },

    "FsQuoteConfirmScreen": {
        "bannerlabel": "ESTIMATES",
        "note": "The following information will be shared with %s. You will recieve a call within 24 hours.",
        "estimatelabel": "ESTIMATE",
        "namelabel": "NAME",
        "emaillabel": "EMAIL",
        "phonelabel": "PHONE",
        "employerlabel": "EMPLOYER",
        "residencelabel": "RESIDENCE",
        "housedescription": "%s bedroom %s",
        "originlabel": "ORIGIN",
        "destinationlabel": "DESTINATION",
        "movedatelabel": "MOVE DATE",
        "inventorynote": "A copy of your household inventory",
        "button": "Send request"
    },

    "FsQuoteSubmittedScreen": {
        "title": "Quote request submitted.",
        "note": "We have submitted your quote request to %s and you should hear from us in less than 24 hours.",
    },

    "TruckQuoteListScreen": {
        "housesizelabel1": "%s bedroom home",
        "housesizelabel2": "%s or more bedrooms",
        "recommendedsize": "A %sft truck is recommended for a",
        "protiptext": "Rental trucks are more affordable than movers, and give you the flexibility to load and leave whenever you want.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni./n/nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "truck": "TRUCK",
        "notreadytitle": "Quotes not ready",
        "notreadytext": "Your rental truck quotes aren't ready yet. Check back soon."
    },

    "TruckQuoteDetailScreen": {
        "trucksizelabel": "TRUCK SIZE",
        "truck": "Truck",
        "pickuplabel": "PICK-UP",
        "dropofflabel": "DROP-OFF",
        "movedatelabel": "MOVE DATE",
        "services": "Services & Features",
        "provided": "PROVIDED",
        "contact": "Contact",
        "about": "About",
    },

    "PackingMaterialsWrapper": {
        "topnavshop": "SHOP",
        "topnavorderhistory": "ORDER HISTORY"
    },

    "PackingMaterialsScreen": {
        "discountpromo": "Save 15%% by ordering\nthrough iMOVE",
    },

    "PackingMaterialsDetailScreen": {
        "included": "Included",
        "price": "PRICE",
        "yourprice": "YOUR PRICE",
        "tax": "TAX",
        "total": "TOTAL"
    },

    "PackingMaterialsOrderSuccessScreen": {
        "thankyounote": "Thank you for your purchase.",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE",
        "button": "Done"
    },

    "PackingMaterialsOrderDetailScreen": {
        "yourpricelabel": "YOUR PRICE",
        "taxlabel": "TAX",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE"
    },

    "LaborLandingScreen": {
        "tabnavhelpers": "Hire Helpers",
        "tabnavhistory": "Order History",
        "introtitle": "Find professionals to load and unload your moving truck.",
        "introcopy": "Your helpers are hired from a nationwide list of companies that have been carefully vetted and approved by iMOVE.",
        "protiptext": "It typically takes 2 people 2 hours to load a 2 bedroom home onto a moving truck.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "How to get help",
        "protipmodaltext": "The crew needs your attention especially on the day of delivery; if you have small children and pets have someone available to take care of them",
        "discountpromo": "Save 15%% by ordering through iMOVE",
        "button": "Get started"
    },

    "LaborLocationScreen": {
        "title": "Where would you like\nsome help?",
        "currenthome": "Current Home",
        "newhome": "New Home",
        "other": "Other",
        "newaddressplaceholder": "Provide Address",
        "button": "Next"
    },

    "LaborDateTimeScreen": {
        "title": "When should your help arrive at this address?",
        "date": "Date",
        "starttime": "Start Time",
        "canceltext": "CANCEL",
        "savetext": "SAVE",
        "button": "Next"
    },

    "LaborWorkersScreen": {
        "workersoption": "%s Workers",
        "hoursoption": "%s hours",
        "title": "How many helpers do you need, and for how long?",
        "for": "FOR",
        "introcopy": "The minimum recommended labor for a 2-bedroom home is 2 workers for 2 hours.",
        "introlink": "How is this calculated?",
        "addresslabel": "At this address",
        "datelabel": "On",
        "timelabel": "Start time",
        "button": "Review Order",
        "modaltitle": "How is this calculated?",
        "modalcopy": "This guide is based on the average job. Depending on your house, workers, and inventory, it may take more or less time or workers than shown.",
        "movingout": "Moving Out",
        "movingin": "Moving In",
        "mostudiolabel": "Studio or\nsmall apartment",
        "mostudiovalue": "2 movers\n2 hours",
        "motwobedlabel": "2–3 bedroom\n(800-1500 square feet)",
        "motwobedvalue": "2 movers\n3 hours",
        "mothreebedlabel": "3–4 bedroom\n(1500-2000 square feet)",
        "mothreebedvalue": "3 movers\n4 hours",
        "mofourbedlabel": "4+ bedroom\n(2000-3000 square feet)",
        "mofourbedvalue": "4 movers\n5 hours",
        "mistudiolabel": "Studio or\nsmall apartment x",
        "mistudiovalue": "2 movers\n2 hours",
        "mitwobedlabel": "2–3 bedroom\n(800-1500 square feet)",
        "mitwobedvalue": "2 movers\n3 hours",
        "mithreebedlabel": "3–4 bedroom\n(1500-2000 square feet)",
        "mithreebedvalue": "3 movers\n4 hours",
        "mifourbedlabel": "4+ bedroom\n(2000-3000 square feet)",
        "mifourbedvalue": "4 movers\n5 hours"

    },

    "LaborSuccessScreen": {
        "title": "Thank you for your purchase.",
        "ordertotal": "ORDER TOTAL",
        "paymentnote": "Your payment will be processed\nthe day of service.",
        "ordernumber": "ORDER NUMBER",
        "companyhired": "COMPANY HIRED",
        "button": "Done"
    },

    "LaborReviewScreen": {
        "title": "Hire Helpers",
        "laborlabel": "LABOR",
        "laborvalue": "%s workers",
        "durationlabel": "DURATION",
        "durationvalue": "%s hours",
        "address": "ADDRESS",
        "date": "DATE",
        "starttime": "START TIME",
        "discountnote": "You save 15%% by purchasing\nthrough iMOVE",
        "pricelabel": "PRICE",
        "yourpricelabel": "YOUR PRICE",
        "totallabel": "TOTAL",
        "paymentnote": "Your payment will be processed the\nday of service.",
        "cancelnote": "It's free to cancel orders up to 48 hours in advance\nof the start time."
    },

    "LaborOrderHistoryScreen": {
        "noorders": "You have not placed any orders.",
        "ordersummary": "%s workers for\n%s hours",
        "tabnavhelpers": "Hire Helpers",
        "tabnavhistory": "Order History'"
    },

    "LaborOrderDetailScreen": {
        "ordersummary": "%s workers for\n%s hours",
        "completednote": "Completed on %s",
        "paymentnote": "Your payment will be processed\nthe day of service.",
        "cancelnote": "To cancel this order, please contact your iMOVE concierge. You can cancel this order at no charge up to 48 hours in advance of the appointed time. If you cancel within those 48 hours, you will be charged $50.00.",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE",
        "detailsheader": "DETAILS",
        "detailsaddresslabel": "ADDRESS",
        "detailsdatelabel": "DATE",
        "detailstimelabel": "START TIME",
        "companyheader": "COMPANY HIRED",
        "companylabel": "COMPANY",
        "phonelabel": "PHONE",
        "emaillabel": "EMAIL",
        "paymentnote": "Your payment will be processed\nthe day of service.",
    },

    "Concierge": {
        "title": "iMOVE CONCIERGE",
        "subtitle": "Need help?\nLet's ask %s.",
        "placeholder": "Write your message here.",
        "emailbutton": "Email %s",
        "callbutton": "Call %s"
    },

    "DrawerContent": {
        "callimove": "Call %s at iMOVE",
        "logoff": "Log Off",
        "feedback": "Feedback"
    },

    "CityGuidesLandingScreen": {
        "title": "Start exploring!",
        "subtitle": "The weather ranges from %s in winter (January) and %s in the summer (July) and an average rainfall of %sin.",
        "dropDownLabel": "I'm moving from %s to",
        "costLivingHeader": "COST LIVING",
        "costLivingScreenName": "Cost Living",
        "costLivingSubCardTitle": "The cost of living is",
        "costLivingSubCardInf2Sub": "%s in %s",
        "callbutton": "Call %s"
    }
}

const tmpDataPt = {
    "IntroScreen": {
        "swipertext": "SWIPE TO LEARN MORE",
        "buttonnext": "Next",
        "screen1": {
            "title": "Welcome to iMOVE,\nyour personal\nrelocation assistant."
        },
        "screen2": {
            "title": "Every detail,\nall in one spot.",
            "subtitle": "From door to door, plan your entire\nmove and book every service you\nneed, right here on your phone."
        },
        "screen3": {
            "title": "Manager your\nmoving budget.",
            "subtitle": "Get access to your lump sum and\nfind and pay for services directly."
        },
        "screen4": {
            "title": " We're always\nhere to help.",
            "subtitle": "Your dedicated iMove specialist will\nbe with you every step of the way."
        }
    },

    "LoginScreen": {
        "help": "Help & Support",
        "title": "Welcome to iMOVE",
        "password": "Password",
        "email": "Email",
        "forgotpassword": "Forgot Password?",
        "button": "Log in"
    },

    "ForgotPasswordScreen": {
        "title": "Forgot Password",
        "subtitle": "We'll send you a link to the email provided to reset your password.",
        "email": "Email",
        "button": "Send reset link",
        "cancel": "Cancel"
    },

    "ForgotPasswordSuccessScreen": {
        "title": "Forgot Password",
        "subtitle": "We’ll send a reset password link to this email if there is an iMOVE account created. Reset password links expire in 24 hours.",
        "button": "Back to log in"
    },

    "ResetPasswordScreen": {
        "title": "Reset your password",
        "button": "Next",
        "strengthchecker": {
            "label": "Strength",
            "placeholder": "Enter new password",
            "hintTitle": "YOUR PASSWORD MUST INCLUDE:",
            "hint1": "8 characters or more",
            "hint2": "1 uppercase letter",
            "hint3": "1 lowercase letter",
            "hint4": "1 number or special character",
            "gotit": "Got it!"
        }
    },

    "RegisterScreen": {
        "title": "Verify your account",
        "subtitle": "Verify your account with your\nphone number.",
        "label": "Phone Number",
        "button": "Next"
    },

    "SetPasswordScreen": {
        "title": "Create a new password",
        "button": "Next",
        "strengthchecker": {
            "label": "Strength",
            "placeholder": "Enter password",
            "hintTitle": "YOUR PASSWORD MUST INCLUDE:",
            "hint1": "8 characters or more",
            "hint2": "1 uppercase letter",
            "hint3": "1 lowercase letter",
            "hint4": "1 number or special character",
            "gotit": "Got it!"
        }
    },

    "RepaymentAgreementScreen": {
        "introcopy": "Let's get you moving,",
        "employerlabel": "YOUR EMPLOYER",
        "datelabel": "START DATE",
        "summary": "has been provided for your\nrelocation. You may use these funds\nin accordance with your company.",
        "disclaimer": "By continuing, you accept the\nrepayment aggreement terms.",
        "button": "Next"
    },

    "Review1Screen": {
        "title": "iMOVE Setup",
        "subtitle": "Here's the information we got from your new employer. Please contact %s with any changes.",
        "homeaddress": "Current Home Address",
        "workaddress": "New Work Address",
        "company": "Company",
        "startdate": "Start Date",
        "daycount": "In %s days",
        "button": "Next"
    },

    "Review2Screen": {
        "title": "iMOVE Setup",
        "subtitle": "How many people are moving with you?",
        "adults": "Adults",
        "children": "Children",
        "button": "Next"
    },

    "Review3Screen": {
        "title": "iMOVE Setup",
        "subtitle": "How many bedrooms \nis your current home?",
        "beds": "Beds",
        "note": "Choose 0 for studio apartments",
        "house": "House",
        "apartment": "Apartment",
        "button": "Next"
    },

    "HomeScreen": {
        "navtitle": "Casa",
        "protiptext": "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
        "protipmodalprompt": "Consectetur adipiscing",
        "protipdismiss": "Percebi!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni. \n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "diffdays": "%s dias",
        "introcardtitle": "Vamos planear a tua mudança.",
        "introcardcopy": "Nós ajudamos-te a chegar à tua nova casa a horas, abaixo do orçamento, e livre de stress. Podes aceder e monitorizar todos os aspetos da tua mudança aqui.",
        "movingcardtitle": "MUDANÇA",
        "movingcardsubtitle": "Vamos encontrar uma \nempresa de mudanças.",
        "movingcardtext": "Junta o inventário, pesquisa empresas de mudanças e obtém instantaneamente estimativas para comparar.",
        "movingcardbutton": "Dá início",
        "housingcardtitle": "HABITAÇÃO",
        "housingcardsubtitle": "Vamos encontrar a tua nova casa.",
        "housingcardtext": "Entra em contato com um agente imobiliário para explorar bairros, apartamentos e casas na tua nova área de trabalho.",
        "housingcardbutton": "Encontra um agente imobiliário",
    },

    "ContactsScreen": {
        "conciergecardtitle": "iMOVE CONCIERGE",
    },

    "OfferDetailsScreen": {
        "button": "Visit Website"
    },

    "LumpSumLandingScreen": {
        "title": "LUMP SUM",
        "summarytransfercopy": "Transfer your lump sum directly to your bank account. Use these funds to help pay for movers, packaging and other services.",
        "summarycompletecopy": "is your lump sum. Use these funds to help pay for movers, packaging and other services.",
        "buttontransfer": "Transfer Funds",
        "buttondetails": "Transfer Details",
        "repaylink": "Repaymeent Agreement",
        "lumpsumlink": "Lump Sum Policy"
    },

    "LumpSumTransferScreen": {
        "title": "LUMP SUM",
        "subtitle": "Transfer these funds to your bank account.",
        "routingnumberplaceholder": "Routing Number",
        "accountnumberplaceholder": "Account Number",
        "button": "Transfer Lump Sump",
    },

    "LumpSumStatusScreen": {
        "title": "Transfer Details",
        "subtitle": "LUMP SUM",
        "repaylink": "Repaymeent Agreement",
        "note": "It may take 3-5 days for your transfer to be processed.",
        "transactionnumber": "TRANSACTION #",
        "requesteddate": "REQUESTED DATE",
        "amount": "AMOUNT",
        "routingnumber": "ROUTING #",
        "bankaccount": "BANK ACCOUNT",
        "endingin": "Ending in #%s"
    },

    "ProfileScreen": {
        "worktitle": "WORK",
        "office": "Office",
        "officeaddress": "Office Address",
        "startdate": "Start Date",
        "hometitle": "CURRENT HOME",
        "homeaddress": "Address",
        "homesize": "Size",
        "homeroomcount": "%s-bedroom",
        "edit": "EDIT",
        "inventorytitle": "INVENTORY",
        "inventoryrooms": "%s rooms",
        "inventoryitems": "%s items",
        "inventorynote": "For more accurate moving estimates, please inventory the items you plan to move.",
        "familytitle": "WHO'S MOVING",
        "adults": "ADULTS",
        "children": "CHILDREN\nUNDER 18",
        "newhometitle": "NEW HOME",
        "movedate": "Move Date",
        "newaddress": "New Address"
    },

    "FeedbackScreen": {
        "intro": "We are always looking to improve the app and address any issues. We would love to hear your thoughts.",
        "placeholder": "Leave feedback...",
        "button": "Send"
    },

    "FeedbackThankYouScreen": {
        "title": "Thanks!",
        "intro": "We're always looking for feedback to improve the experience",
        "button": "Home"
    },

    "MqLandingScreen": {
        "pickmovedate": "Let's pick a move date",
        "protiptext": "Did you know that you can save money by moving towards te end of the month?",
        "protipmodalprompt": "Help me pick a date",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "How to pick a move date",
        "protipmodaltext": "Working backwards from your work start date, you’ll want to give yourself at least 8-12 weeks to move.\n\nQuicker timelines are more expensive and difficult. It takes time to get out of a lease or sell a home and find a new one. And packing always takes a lot longer than you think.",
        "inventorycardtitle": "Inventory",
        "inventorycardtext": "We'll help you build an inventory so you can get more accurate moving estimates.",
        "inventorycardactiontext": "Start Inventory",
        "movingcardtitle": "Moving Options",
        "professionalmovers": "Professional Movers",
        "rentaltruck": "Rental Truck",
        "loadingunloading": "Loading/Unloading",
        "driving": "Driving",
        "laborcardtitle": "Moving Help",
        "laborcardtext": "Hire professionals to help load and unload your rental truck.",
        "labordcardactiontext": "Find Helpers",
        "materialscardtitle": "Packing Materials",
        "materialscardtext": "Buy all the things you need to properly pack and protect your stuff.",
        "materialscardactiontext": "Get Packing Materials"
    },

    "MqMovingDateScreen": {
        "introtextstart": "Your new job starts on",
        "introtextend": "Be sure to give yourself plenty of time to arrange housing and schools, and to pack, unpack and get settled.",
        "button": "Choose this date",
    },

    "MqInventoryScreen": {
        "title": "Inventory your home for more accurate estimates.",
        "addroom": "Add a room",
        "itemcount": "%s items",
        "itemcountsingular": "%s item"
    },

    "MqInventoryAddRoomScreen": {
        "placeholder": "Room Name",
        "errormessage": "Please provide a room name",
        "roomtype": "ROOM TYPE",
        "button": "Add Room"
    },

    "MqInventoryRoomScreen": {
        "edit": "EDIT",
        "roomtype": "ROOM TYPE",
        "button": "Add item"
    },

    "MqInventoryEditRoomScreen": {
        "placeholder": "Room Name",
        "errormessage": "Please provide a room name",
        "roomtype": "ROOM TYPE",
        "deletebutton": "Delete Room",
        "savebutton": "Save",
        "deletemodaltitle": "Are you sure you want to delete %s?",
        "deletemodalcopy": "Your inventory of 17 items for this room will be lost.",
        "deletemodalbutton": "Delete Room"
    },

    "MqInventoryAddItemScreen": {
        "placeholder": "Desk, chair, lamp...",
        "itemaddedmessage": "%s has been added to %s.",
        "notfoundmessage": "The item you are looking doesn’t seem to be in our inventory. Try searching by another name or notify your mover directly."
    },

    "FsQuoteListScreen": {
        "prompttitle": "It’s best to create an inventory before getting estimates. Let’s take a minute to inventory your items first.",
        "promptcopy": "Don’t worry, you can just guess to get started and update it later. But creating an inventory will help us give you:",
        "promptbullet1": "A more accurate estimate",
        "promptbullet2": "Tips on how to save money",
        "promptestimatesbutton": "View estimates",
        "promptinventorybutton": "Start an inventory",
        "introcardtext": "To get more accurate estimates make sure to inventory your items.",
        "introcardbutton": "Inventory my items",
        "protiptext": "Professional movers load, drive, and unload a moving truck.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni. \n\nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "listtitle": "Estimates",
        "inventorymessage": "Based on your inventory of %s items.",
        "bedroomcountmessage": "Based on an average %s bedroom home.",
        "notreadytitle": "Estimates not ready",
        "notreadytext": "Your moving estimates aren't ready yet. Check back soon."
    },

    "FsQuoteDetailScreen": {
        "bannerlabel": "ESTIMATES",
        "residencelabel": "RESIDENCE",
        "movedatelabel": "MOVE DATE",
        "requestquotebutton": "Request Quote",
        "housedescription": "%s bedroom %s",
        "services": "Services",
        "provided": "PROVIDED",
        "contact": "Contact",
        "about": "About",
    },

    "FsQuoteConfirmScreen": {
        "bannerlabel": "ESTIMATES",
        "note": "The following information will be shared with %s. You will recieve a call within 24 hours.",
        "estimatelabel": "ESTIMATE",
        "namelabel": "NAME",
        "emaillabel": "EMAIL",
        "phonelabel": "PHONE",
        "employerlabel": "EMPLOYER",
        "residencelabel": "RESIDENCE",
        "housedescription": "%s bedroom %s",
        "originlabel": "ORIGIN",
        "destinationlabel": "DESTINATION",
        "movedatelabel": "MOVE DATE",
        "inventorynote": "A copy of your household inventory",
        "button": "Send request"
    },

    "FsQuoteSubmittedScreen": {
        "title": "Quote request submitted.",
        "note": "We have submitted your quote request to %s and you should hear from us in less than 24 hours.",
    },

    "TruckQuoteListScreen": {
        "housesizelabel1": "%s bedroom home",
        "housesizelabel2": "%s or more bedrooms",
        "recommendedsize": "A %sft truck is recommended for a",
        "protiptext": "Rental trucks are more affordable than movers, and give you the flexibility to load and leave whenever you want.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni./n/nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "truck": "TRUCK",
        "notreadytitle": "Quotes not ready",
        "notreadytext": "Your rental truck quotes aren't ready yet. Check back soon."
    },

    "TruckQuoteDetailScreen": {
        "trucksizelabel": "TRUCK SIZE",
        "truck": "Truck",
        "pickuplabel": "PICK-UP",
        "dropofflabel": "DROP-OFF",
        "movedatelabel": "MOVE DATE",
        "services": "Services & Features",
        "provided": "PROVIDED",
        "contact": "Contact",
        "about": "About",
    },

    "PackingMaterialsWrapper": {
        "topnavshop": "SHOP",
        "topnavorderhistory": "ORDER HISTORY"
    },

    "PackingMaterialsScreen": {
        "discountpromo": "Save 15%% by ordering\nthrough iMOVE",
    },

    "PackingMaterialsDetailScreen": {
        "included": "Included",
        "price": "PRICE",
        "yourprice": "YOUR PRICE",
        "tax": "TAX",
        "total": "TOTAL"
    },

    "PackingMaterialsOrderSuccessScreen": {
        "thankyounote": "Thank you for your purchase.",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE",
        "button": "Done"
    },

    "PackingMaterialsOrderDetailScreen": {
        "yourpricelabel": "YOUR PRICE",
        "taxlabel": "TAX",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE"
    },

    "LaborLandingScreen": {
        "tabnavhelpers": "Hire Helpers",
        "tabnavhistory": "Order History",
        "introtitle": "Find professionals to load and unload your moving truck.",
        "introcopy": "Your helpers are hired from a nationwide list of companies that have been carefully vetted and approved by iMOVE.",
        "protiptext": "It typically takes 2 people 2 hours to load a 2 bedroom home onto a moving truck.",
        "protipmodalprompt": "Learn more",
        "protipdismiss": "Got it!",
        "protipmodaltitle": "Nemo enim ipsam voluptatem",
        "protipmodaltext": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni./n/nUt enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
        "discountpromo": "Save 15%% by ordering through iMOVE",
        "button": "Get started"
    },

    "LaborLocationScreen": {
        "title": "Where would you like\nsome help?",
        "currenthome": "Current Home",
        "newhome": "New Home",
        "other": "Other",
        "newaddressplaceholder": "Provide Address",
        "button": "Next"
    },

    "LaborDateTimeScreen": {
        "title": "When should your help arrive at this address?",
        "date": "Date",
        "starttime": "Start Time",
        "canceltext": "CANCEL",
        "savetext": "SAVE",
        "button": "Next"
    },

    "LaborWorkersScreen": {
        "workersoption": "%s Workers",
        "hoursoption": "%s hours",
        "title": "How many helpers do you need, and for how long?",
        "for": "FOR",
        "introcopy": "The minimum recommended labor for a 2-bedroom home is 2 workers for 2 hours.",
        "introlink": "How is this calculated?",
        "addresslabel": "At this address",
        "datelabel": "On",
        "timelabel": "Start time",
        "button": "Review Order",
        "modaltitle": "How is this calculated?",
        "modalcopy": "This guide is based on the average job. Depending on your house, workers, and inventory, it may take more or less time or workers than shown.",
        "movingout": "Moving Out",
        "movingin": "Moving In",
        "mostudiolabel": "Studio or\nsmall apartment",
        "mostudiovalue": "2 movers\n2 hours",
        "motwobedlabel": "2–3 bedroom\n(800-1500 square feet)",
        "motwobedvalue": "2 movers\n3 hours",
        "mothreebedlabel": "3–4 bedroom\n(1500-2000 square feet)",
        "mothreebedvalue": "3 movers\n4 hours",
        "mofourbedlabel": "4+ bedroom\n(2000-3000 square feet)",
        "mofourbedvalue": "4 movers\n5 hours",
        "mistudiolabel": "Studio or\nsmall apartment x",
        "mistudiovalue": "2 movers\n2 hours",
        "mitwobedlabel": "2–3 bedroom\n(800-1500 square feet)",
        "mitwobedvalue": "2 movers\n3 hours",
        "mithreebedlabel": "3–4 bedroom\n(1500-2000 square feet)",
        "mithreebedvalue": "3 movers\n4 hours",
        "mifourbedlabel": "4+ bedroom\n(2000-3000 square feet)",
        "mifourbedvalue": "4 movers\n5 hours"

    },

    "LaborSuccessScreen": {
        "title": "Thank you for your purchase.",
        "ordertotal": "ORDER TOTAL",
        "paymentnote": "Your payment will be processed\nthe day of service.",
        "ordernumber": "ORDER NUMBER",
        "companyhired": "COMPANY HIRED",
        "button": "Done"
    },

    "LaborReviewScreen": {
        "title": "Hire Helpers",
        "laborlabel": "LABOR",
        "laborvalue": "%s workers",
        "durationlabel": "DURATION",
        "durationvalue": "%s hours",
        "address": "ADDRESS",
        "date": "DATE",
        "starttime": "START TIME",
        "discountnote": "You save 15% by purchasing\nthrough iMOVE",
        "pricelabel": "PRICE",
        "yourpricelabel": "YOUR PRICE",
        "totallabel": "TOTAL",
        "paymentnote": "Your payment will be processed the\nday of service.",
        "cancelnote": "It's free to cancel orders up to 48 hours in advance\nof the start time."
    },

    "LaborOrderHistoryScreen": {
        "noorders": "You have not placed any orders.",
        "ordersummary": "%s workers for\n%s hours",
        "tabnavhelpers": "Hire Helpers",
        "tabnavhistory": "Order History"
    },

    "LaborOrderDetailScreen": {
        "ordersummary": "%s workers for\n%s hours",
        "completednote": "Completed on %s",
        "paymentnote": "Your payment will be processed\nthe day of service.",
        "cancelnote": "To cancel this order, please contact your iMOVE concierge. You can cancel this order at no charge up to 48 hours in advance of the appointed time. If you cancel within those 48 hours, you will be charged $50.00.",
        "ordertotallabel": "ORDER TOTAL",
        "ordernumberlabel": "ORDER NUMBER",
        "orderdatelabel": "ORDER DATE",
        "detailsheader": "DETAILS",
        "detailsaddresslabel": "ADDRESS",
        "detailsdatelabel": "DATE",
        "detailstimelabel": "START TIME",
        "companyheader": "COMPANY HIRED",
        "companylabel": "COMPANY",
        "phonelabel": "PHONE",
        "emaillabel": "EMAIL",
        "paymentnote": "Your payment will be processed\nthe day of service.",
    },

    "Concierge": {
        "title": "iMOVE CONCIERGE",
        "subtitle": "Need help?\nLet's ask %s.",
        "placeholder": "Write your message here.",
        "emailbutton": "Email %s",
        "callbutton": "Call %s"
    },

    "DrawerContent": {
        "callimove": "Call %s at iMOVE",
        "logoff": "Log Off",
        "feedback": "Feedback"
    }


}
export async function getLocalizationForLanguage(languageCode) {
    const url = `${apiUrls.localizationJson}/${languageCode}`

    return await doGet(url)
}
