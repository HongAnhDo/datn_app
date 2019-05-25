import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    dayHeader: {
		flexDirection: 'row',
		borderBottomWidth: 0.5,
		borderTopWidth: 0.5,
		borderColor: '#bbbbbb',
		paddingBottom: 15,
		paddingTop: 15,
	},
	buttonWrapper: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderColor: '#ccc',
		alignItems: 'stretch',
		bottom: 0
	},
	iconClose: {
		height: 45,
		justifyContent: 'center',
		textAlignVertical: 'center'
	},
	header: {
		flexDirection: 'row',
		justifyContent: "flex-start",
		paddingBottom: 5,
		alignItems: 'center'
	},
	titleHeader: {
		fontSize: 20,
		height: 45,
		lineHeight: 45,
		justifyContent: 'center',
		fontWeight: "500",
		color: "#00363d"
	},
	container: {
		backgroundColor: '#fff',
		zIndex: 1000,
		alignSelf: 'center'
	}
})

export default styles;