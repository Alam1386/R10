import { AppRegistry, YellowBox  } from 'react-native'
import App from './App'
import { name as R10Test } from './app.json'


YellowBox.ignoreWarnings(['Remote debugger'])

AppRegistry.registerComponent(R10Test, () => App)