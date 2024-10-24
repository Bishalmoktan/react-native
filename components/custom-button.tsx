import { Text, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  loading: boolean;
  containerStyles?: string;
  textStyles?: string;
}

const CustomButton = ({
  title,
  handlePress,
  loading,
  containerStyles,
  textStyles,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      className={`bg-secondary min-h-[62px] justify-center items-center rounded-xl ${containerStyles} ${loading ? "opacity-50" : ""}`}
      onPress={handlePress}
      disabled={loading}
    >
      <Text className={`text-lg text-primary font-psemibold ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
