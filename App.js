import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>OS</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
});
