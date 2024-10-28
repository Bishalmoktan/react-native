import { View, Text, Image } from "react-native";

import { images } from "../constants";
import CustomButton from "./custom-button";
import { router } from "expo-router";

interface EmptyProps {
  title: string;
  subtitle: string;
}

const Empty = ({ title, subtitle }: EmptyProps) => {
  return (
    <View className="items-center justify-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />

      <Text className="text-2xl text-white font-pregular">{title}</Text>
      <Text className="text-sm text-gray-100 font-pmedium">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        handlePress={() => router.push("/create")}
        containerStyles="w-full my-5"
        loading={false}
      />
    </View>
  );
};
export default Empty;
