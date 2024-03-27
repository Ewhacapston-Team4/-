import { StyleSheet, View, Text } from "react-native";

import Box from "../ui/Box";

function SelectButton({ title }) {
  return (
    <Box>
      <View>
        <Text>{title}</Text>
      </View>
    </Box>
  );
}

export default SelectButton;

const styles = StyleSheet.create({});
