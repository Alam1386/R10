import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from 'react-apollo-hooks'
import { View, Text } from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import styles from './assets/Style'
import Icons from 'react-native-vector-icons/FontAwesome5'

const allConducts = gql`
	{
		allConducts {
			id
			title
			description
			order
		}
	}
`

const CoC = props => {
	const [section, setSection] = useState([])

	renderHeader = (section, index, isActive) => {
		return (
			<View>
				<Text style={styles.CoCIcon}>
					{!isActive && <Icons name='plus' size={12} color='#9963EA' style={{ justifyContent: 'center' }} />}
					{isActive && <Icons name='minus' size={12} color='#9963EA' style={{ justifyContent: 'center' }} />}
				</Text>
				<Text style={styles.CoCTitle}>{section.title}</Text>
			</View>
		)
	}

	renderContent = section => {
		return (
			<View style={styles.content}>
				<Text style={styles.CoCContent}>{section.description}</Text>
			</View>
		)
	}

	updateSections = activeSections => {
		setSection(activeSections)
	}

	const { data, error, loading } = useQuery(allConducts)
	if (loading) {
		return <Text>Loading...</Text>
	}
	if (error) {
		return <Text>Error! {error.message}</Text>
	}
	return (
		<Accordion
			sections={data.allConducts}
			activeSections={section}
			renderHeader={renderHeader}
			renderContent={renderContent}
			onChange={updateSections}
			underlayColor={'#ffffff'}
		/>
	)
}

export default CoC
