import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const SearchField = ({ initialQuery }: { initialQuery?: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState(initialQuery || "");
  const pathname = usePathname();
  return (
    <View
      className={`flex-row items-center w-full h-16 px-4 border rounded-2xl bg-black-100 ${isFocused ? "border-secondary" : "border-black-100"}`}
    >
      <TextInput
        value={query}
        placeholder={"Search for a video topic"}
        onChangeText={setQuery}
        className="flex-1 text-base text-white font-psemibold"
        placeholderTextColor="#7b7b8b"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing query",
              "Please input something to search"
            );
          }

          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="size-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default SearchField;
