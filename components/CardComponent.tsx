import { View, Image, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";

export default function CardTemplate(image: string, text: string) {
	return (
		<Card style={styles.cardContainer} >
			<Card.Actions>
				<Card.Content style={styles.cardContent} >
					<Card.Cover style={styles.cardLogo} source={require('../assets/images/adaptive-icon.png')} />
					<Text variant="bodySmall"  style={styles.cardText} >Body Mediumdfadffada</Text>
				</Card.Content>
			</Card.Actions>
		</Card>
	);
};
}

const styles = StyleSheet.create({
	cardContainer: {
		height: 100,
		width: 100,
		borderRadius: 20,
		backgroundColor: "#ffffff",
		paddingTop: 16,
	},
	cardContent: {
		flex: 1,
		alignItems: "center",
		gap: 4,
	},
	cardLogo: {
		height: 30,
		width: 30,
	},
	cardText: {
		position: "absolute",
	},
});
