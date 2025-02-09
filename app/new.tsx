import {
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  View,
} from "react-native";
import { theme } from "@/theme";
import { PlantlyButton } from "@/components/plantlyButton";
import { useState } from "react";
import { PlantlyImage } from "@/components/PlantlyImage";
import { usePlantStore } from "@/store/plantstore";
import { useRouter } from "expo-router";

export default function NewScreen() {
  const router = useRouter();
  const addPlant = usePlantStore((state) => state.addPlant);
  const [name, setName] = useState<string>();
  const [days, setDays] = useState<string>();

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert("Validation Error", "Give your plant a name");
    }

    if (!days) {
      return Alert.alert(
        "Validation Error",
        `How often does ${name} need to be watered?`
      );
    }

    if (Number.isNaN(Number(days))) {
      return Alert.alert(
        "Validation Error",
        "Watering frequency must be a be a number"
      );
    }

    addPlant(name, Number(days));
       // The default behaviour of the underlying library has changed. If you are using Expo Router 4+ (which depends on React Navigation 7+), use router.back() here instead. More info: https://reactnavigation.org/docs/upgrading-from-6.x/#the-navigate-method-no-longer-goes-back-use-popto-instead
      router.navigate("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.centered}>
        <PlantlyImage />
      </View>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
        placeholder="E.g. Casper the Cactus"
        autoCapitalize="words"
      />
      <Text style={styles.label}>Watering Frequency (every x days)</Text>
      <TextInput
        value={days}
        onChangeText={setDays}
        style={styles.input}
        placeholder="E.g. 6"
        keyboardType="number-pad"
      />
      <PlantlyButton title="Add plant" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  input: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    borderRadius: 6,
    marginBottom: 24,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  centered: {
    alignItems: "center",
  },
});
