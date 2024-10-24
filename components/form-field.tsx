import { icons } from "@/constants";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardType,
} from "react-native";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  handleTextChange: (text: string) => void;
  otherStyles?: string;
  keyboardType?: KeyboardType;
}

const FormField = ({
  title,
  value,
  placeholder,
  handleTextChange,
  otherStyles,
  keyboardType = "default",
}: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View className={`gap-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View
        className={`flex-row items-center w-full h-16 px-4 border rounded-2xl bg-black-100 ${isFocused ? "border-secondary" : "border-black-100"}`}
      >
        <TextInput
          value={value}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          secureTextEntry={title === "Password" && !showPassword}
          className="flex-1 text-base text-white font-psemibold"
          placeholderTextColor="#7b7b8b"
          keyboardType={keyboardType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              className="size-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
export default FormField;
