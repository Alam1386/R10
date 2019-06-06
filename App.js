
import React from 'react';
import {Text, View} from 'react-native';
import Navigation from './components/Navigation'
import { ApolloProvider } from 'react-apollo-hooks';
import client from './components/apolloclient'

function App() {
  return (
		<ApolloProvider client={client}>
			<View style={{flex: 1}}>
				<Navigation />
			</View>
		</ApolloProvider>
	)
}
export default App


