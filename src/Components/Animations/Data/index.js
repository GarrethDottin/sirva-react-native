import OnBoardingDataScreen0 from './OnBoardingDataScreen0'
import OnBoardingDataScreen1 from './OnBoardingDataScreen1'
import OnBoardingDataScreen2 from './OnBoardingDataScreen2'
import OnBoardingDataScreen3 from './OnBoardingDataScreen3'
import IntroData from './IntroData'
import Loader from './Loader'
import CityGuidesDay from './CityGuidesDay'
import CityGuidesNight from './CityGuidesNight'
import icon01d from './weatherData/01d'
import icon01n from './weatherData/01n'
import icon02d from './weatherData/02d'
import icon02n from './weatherData/02n'
import icon03d from './weatherData/03d'
import icon03n from './weatherData/03n'
import icon04d from './weatherData/04d'
import icon04n from './weatherData/04n'
import icon09d from './weatherData/09d'
import icon09n from './weatherData/09n'
import icon10d from './weatherData/10d'
import icon10n from './weatherData/10n'
import icon11d from './weatherData/11d'
import icon11n from './weatherData/11n'
import icon13d from './weatherData/13d'
import icon13n from './weatherData/13n'
import icon50d from './weatherData/50d'
import icon50n from './weatherData/50n'
import iconWindy from './weatherData/Windy'

cityGuidesData = {
  day: CityGuidesDay,
  night: CityGuidesNight
}

const weatherData = {
  icon01d,
  icon01n,
  icon02d,
  icon02n,
  icon03d,
  icon03n,
  icon04d,
  icon04n,
  icon09d,
  icon09n,
  icon10d,
  icon10n,
  icon11d,
  icon11n,
  icon13d,
  icon13n,
  icon50d,
  icon50n,
  iconWindy
}

export { 
  OnBoardingDataScreen0, 
  OnBoardingDataScreen1, 
  OnBoardingDataScreen2, 
  OnBoardingDataScreen3, 
  IntroData,
  Loader,
  cityGuidesData,
  weatherData,
}

