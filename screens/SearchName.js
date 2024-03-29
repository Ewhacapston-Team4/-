import { View, Button } from "react-native";

import Title from "../ui/Title";

function SearchName() {
  return (
    <View>
      <Title>이름으로 검색</Title>
      <Button title="촬영"></Button>
    </View>
  );
}

export default SearchName;
