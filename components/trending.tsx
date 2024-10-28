import { View, Text, FlatList } from "react-native";
const Trending = () => {
  return (
    <FlatList
      data={[{ id: "1" }, { id: "2" }, { id: "3" }]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Text className="text-3xl text-white">{item.id}</Text>
      )}
      horizontal
    />
  );
};
export default Trending;
