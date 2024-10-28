import { icons } from "@/constants";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

interface SearchFieldProps {
  value: string;
  placeholder: string;
  handleTextChange: (text: string) => void;
}

const SearchField = ({
  value,
  placeholder,
  handleTextChange,
}: SearchFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={`flex-row items-center w-full h-16 px-4 border rounded-2xl bg-black-100 ${isFocused ? "border-secondary" : "border-black-100"}`}
    >
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        className="flex-1 text-base text-white font-psemibold"
        placeholderTextColor="#7b7b8b"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="size-6" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};
export default SearchField;
