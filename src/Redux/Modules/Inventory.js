import { createSelector } from 'reselect';
import { generateGuid } from '../../Utils/ReactHelpers'
import { getInventoryData, saveInventoryData, getInventoryItemMatrix } from '../../Api/Moving'
import { retrieveAuthTokenFromDevice, unpackResponse, unpackResponseArray } from '../../Api/Helper'
import { addAsyncWorkingRequest, removeAsyncWorkingRequest} from './SystemWorking'

const sampleItemsMatrix = {
    "bedroom": {
        "name": "Bedroom",
        "categories": {
            "bed": {
                "name": "Bed",
                "itemList": {
                    "queen": {
                        "name": "Queen",
                        "cube": "35",
                        "weight": "225",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bedside-table": {
                "name": "Bedside Table",
                "itemList": {
                    "bedside-table-night-stand": {
                        "name": "Bedside Table/Night Stand",
                        "cube": "4",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "table-lamp": {
                        "name": "Table Lamp",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "chest-of-drawers": {
                "name": "Chest of Drawers",
                "itemList": {
                    "chest-of-drawers-medium-": {
                        "name": "Chest of Drawers (Medium)",
                        "cube": "20",
                        "weight": "115",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "chest": {
                "name": "Chest",
                "itemList": {
                    "armoire-large-": {
                        "name": "Armoire (Large)",
                        "cube": "40",
                        "weight": "165",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "mirror-": {
                "name": "Mirror ",
                "itemList": {
                    "dresser-mirror-": {
                        "name": "Dresser Mirror ",
                        "cube": "0",
                        "weight": "0",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "dresser": {
                "name": "Dresser",
                "itemList": {
                    "dresser-double": {
                        "name": "Dresser, Double",
                        "cube": "20",
                        "weight": "150",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "tv": {
                "name": "TV",
                "itemList": {
                    "flat-screen-tv-small-": {
                        "name": "Flat Screen TV (Small)",
                        "cube": "5",
                        "weight": "50",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "dining": {
        "name": "Dining",
        "categories": {
            "dining-table": {
                "name": "Dining Table",
                "itemList": {
                    "dining-table-medium-": {
                        "name": "Dining Table (Medium)",
                        "cube": "25",
                        "weight": "125",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-dining": {
                        "name": "Chair, Dining",
                        "cube": "5",
                        "weight": "20",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "table": {
                "name": "Table",
                "itemList": {
                    "side-table": {
                        "name": "Side Table",
                        "cube": "5",
                        "weight": "50",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-floor": {
                        "name": "Lamp, Floor",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "shed-garage": {
        "name": "Shed / Garage",
        "categories": {
            "tool-box": {
                "name": "Tool Box",
                "itemList": {
                    "tool-box-medium-": {
                        "name": "Tool Box (Medium)",
                        "cube": "30",
                        "weight": "150",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "ladder": {
                "name": "Ladder",
                "itemList": {
                    "ladder-7-": {
                        "name": "Ladder 7'",
                        "cube": "8",
                        "weight": "40",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "garbage-can": {
                "name": "Garbage Can",
                "itemList": {
                    "garbage-can": {
                        "name": "Garbage Can",
                        "cube": "5",
                        "weight": "25",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "garden-tools": {
                "name": "Garden Tools",
                "itemList": {
                    "garden-tools": {
                        "name": "Garden Tools",
                        "cube": "1",
                        "weight": "10",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "plastic-bin": {
                "name": "Plastic Bin",
                "itemList": {
                    "plastic-bin-medium-": {
                        "name": "Plastic Bin (Medium)",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lawn-mower": {
                "name": "Lawn Mower",
                "itemList": {
                    "lawn-mower": {
                        "name": "Lawn Mower",
                        "cube": "5",
                        "weight": "125",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "grill-propane": {
                "name": "Grill, Propane",
                "itemList": {
                    "grill-propane": {
                        "name": "Grill, Propane",
                        "cube": "15",
                        "weight": "105",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "kids-room": {
        "name": "Kids Room",
        "categories": {
            "bed": {
                "name": "Bed",
                "itemList": {
                    "single-twin": {
                        "name": "Single/Twin",
                        "cube": "25",
                        "weight": "125",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bedside-table": {
                "name": "Bedside Table",
                "itemList": {
                    "bedside-table-night-stand": {
                        "name": "Bedside Table/Night Stand",
                        "cube": "4",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "chest-of-drawers": {
                "name": "Chest of Drawers",
                "itemList": {
                    "chest-of-drawers-small-": {
                        "name": "Chest of Drawers (Small)",
                        "cube": "15",
                        "weight": "60",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "nursery": {
        "name": "Nursery",
        "categories": {
            "bed": {
                "name": "Bed",
                "itemList": {
                    "bed-baby-s": {
                        "name": "Bed, Baby's",
                        "cube": "25",
                        "weight": "125",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "car-seat": {
                "name": "Car Seat",
                "itemList": {
                    "car-seat": {
                        "name": "Car Seat",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "child-table-chairs": {
                "name": "Child Table / Chairs",
                "itemList": {
                    "child-table-chairs": {
                        "name": "Child Table / Chairs",
                        "cube": "3",
                        "weight": "20",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "baby-bath": {
                "name": "Baby Bath",
                "itemList": {
                    "baby-bath": {
                        "name": "Baby Bath",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "baby-s-high-chair": {
                "name": "Baby's High Chair",
                "itemList": {
                    "baby-s-high-chair": {
                        "name": "Baby's High Chair",
                        "cube": "4",
                        "weight": "28",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "diaper-trash-can": {
                "name": "Diaper Trash Can",
                "itemList": {
                    "diaper-trash-can": {
                        "name": "Diaper Trash Can",
                        "cube": "6",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "playpen-folding": {
                "name": "Playpen, Folding",
                "itemList": {
                    "playpen-folding": {
                        "name": "Playpen, Folding",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "stroller": {
                "name": "Stroller",
                "itemList": {
                    "stroller": {
                        "name": "Stroller",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "toy-chest": {
                "name": "Toy Chest",
                "itemList": {
                    "toy-chest": {
                        "name": "Toy Chest",
                        "cube": "5",
                        "weight": "65",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "living-room": {
        "name": "Living Room",
        "categories": {
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-overstuffed": {
                        "name": "Chair, Overstuffed",
                        "cube": "15",
                        "weight": "65",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "ottoman-footstool": {
                "name": "Ottoman/Footstool",
                "itemList": {
                    "ottoman-footstool-small-": {
                        "name": "Ottoman/Footstool (Small)",
                        "cube": "3",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "sofa": {
                "name": "Sofa",
                "itemList": {
                    "sofa-3-cushion": {
                        "name": "Sofa 3 Cushion",
                        "cube": "30",
                        "weight": "185",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-floor": {
                        "name": "Lamp, Floor",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "coffee-table": {
                "name": "Coffee Table",
                "itemList": {
                    "coffee-table-small-": {
                        "name": "Coffee Table (Small)",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "tv": {
                "name": "TV",
                "itemList": {
                    "flat-screen-tv-large-": {
                        "name": "Flat Screen TV (Large)",
                        "cube": "8",
                        "weight": "100",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bookshelf": {
                "name": "Bookshelf",
                "itemList": {
                    "bookshelf-small": {
                        "name": "Bookshelf Small",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "family-room": {
        "name": "Family Room",
        "categories": {
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-overstuffed": {
                        "name": "Chair, Overstuffed",
                        "cube": "15",
                        "weight": "65",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "ottoman-footstool": {
                "name": "Ottoman/Footstool",
                "itemList": {
                    "ottoman-footstool-small-": {
                        "name": "Ottoman/Footstool (Small)",
                        "cube": "3",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "sofa": {
                "name": "Sofa",
                "itemList": {
                    "sofa-3-cushion": {
                        "name": "Sofa 3 Cushion",
                        "cube": "30",
                        "weight": "185",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-floor": {
                        "name": "Lamp, Floor",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "coffee-table": {
                "name": "Coffee Table",
                "itemList": {
                    "coffee-table-small-": {
                        "name": "Coffee Table (Small)",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "tv": {
                "name": "TV",
                "itemList": {
                    "flat-screen-tv-large-": {
                        "name": "Flat Screen TV (Large)",
                        "cube": "8",
                        "weight": "100",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bookshelf": {
                "name": "Bookshelf",
                "itemList": {
                    "bookshelf-small": {
                        "name": "Bookshelf Small",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "vacuum-cleaner": {
                "name": "Vacuum Cleaner",
                "itemList": {
                    "vacuum-cleaner": {
                        "name": "Vacuum Cleaner",
                        "cube": "3",
                        "weight": "25",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "entertainment-room": {
        "name": "Entertainment Room",
        "categories": {
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-overstuffed": {
                        "name": "Chair, Overstuffed",
                        "cube": "15",
                        "weight": "65",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "ottoman-footstool": {
                "name": "Ottoman/Footstool",
                "itemList": {
                    "ottoman-footstool-small-": {
                        "name": "Ottoman/Footstool (Small)",
                        "cube": "3",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "sofa": {
                "name": "Sofa",
                "itemList": {
                    "sofa-3-cushion": {
                        "name": "Sofa 3 Cushion",
                        "cube": "30",
                        "weight": "185",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-floor": {
                        "name": "Lamp, Floor",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "coffee-table": {
                "name": "Coffee Table",
                "itemList": {
                    "coffee-table-small-": {
                        "name": "Coffee Table (Small)",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "tv": {
                "name": "TV",
                "itemList": {
                    "flat-screen-tv-large-": {
                        "name": "Flat Screen TV (Large)",
                        "cube": "8",
                        "weight": "100",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "entertainment-center": {
                "name": "Entertainment Center",
                "itemList": {
                    "entertainment-ctr-small-": {
                        "name": "Entertainment Ctr. (Small)",
                        "cube": "30",
                        "weight": "210",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bookshelf": {
                "name": "Bookshelf",
                "itemList": {
                    "bookshelf-small": {
                        "name": "Bookshelf Small",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "office": {
        "name": "Office",
        "categories": {
            "desk": {
                "name": "Desk",
                "itemList": {
                    "desk-executive": {
                        "name": "Desk, Executive",
                        "cube": "40",
                        "weight": "250",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "wall-unit": {
                "name": "Wall Unit",
                "itemList": {
                    "wall-unit-medium-": {
                        "name": "Wall Unit (Medium)",
                        "cube": "60",
                        "weight": "420",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-table": {
                        "name": "Lamp, Table",
                        "cube": "3",
                        "weight": "15",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "file-cabinet": {
                "name": "File Cabinet",
                "itemList": {
                    "file-cab-3-draw-": {
                        "name": "File Cab (3 Draw)",
                        "cube": "8",
                        "weight": "75",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "kitchen": {
        "name": "Kitchen",
        "categories": {
            "fridge-freezer": {
                "name": "Fridge/Freezer",
                "itemList": {
                    "fridge-freezer-standard-": {
                        "name": "Fridge/Freezer (Standard)",
                        "cube": "40",
                        "weight": "150",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "freezer-chest": {
                "name": "Freezer, Chest",
                "itemList": {
                    "freezer-chest-standard-": {
                        "name": "Freezer, Chest (Standard)",
                        "cube": "40",
                        "weight": "150",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "microwave": {
                "name": "Microwave",
                "itemList": {
                    "microwave": {
                        "name": "Microwave",
                        "cube": "3",
                        "weight": "45",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "dining-table": {
                "name": "Dining Table",
                "itemList": {
                    "dining-table": {
                        "name": "Dining Table",
                        "cube": "60",
                        "weight": "75",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-dining": {
                        "name": "Chair, Dining",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bar-stool": {
                "name": "Bar Stool",
                "itemList": {
                    "bar-stool": {
                        "name": "Bar Stool",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "patio-garden": {
        "name": "Patio / Garden",
        "categories": {
            "patio-set": {
                "name": "Patio Set",
                "itemList": {
                    "patio-set-5-piece-": {
                        "name": "Patio Set (5 piece)",
                        "cube": "70",
                        "weight": "400",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "bird-bath": {
                "name": "Bird Bath",
                "itemList": {
                    "bird-bath": {
                        "name": "Bird Bath",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "patio-umbrella": {
                "name": "Patio Umbrella",
                "itemList": {
                    "patio-umbrella": {
                        "name": "Patio Umbrella",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "hose-reel": {
                "name": "Hose & Reel",
                "itemList": {
                    "hose-reel": {
                        "name": "Hose & Reel",
                        "cube": "3",
                        "weight": "25",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "barbecue-grill": {
                "name": "Barbecue Grill",
                "itemList": {
                    "barbecue-grill-large-": {
                        "name": "Barbecue Grill (Large)",
                        "cube": "15",
                        "weight": "105",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "garden-tools": {
                "name": "Garden Tools",
                "itemList": {
                    "garden-tools": {
                        "name": "Garden Tools",
                        "cube": "1",
                        "weight": "10",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "laundry-room": {
        "name": "Laundry Room",
        "categories": {
            "washing-machine": {
                "name": "Washing Machine",
                "itemList": {
                    "washing-machine": {
                        "name": "Washing Machine",
                        "cube": "10",
                        "weight": "200",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "dryer": {
                "name": "Dryer",
                "itemList": {
                    "dryer-gas": {
                        "name": "Dryer-Gas",
                        "cube": "15",
                        "weight": "150",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "attic": {
        "name": "Attic",
        "categories": {
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "bathroom": {
        "name": "Bathroom",
        "categories": {
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "medium": {
                        "name": "Medium Box",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "true",
                        "default_count": "0"
                    }
                }
            }
        }
    },
    "search": {
        "name": "Search",
        "categories": {
            "aerial-dish": {
                "name": "Aerial/Dish",
                "itemList": {
                    "aerial-dish": {
                        "name": "Aerial/Dish",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "air-conditioner": {
                "name": "Air Conditioner",
                "itemList": {
                    "air-conditioner": {
                        "name": "Air Conditioner",
                        "cube": "  5 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "aquarium": {
                "name": "Aquarium",
                "itemList": {
                    "aquarium-55-gallon": {
                        "name": "Aquarium - 55 gallon",
                        "cube": "  10 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "aquarium-stand": {
                "name": "Aquarium Stand",
                "itemList": {
                    "aquarium-stand-small-": {
                        "name": "Aquarium Stand (Small)",
                        "cube": "  10 ",
                        "weight": "100",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "artificial-plants": {
                "name": "Artificial Plants",
                "itemList": {
                    "artificial-plants": {
                        "name": "Artificial Plants",
                        "cube": "  4 ",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "baby-bath": {
                "name": "Baby Bath",
                "itemList": {
                    "baby-bath": {
                        "name": "Baby Bath",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "baby-carriage": {
                "name": "Baby Carriage",
                "itemList": {
                    "baby-carriage": {
                        "name": "Baby Carriage",
                        "cube": "  4 ",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "baby-walker": {
                "name": "Baby Walker",
                "itemList": {
                    "baby-walker": {
                        "name": "Baby Walker",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "baby-s-high-chair": {
                "name": "Baby's High Chair",
                "itemList": {
                    "baby-s-high-chair": {
                        "name": "Baby's High Chair",
                        "cube": "  4 ",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bar-3-x-4-x-2": {
                "name": "Bar 3 x 4 x 2",
                "itemList": {
                    "bar-3-x-4-x-2": {
                        "name": "Bar 3 x 4 x 2",
                        "cube": "  24 ",
                        "weight": "168",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bar-stool": {
                "name": "Bar Stool",
                "itemList": {
                    "bar-stool": {
                        "name": "Bar Stool",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "barbecue": {
                "name": "Barbecue",
                "itemList": {
                    "barbecue": {
                        "name": "Barbecue",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "barbecue-grill": {
                "name": "Barbecue Grill",
                "itemList": {
                    "barbecue-grill-large-": {
                        "name": "Barbecue Grill (Large)",
                        "cube": "  15 ",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "base-buffet": {
                "name": "Base Buffet",
                "itemList": {
                    "base-buffet": {
                        "name": "Base Buffet",
                        "cube": "  30 ",
                        "weight": "210",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "basket": {
                "name": "Basket",
                "itemList": {
                    "basket": {
                        "name": "Basket",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bassinet": {
                "name": "Bassinet",
                "itemList": {
                    "bassinet": {
                        "name": "Bassinet",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bean-bag": {
                "name": "Bean Bag",
                "itemList": {
                    "bean-bag": {
                        "name": "Bean Bag",
                        "cube": "  6 ",
                        "weight": "42",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bed": {
                "name": "Bed",
                "itemList": {
                    "futon": {
                        "name": "Futon",
                        "cube": "  20 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bedside-table": {
                "name": "Bedside Table",
                "itemList": {
                    "bedside-table-night-stand": {
                        "name": "Bedside Table/Night Stand",
                        "cube": "  4 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bench": {
                "name": "Bench",
                "itemList": {
                    "bench": {
                        "name": "Bench",
                        "cube": "  8 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bench-small-": {
                "name": "Bench (Small)",
                "itemList": {
                    "bench-small-": {
                        "name": "Bench (Small)",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bike": {
                "name": "Bike",
                "itemList": {
                    "bike-child-": {
                        "name": "Bike (Child)",
                        "cube": "  5 ",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bird-bath": {
                "name": "Bird Bath",
                "itemList": {
                    "bird-bath": {
                        "name": "Bird Bath",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "black-board": {
                "name": "Black Board",
                "itemList": {
                    "black-board": {
                        "name": "Black Board",
                        "cube": "  2 ",
                        "weight": "10",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bookcase-per-section-": {
                "name": "Bookcase (per section)",
                "itemList": {
                    "bookcase-per-section-": {
                        "name": "Bookcase (per section)",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bookshelf": {
                "name": "Bookshelf",
                "itemList": {
                    "bookshelf-small": {
                        "name": "Bookshelf Small",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bouncer-seat": {
                "name": "Bouncer Seat",
                "itemList": {
                    "bouncer-seat": {
                        "name": "Bouncer Seat",
                        "cube": "  5 ",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bowling-ball-bag": {
                "name": "Bowling Ball/Bag",
                "itemList": {
                    "bowling-ball-bag": {
                        "name": "Bowling Ball/Bag",
                        "cube": "  2 ",
                        "weight": "12",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "boxes": {
                "name": "Boxes",
                "itemList": {
                    "wardrobe": {
                        "name": "Wardrobe",
                        "cube": "  10 ",
                        "weight": "60",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "broom": {
                "name": "Broom",
                "itemList": {
                    "broom": {
                        "name": "Broom",
                        "cube": "  1 ",
                        "weight": "7",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bucket": {
                "name": "Bucket",
                "itemList": {
                    "bucket": {
                        "name": "Bucket",
                        "cube": "  1 ",
                        "weight": "7",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "buffet-base": {
                "name": "Buffet Base",
                "itemList": {
                    "buffet-base-small-": {
                        "name": "Buffet Base (Small)",
                        "cube": "  25 ",
                        "weight": "210",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "bureau": {
                "name": "Bureau",
                "itemList": {
                    "bureau": {
                        "name": "Bureau",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "cabinet": {
                "name": "Cabinet",
                "itemList": {
                    "cabinet-metal": {
                        "name": "Cabinet, Metal",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "car-seat": {
                "name": "Car Seat",
                "itemList": {
                    "car-seat": {
                        "name": "Car Seat",
                        "cube": "  3 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "card-table": {
                "name": "Card Table",
                "itemList": {
                    "card-table": {
                        "name": "Card Table",
                        "cube": "  5 ",
                        "weight": "20",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "carpet": {
                "name": "Carpet",
                "itemList": {
                    "carpet-small-": {
                        "name": "Carpet (Small)",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "cart": {
                "name": "Cart",
                "itemList": {
                    "cart": {
                        "name": "Cart",
                        "cube": "  5 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "cd-rack": {
                "name": "CD Rack",
                "itemList": {
                    "cd-rack": {
                        "name": "CD Rack",
                        "cube": "  10 ",
                        "weight": "50",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chair": {
                "name": "Chair",
                "itemList": {
                    "chair-baby-s": {
                        "name": "Chair, Baby's",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chair-mat": {
                "name": "Chair Mat",
                "itemList": {
                    "chair-mat": {
                        "name": "Chair Mat",
                        "cube": "  1 ",
                        "weight": "7",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chaise-lounge": {
                "name": "Chaise Lounge",
                "itemList": {
                    "chaise-lounge": {
                        "name": "Chaise Lounge",
                        "cube": "  9 ",
                        "weight": "100",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "changing-table": {
                "name": "Changing Table",
                "itemList": {
                    "changing-table": {
                        "name": "Changing Table",
                        "cube": "  15 ",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chest": {
                "name": "Chest",
                "itemList": {
                    "chest-lingerie": {
                        "name": "Chest, Lingerie",
                        "cube": "  15 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chest-trunk": {
                "name": "Chest / Trunk",
                "itemList": {
                    "chest-trunk": {
                        "name": "Chest / Trunk",
                        "cube": "  12 ",
                        "weight": "84",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chest-of-drawers": {
                "name": "Chest of Drawers",
                "itemList": {
                    "chest-of-drawers-large-": {
                        "name": "Chest of Drawers (Large)",
                        "cube": "  30 ",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "chest-tools": {
                "name": "Chest, Tools",
                "itemList": {
                    "chest-tools": {
                        "name": "Chest, Tools",
                        "cube": "  15 ",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "child-table-chairs": {
                "name": "Child Table / Chairs",
                "itemList": {
                    "child-table-chairs": {
                        "name": "Child Table / Chairs",
                        "cube": "  3 ",
                        "weight": "20",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "china-cabinet": {
                "name": "China Cabinet",
                "itemList": {
                    "china-cabinet-2-piece": {
                        "name": "China Cabinet - 2 piece",
                        "cube": "  50 ",
                        "weight": "250",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "clothes-basket": {
                "name": "Clothes Basket",
                "itemList": {
                    "clothes-basket": {
                        "name": "Clothes Basket",
                        "cube": "  2 ",
                        "weight": "10",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "clothes-hamper": {
                "name": "Clothes Hamper",
                "itemList": {
                    "clothes-hamper": {
                        "name": "Clothes Hamper",
                        "cube": "  2 ",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "coat-stand": {
                "name": "Coat Stand",
                "itemList": {
                    "coat-stand": {
                        "name": "Coat Stand",
                        "cube": "  5 ",
                        "weight": "50",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "coffee-table": {
                "name": "Coffee Table",
                "itemList": {
                    "coffee-table-small-": {
                        "name": "Coffee Table (Small)",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "computer-table-desk": {
                "name": "Computer Table/Desk",
                "itemList": {
                    "computer-table-desk": {
                        "name": "Computer Table/Desk",
                        "cube": "  10 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "cradle": {
                "name": "Cradle",
                "itemList": {
                    "cradle": {
                        "name": "Cradle",
                        "cube": "  3 ",
                        "weight": "50",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "credenza": {
                "name": "Credenza",
                "itemList": {
                    "credenza": {
                        "name": "Credenza",
                        "cube": "  20 ",
                        "weight": "100",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "crib": {
                "name": "Crib",
                "itemList": {
                    "crib": {
                        "name": "Crib",
                        "cube": "  10 ",
                        "weight": "40",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dehumidifier": {
                "name": "Dehumidifier",
                "itemList": {
                    "dehumidifier": {
                        "name": "Dehumidifier",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "desk": {
                "name": "Desk",
                "itemList": {
                    "desk-single": {
                        "name": "Desk, Single",
                        "cube": "  20 ",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "diaper-trash-can": {
                "name": "Diaper Trash Can",
                "itemList": {
                    "diaper-trash-can": {
                        "name": "Diaper Trash Can",
                        "cube": "  6 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dining-table": {
                "name": "Dining Table",
                "itemList": {
                    "dining-table-small-": {
                        "name": "Dining Table (Small)",
                        "cube": "  20 ",
                        "weight": "100",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dishwasher": {
                "name": "Dishwasher",
                "itemList": {
                    "dishwasher": {
                        "name": "Dishwasher",
                        "cube": "  12 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dog-house": {
                "name": "Dog House",
                "itemList": {
                    "dog-house": {
                        "name": "Dog House",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dresser": {
                "name": "Dresser",
                "itemList": {
                    "dresser-triple": {
                        "name": "Dresser, Triple",
                        "cube": "  20 ",
                        "weight": "225",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "dryer": {
                "name": "Dryer",
                "itemList": {
                    "dryer-gas": {
                        "name": "Dryer-Gas",
                        "cube": "  15 ",
                        "weight": "150",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "edger": {
                "name": "Edger",
                "itemList": {
                    "edger": {
                        "name": "Edger",
                        "cube": "  2 ",
                        "weight": "10",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "elliptical-machine": {
                "name": "Elliptical Machine",
                "itemList": {
                    "elliptical-machine": {
                        "name": "Elliptical Machine",
                        "cube": "  50 ",
                        "weight": "350",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "entertainment-center": {
                "name": "Entertainment Center",
                "itemList": {
                    "entertainment-ctr-large-": {
                        "name": "Entertainment Ctr. (Large)",
                        "cube": "  60 ",
                        "weight": "420",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "exercise-bike": {
                "name": "Exercise Bike",
                "itemList": {
                    "exercise-bike": {
                        "name": "Exercise Bike",
                        "cube": "  15 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "exercise-equipment-large-": {
                "name": "Exercise Equipment, (Large)",
                "itemList": {
                    "exercise-equipment-large-": {
                        "name": "Exercise Equipment, (Large)",
                        "cube": "  30 ",
                        "weight": "220",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "exercise-equipment-small-": {
                "name": "Exercise Equipment, (Small)",
                "itemList": {
                    "exercise-equipment-small-": {
                        "name": "Exercise Equipment, (Small)",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "extension-ladder": {
                "name": "Extension Ladder",
                "itemList": {
                    "extension-ladder": {
                        "name": "Extension Ladder",
                        "cube": "  10 ",
                        "weight": "50",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "fan-box-or-stand": {
                "name": "Fan, Box or Stand",
                "itemList": {
                    "fan-box-or-stand": {
                        "name": "Fan, Box or Stand",
                        "cube": "  2 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "fan-ceiling": {
                "name": "Fan, Ceiling",
                "itemList": {
                    "fan-ceiling": {
                        "name": "Fan, Ceiling",
                        "cube": "  4 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "file-cabinet": {
                "name": "File Cabinet",
                "itemList": {
                    "file-cab-5-draw-": {
                        "name": "File Cab (5 Draw)",
                        "cube": "  15 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "fireplace-equipment": {
                "name": "Fireplace Equipment",
                "itemList": {
                    "fireplace-equipment": {
                        "name": "Fireplace Equipment",
                        "cube": "  1 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "footlocker": {
                "name": "Footlocker",
                "itemList": {
                    "footlocker": {
                        "name": "Footlocker",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "freezer": {
                "name": "Freezer",
                "itemList": {
                    "freezer-chest-standard-": {
                        "name": "Freezer, Chest (Standard)",
                        "cube": "  40 ",
                        "weight": "150",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "freezer-chest": {
                "name": "Freezer, Chest",
                "itemList": {
                    "freezer-chest-standard-": {
                        "name": "Freezer, Chest (Standard)",
                        "cube": "  40 ",
                        "weight": "150",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "fridge-freezer": {
                "name": "Fridge/Freezer",
                "itemList": {
                    "fridge-freezer-standard-": {
                        "name": "Fridge/Freezer (Standard)",
                        "cube": "  40 ",
                        "weight": "150",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "garbage-can": {
                "name": "Garbage Can",
                "itemList": {
                    "garbage-can": {
                        "name": "Garbage Can",
                        "cube": "  5 ",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "garden-bench": {
                "name": "Garden Bench",
                "itemList": {
                    "garden-bench": {
                        "name": "Garden Bench",
                        "cube": "  5 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "garden-table": {
                "name": "Garden Table",
                "itemList": {
                    "garden-table": {
                        "name": "Garden Table",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "garden-tools": {
                "name": "Garden Tools",
                "itemList": {
                    "garden-tools": {
                        "name": "Garden Tools",
                        "cube": "  1 ",
                        "weight": "10",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "glider-settee": {
                "name": "Glider-Settee",
                "itemList": {
                    "glider-settee": {
                        "name": "Glider-Settee",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "golf-clubs": {
                "name": "Golf Clubs",
                "itemList": {
                    "golf-clubs": {
                        "name": "Golf Clubs",
                        "cube": "  3 ",
                        "weight": "49",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "grandfather-clock": {
                "name": "Grandfather Clock",
                "itemList": {
                    "grandfather-clock": {
                        "name": "Grandfather Clock",
                        "cube": "  15 ",
                        "weight": "100",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "grill-propane": {
                "name": "Grill, Propane",
                "itemList": {
                    "grill-propane": {
                        "name": "Grill, Propane",
                        "cube": "  15 ",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "guitar": {
                "name": "Guitar",
                "itemList": {
                    "guitar": {
                        "name": "Guitar",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "gun-cabinet": {
                "name": "Gun Cabinet",
                "itemList": {
                    "gun-cabinet": {
                        "name": "Gun Cabinet",
                        "cube": "  20 ",
                        "weight": "75",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "harvest-bench": {
                "name": "Harvest Bench",
                "itemList": {
                    "harvest-bench": {
                        "name": "Harvest Bench",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "hose-reel": {
                "name": "Hose & Reel",
                "itemList": {
                    "hose-reel": {
                        "name": "Hose & Reel",
                        "cube": "  3 ",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "ironing-board": {
                "name": "Ironing Board",
                "itemList": {
                    "ironing-board": {
                        "name": "Ironing Board",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "ladder": {
                "name": "Ladder",
                "itemList": {
                    "ladder-step": {
                        "name": "Ladder, Step",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "lamp": {
                "name": "Lamp",
                "itemList": {
                    "lamp-table": {
                        "name": "Lamp, Table",
                        "cube": "  3 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "large-sideboard": {
                "name": "Large Sideboard",
                "itemList": {
                    "large-sideboard": {
                        "name": "Large Sideboard",
                        "cube": "  30 ",
                        "weight": "175",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "lawn-edger": {
                "name": "Lawn Edger",
                "itemList": {
                    "lawn-edger": {
                        "name": "Lawn Edger",
                        "cube": "  2 ",
                        "weight": "15",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "lawn-mower": {
                "name": "Lawn Mower",
                "itemList": {
                    "lawn-mower-riding": {
                        "name": "Lawn Mower, Riding",
                        "cube": "  20 ",
                        "weight": "350",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "leaf-sweeper": {
                "name": "Leaf Sweeper",
                "itemList": {
                    "leaf-sweeper": {
                        "name": "Leaf Sweeper",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "microwave": {
                "name": "Microwave",
                "itemList": {
                    "microwave": {
                        "name": "Microwave",
                        "cube": "  3 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "mirror": {
                "name": "Mirror",
                "itemList": {
                    "dresser-mirror": {
                        "name": "Dresser Mirror",
                        "cube": "  -   ",
                        "weight": "0",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "moped": {
                "name": "Moped",
                "itemList": {
                    "moped": {
                        "name": "Moped",
                        "cube": "  35 ",
                        "weight": "245",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "musical-instrument": {
                "name": "Musical Instrument",
                "itemList": {
                    "musical-instrument": {
                        "name": "Musical Instrument",
                        "cube": "  15 ",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "oriental-screen": {
                "name": "Oriental Screen",
                "itemList": {
                    "oriental-screen": {
                        "name": "Oriental Screen",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "ottoman-footstool": {
                "name": "Ottoman/Footstool",
                "itemList": {
                    "ottoman-footstool-large-": {
                        "name": "Ottoman/Footstool (Large)",
                        "cube": "  5 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "painting": {
                "name": "Painting",
                "itemList": {
                    "painting-small-": {
                        "name": "Painting (Small)",
                        "cube": "  3 ",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "patio-set": {
                "name": "Patio Set",
                "itemList": {
                    "patio-set-5-piece-": {
                        "name": "Patio Set (5 piece)",
                        "cube": "  70 ",
                        "weight": "400",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "patio-set-5-piece-": {
                "name": "Patio Set (5 piece)",
                "itemList": {
                    "patio-set-5-piece-": {
                        "name": "Patio Set (5 piece)",
                        "cube": "  70 ",
                        "weight": "400",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "patio-table": {
                "name": "Patio Table",
                "itemList": {
                    "patio-table": {
                        "name": "Patio Table",
                        "cube": "  25 ",
                        "weight": "175",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "patio-umbrella": {
                "name": "Patio Umbrella",
                "itemList": {
                    "patio-umbrella": {
                        "name": "Patio Umbrella",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "piano": {
                "name": "Piano",
                "itemList": {
                    "piano-upright": {
                        "name": "Piano, Upright",
                        "cube": "  70 ",
                        "weight": "600",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "picnic-bench": {
                "name": "Picnic Bench",
                "itemList": {
                    "picnic-bench": {
                        "name": "Picnic Bench",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "picnic-table": {
                "name": "Picnic Table",
                "itemList": {
                    "picnic-table": {
                        "name": "Picnic Table",
                        "cube": "  20 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "ping-pong-table": {
                "name": "Ping Pong Table",
                "itemList": {
                    "ping-pong-table": {
                        "name": "Ping Pong Table",
                        "cube": "  50 ",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "plant": {
                "name": "Plant",
                "itemList": {
                    "plant-artificial-small-": {
                        "name": "Plant Artificial (Small)",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "plant-stand": {
                "name": "Plant Stand",
                "itemList": {
                    "plant-stand": {
                        "name": "Plant Stand",
                        "cube": "  2 ",
                        "weight": "14",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "plastic-bin": {
                "name": "Plastic Bin",
                "itemList": {
                    "plastic-bin-small-": {
                        "name": "Plastic Bin (Small)",
                        "cube": "  2 ",
                        "weight": "14",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "playpen": {
                "name": "Playpen",
                "itemList": {
                    "playpen-non-folding": {
                        "name": "Playpen, Non-Folding",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "playpen-folding": {
                "name": "Playpen, Folding",
                "itemList": {
                    "playpen-folding": {
                        "name": "Playpen, Folding",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "pool-table": {
                "name": "Pool Table",
                "itemList": {
                    "pool-table": {
                        "name": "Pool Table",
                        "cube": "  50 ",
                        "weight": "500",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "portable-sewing-machine": {
                "name": "Portable Sewing Machine",
                "itemList": {
                    "portable-sewing-machine": {
                        "name": "Portable Sewing Machine",
                        "cube": "  3 ",
                        "weight": "42",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "power-tool": {
                "name": "Power Tool",
                "itemList": {
                    "power-tool": {
                        "name": "Power Tool",
                        "cube": "  1 ",
                        "weight": "7",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "power-tool-stand": {
                "name": "Power Tool Stand",
                "itemList": {
                    "power-tool-stand": {
                        "name": "Power Tool Stand",
                        "cube": "  3 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "range-oven": {
                "name": "Range, Oven",
                "itemList": {
                    "range-oven": {
                        "name": "Range, Oven",
                        "cube": "  20 ",
                        "weight": "220",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "roll-top-desk": {
                "name": "Roll-Top Desk",
                "itemList": {
                    "roll-top-desk": {
                        "name": "Roll-Top Desk",
                        "cube": "  20 ",
                        "weight": "250",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "safe": {
                "name": "Safe",
                "itemList": {
                    "safe-small-": {
                        "name": "Safe (Small)",
                        "cube": "  15 ",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sand-box": {
                "name": "Sand Box",
                "itemList": {
                    "sand-box": {
                        "name": "Sand Box",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sawhorse": {
                "name": "Sawhorse",
                "itemList": {
                    "sawhorse": {
                        "name": "Sawhorse",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sculpture": {
                "name": "Sculpture",
                "itemList": {
                    "sculpture": {
                        "name": "Sculpture",
                        "cube": "  4 ",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "serving-cart": {
                "name": "Serving Cart",
                "itemList": {
                    "serving-cart": {
                        "name": "Serving Cart",
                        "cube": "  5 ",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sewing-machine-console": {
                "name": "Sewing Machine, Console",
                "itemList": {
                    "sewing-machine-console": {
                        "name": "Sewing Machine, Console",
                        "cube": "  10 ",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "shelving": {
                "name": "Shelving",
                "itemList": {
                    "shelving": {
                        "name": "Shelving",
                        "cube": "  4 ",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "shoe-rack": {
                "name": "Shoe Rack",
                "itemList": {
                    "shoe-rack": {
                        "name": "Shoe Rack",
                        "cube": "  5 ",
                        "weight": "40",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sideboard-large-": {
                "name": "Sideboard (Large)",
                "itemList": {
                    "sideboard-large-": {
                        "name": "Sideboard (Large)",
                        "cube": "  30 ",
                        "weight": "150",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "snowblower": {
                "name": "Snowblower",
                "itemList": {
                    "snowblower": {
                        "name": "Snowblower",
                        "cube": "  8 ",
                        "weight": "140",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "sofa": {
                "name": "Sofa",
                "itemList": {
                    "sofa-loveseat": {
                        "name": "Sofa, Loveseat",
                        "cube": "  25 ",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "spa-hot-tub": {
                "name": "Spa/Hot Tub",
                "itemList": {
                    "spa-hot-tub": {
                        "name": "Spa/Hot Tub",
                        "cube": "  70 ",
                        "weight": "490",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "spreader": {
                "name": "Spreader",
                "itemList": {
                    "spreader": {
                        "name": "Spreader",
                        "cube": "  2 ",
                        "weight": "14",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "stand": {
                "name": "Stand",
                "itemList": {
                    "stand": {
                        "name": "Stand",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "stroller": {
                "name": "Stroller",
                "itemList": {
                    "stroller": {
                        "name": "Stroller",
                        "cube": "  5 ",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "suitcase": {
                "name": "Suitcase",
                "itemList": {
                    "suitcase-large-": {
                        "name": "Suitcase (Large)",
                        "cube": "8",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "table": {
                "name": "Table",
                "itemList": {
                    "vanity-table": {
                        "name": "Vanity Table",
                        "cube": "15",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "table-saw": {
                "name": "Table Saw",
                "itemList": {
                    "table-saw": {
                        "name": "Table Saw",
                        "cube": "20",
                        "weight": "250",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "table-baby-s": {
                "name": "Table, Baby's",
                "itemList": {
                    "table-baby-s": {
                        "name": "Table, Baby's",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "tire": {
                "name": "Tire",
                "itemList": {
                    "tire": {
                        "name": "Tire",
                        "cube": "2",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "tool-box": {
                "name": "Tool Box",
                "itemList": {
                    "tool-box-small-": {
                        "name": "Tool Box (Small)",
                        "cube": "3",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "toy-chest": {
                "name": "Toy Chest",
                "itemList": {
                    "toy-chest": {
                        "name": "Toy Chest",
                        "cube": "5",
                        "weight": "65",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "trash-can": {
                "name": "Trash Can",
                "itemList": {
                    "trash-can": {
                        "name": "Trash Can",
                        "cube": "7",
                        "weight": "49",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "treadmill": {
                "name": "Treadmill",
                "itemList": {
                    "treadmill": {
                        "name": "Treadmill",
                        "cube": "50",
                        "weight": "350",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "trunk": {
                "name": "Trunk",
                "itemList": {
                    "trunk": {
                        "name": "Trunk",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "tv": {
                "name": "TV",
                "itemList": {
                    "tv-51-": {
                        "name": "TV - 51\"+",
                        "cube": "15",
                        "weight": "125",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "tv-stand": {
                "name": "TV Stand",
                "itemList": {
                    "tv-stand": {
                        "name": "TV Stand",
                        "cube": "5",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "tv-tray-set": {
                "name": "TV Tray Set",
                "itemList": {
                    "tv-tray-set": {
                        "name": "TV Tray Set",
                        "cube": "4",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "umbrella": {
                "name": "Umbrella",
                "itemList": {
                    "umbrella": {
                        "name": "Umbrella",
                        "cube": "3",
                        "weight": "21",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "utility-cabinet": {
                "name": "Utility Cabinet",
                "itemList": {
                    "utility-cabinet": {
                        "name": "Utility Cabinet",
                        "cube": "15",
                        "weight": "105",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "vacuum-cleaner": {
                "name": "Vacuum Cleaner",
                "itemList": {
                    "vacuum-cleaner": {
                        "name": "Vacuum Cleaner",
                        "cube": "3",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "valet": {
                "name": "Valet",
                "itemList": {
                    "clothes-valet": {
                        "name": "Clothes Valet",
                        "cube": "2",
                        "weight": "25",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wading-pool": {
                "name": "Wading Pool",
                "itemList": {
                    "wading-pool": {
                        "name": "Wading Pool",
                        "cube": "4",
                        "weight": "28",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wagon": {
                "name": "Wagon",
                "itemList": {
                    "wagon": {
                        "name": "Wagon",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wall-shelves": {
                "name": "Wall Shelves",
                "itemList": {
                    "wall-shelves": {
                        "name": "Wall Shelves",
                        "cube": "10",
                        "weight": "70",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wall-unit": {
                "name": "Wall Unit",
                "itemList": {
                    "wall-unit-small-": {
                        "name": "Wall Unit (Small)",
                        "cube": "40",
                        "weight": "280",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wardrobe": {
                "name": "Wardrobe",
                "itemList": {
                    "wardrobe-triple": {
                        "name": "Wardrobe, Triple",
                        "cube": "60",
                        "weight": "300",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "washer-and-dryer-combo": {
                "name": "Washer and Dryer Combo",
                "itemList": {
                    "washer-and-dryer-combo": {
                        "name": "Washer and Dryer Combo",
                        "cube": "50",
                        "weight": "350",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "washing-machine": {
                "name": "Washing Machine",
                "itemList": {
                    "washing-machine": {
                        "name": "Washing Machine",
                        "cube": "10",
                        "weight": "200",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "waste-basket": {
                "name": "Waste Basket",
                "itemList": {
                    "waste-basket": {
                        "name": "Waste Basket",
                        "cube": "2",
                        "weight": "14",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "weight-bench": {
                "name": "Weight Bench",
                "itemList": {
                    "weight-bench": {
                        "name": "Weight Bench",
                        "cube": "5",
                        "weight": "45",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wheelbarrow": {
                "name": "Wheelbarrow",
                "itemList": {
                    "wheelbarrow": {
                        "name": "Wheelbarrow",
                        "cube": "10",
                        "weight": "50",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "wine-rack": {
                "name": "Wine Rack",
                "itemList": {
                    "wine-rack": {
                        "name": "Wine Rack",
                        "cube": "5",
                        "weight": "35",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            },
            "workbench": {
                "name": "Workbench",
                "itemList": {
                    "workbench-standard-": {
                        "name": "Workbench (Standard)",
                        "cube": "30",
                        "weight": "260",
                        "is_default": "false",
                        "default_count": "0"
                    }
                }
            }
        }
    }
}

const DIRTY_LIMIT = 0
const UPDATE_INVENTORY_DATA = 'UPDATE_INVENTORY_DATA'
const SET_ACTIVE_ROOM_ID = 'SET_ACTIVE_ROOM_ID'
const ADJUST_ITEM_COUNT = 'ADJUST_ITEM_COUNT'
const ADD_ITEM = 'ADD_ITEM'
const ADD_ROOM = 'ADD_ROOM'
const SAVE_ROOM = 'SAVE_ROOM'
const DELETE_ROOM = 'DELETE_ROOM'
const UPDATE_DIRTY_COUNT = 'UPDATE_DIRTY_COUNT'

export const updateInventoryData = (data, relocationData, itemsMatrix) => {
    return {
        type: UPDATE_INVENTORY_DATA,
        data: data,
        relocationData: relocationData,
        itemsMatrix: itemsMatrix
    }
}

export const setActiveRoom = (roomId) => {
    return {
        type: SET_ACTIVE_ROOM_ID,
        activeRoomId: roomId
    }
}

export const adjustItemCount = (roomId, itemId, count) => {
    return {
        type: ADJUST_ITEM_COUNT,
        roomId: roomId,
        itemId: itemId,
        count: count
    }
}

export const addItem = (roomId, itemId) => {
    return {
        type: ADD_ITEM,
        roomId: roomId,
        itemId: itemId
    }
}

export const addRoom = (roomTypeId, roomName) => {
    return {
        type: ADD_ROOM,
        roomTypeId: roomTypeId,
        roomName: roomName
    }
}

export const saveRoom = (roomName) => {
    return {
        type: SAVE_ROOM,
        roomName: roomName
    }
}

export const deleteRoom = () => {
    return {
        type: DELETE_ROOM
    }
}

export const updateDirtyCount = (count) => {
    return {
        type: UPDATE_DIRTY_COUNT,
        dirtyCount: count
    }
}

export const asyncFetchInventoryData = () => {
    return function (dispatch) {
        retrieveAuthTokenFromDevice().then((token) => {
            
            dispatch(addAsyncWorkingRequest())
        
            Promise.all([
                getInventoryData(token),
                getInventoryItemMatrix(token)
            ]).then((responses) => {
                let [rawData, itemsMatrix] =  responses
                const relocationData = unpackResponse(rawData)

                //@TODO: Remove this when heroku is updated
                itemsMatrix = sampleItemsMatrix

                let inventoryJson = null
                
                try {
                    inventoryJson = JSON.parse(relocationData.inventoryData)
                } catch(e){
                    console.log(e)
                }
                const inventoryData = (inventoryJson && inventoryJson.rooms) ? inventoryJson : { rooms: {}}

                dispatch(updateInventoryData(inventoryData, relocationData, itemsMatrix))
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                dispatch(removeAsyncWorkingRequest())
            })
        }).catch((error) => {
            console.error(error);
        })
    }
}

export const asyncAdjustItemCount = (roomId, itemId, count) => {
    return function (dispatch, getState) {
        dispatch(adjustItemCount(roomId, itemId, count))
        dispatch(asyncPersistInventoryDataIfDirty())
    }
}

export const asyncAddItemToRoom = (roomId, itemIdentifier) => {
    return function (dispatch, getState) {
        dispatch(addItem(roomId, itemIdentifier))
        dispatch(asyncPersistInventoryDataIfDirty())
    }
}

export const asyncAddRoom = (roomTypeId, roomIdentifier) => {
    return function (dispatch, getState) {
        dispatch(addRoom(roomTypeId, roomIdentifier))
        dispatch(asyncPersistInventoryData())
    }
}

export const asyncSaveRoom = (roomName) => {
    return function (dispatch, getState) {
        dispatch(saveRoom(roomName))
        dispatch(asyncPersistInventoryData())
    }
}

export const asyncDeleteRoom = () => {
    return function (dispatch, getState) {
        dispatch(deleteRoom())
        dispatch(asyncPersistInventoryData())
    }
}

const asyncPersistInventoryDataIfDirty = () => {
    return function (dispatch, getState) {
        let inventoryData = getState().inventory.data
        
        if (inventoryData.dirty_count >= DIRTY_LIMIT) {
            dispatch(asyncPersistInventoryData())
        } else {
            if (inventoryData.dirty_count) {
                inventoryData.dirty_count += 1
            } else {
                inventoryData.dirty_count = 1
            }
            dispatch(updateDirtyCount(inventoryData.dirty_count))
        }
    }
}

export const asyncPersistInventoryData = () => {
    return function (dispatch, getState) {
        let inventoryData = getState().inventory.data
        const { cube_total, weight_total, item_count, unsaved_count } = inventoryData
        

        const data = {
            inventoryData: JSON.stringify(inventoryData), 
            weightInPounds: weight_total, 
            cubes: cube_total,
            totalItemsCount: item_count
        }
        
        retrieveAuthTokenFromDevice().then((token) => {
            saveInventoryData(data, token)
                .then(() => {
                    dispatch(updateDirtyCount(0))
                })
                .catch((error) => {
                    console.error(error);
                })
        }).catch((error) => {
            console.error(error);
        })
    }
}

const initialState = {
    data: null,
    itemsMatrix: null,
    activeRoomId: null
}

const updateInventoryMetrics = (itemKey, newCount, oldCount,  data, itemsMatrix) => {
    let { item_count, cube_total, weight_total } = data
    const [ roomTypeId, categoryId, itemId ] = itemKey.split('_')

    const item = itemsMatrix[roomTypeId].categories[categoryId].itemList[itemId]
    const adjustment = newCount - oldCount

    item_count += adjustment
    data.item_count = item_count > 0 ? item_count : 0

    weight_total += (item.weight * adjustment)
    data.weight_total = weight_total > 0 ? weight_total : 0
    
    cube_total += (item.cube * adjustment)
    data.cube_total = cube_total > 0 ? cube_total : 0

    return data;
}

//Inventory Reducer
const inventory = (state = initialState, action) => {
    let data;
    let items;
    let oldCount;

    switch (action.type) {
        case ADJUST_ITEM_COUNT:
            data = Object.assign({}, state.data);
            items = data.rooms[action.roomId].items
            oldCount = items[action.itemId]
            items[action.itemId] = action.count
            
            data = updateInventoryMetrics(action.itemId, action.count, oldCount, data, state.itemsMatrix)
            console.log('data', data)
            return {
                ...state,
                data: data,
            }
        case SET_ACTIVE_ROOM_ID:
            return {
                ...state,
                activeRoomId: action.activeRoomId
            }
        case ADD_ITEM:
            data = Object.assign({}, state.data)
            items = data.rooms[action.roomId].items
            oldCount = 0

            if (action.itemId in items) {
                oldCount = items[action.itemId]
                items[action.itemId] += 1
            } else {
                items[action.itemId] = 1
            }

            data = updateInventoryMetrics(action.itemId, 1, oldCount, data, state.itemsMatrix)

            return {
                ...state,
                data: data,
            }
        case ADD_ROOM:
            data = Object.assign({}, state.data)
            
            //@TODO: Matrix from state
            const roomCategories = state.itemsMatrix[action.roomTypeId].categories
            let items = {}

            for (let categoryKey in roomCategories) {
                if (roomCategories.hasOwnProperty(categoryKey)) {
                    const categoryItems = roomCategories[categoryKey].itemList

                    for (let itemKey in categoryItems) {
                        const item = categoryItems[itemKey]

                        if (item.is_default) {
                            items[`${action.roomTypeId}_${categoryKey}_${itemKey}`] = parseInt(item.default_count)
                        }
                    }
                }
            }

            const guid = generateGuid()
            data.rooms[guid] = {
                name: action.roomName,
                room_type_id: action.roomTypeId,
                items: items
            }

            Object.keys(items).forEach(function(itemId, i) {
                count = items[itemId]
                data = updateInventoryMetrics(itemId, count, 0, data, state.itemsMatrix)
            })

            return {
                ...state,
                data: data,
            }
        case SAVE_ROOM:
            data = Object.assign({}, state.data)
            data.rooms[state.activeRoomId].name = action.roomName

            return {
                ...state,
                data: data
            }
        case DELETE_ROOM:
            data = Object.assign({}, state.data)

            const room = data.rooms[state.activeRoomId]
            const itemsToDelete = room.items

            Object.keys(itemsToDelete).forEach(function(itemId, i) {
                oldCount = itemsToDelete[itemId]
                data = updateInventoryMetrics(itemId, 0, oldCount, data, state.itemsMatrix)
            })

            delete data.rooms[state.activeRoomId]

            return {
                ...state,
                data: data,
                activeRoomId: null
            }
        case UPDATE_DIRTY_COUNT:
            data = Object.assign({}, state.data)
            data.dirty_count = action.dirtyCount

            return {
                ...state,
                data: data,
            }
        case UPDATE_INVENTORY_DATA:
            return {
                ...state,
                data: action.data,
                relocationData: action.relocationData,
                itemsMatrix: action.itemsMatrix
            }
        default:
            return state
    }
}

export default inventory;



export const getInventoryDataSelector = (state) => state.inventory.data
export const getInventoryRoomsSelector = (state) => state.inventory.data ? state.inventory.data.rooms : null
export const getActiveRoomSelector = (state) => state.inventory.activeRoomId

export const doInventoryItemsExistSelector = createSelector(
    getInventoryDataSelector,
    (inventoryData) => {

        let hasInventory = false
        if (inventoryData) {
            hasInventory = inventoryData.rooms && Object.keys(inventoryData.rooms).length > 0
        }

        return hasInventory
    }
)

export const getRoomCountSelector = createSelector(
    getInventoryRoomsSelector,
    (rooms) => {
        return rooms !== null ? Object.keys(rooms).length : 0
    }
)

export const getItemCountSelector = createSelector(
    getInventoryDataSelector,
    (data) => {
        return data !== null ? data.item_count : 0
    }
)

export const getRoomDetailSelector = createSelector(
    getInventoryRoomsSelector,
    getActiveRoomSelector,
    (rooms, activeRoomId) => {
        return rooms[activeRoomId]
    }
)