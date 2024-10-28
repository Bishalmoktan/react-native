import { icons } from "@/constants";
import { Videos } from "@/types";
import { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
const VideoCard = ({
  title,
  thumbnail,
  video,
  creator: { avatar, username },
}: Videos) => {
  const [isPlay, setIsPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row justify-between w-full">
        <View className="flex-row gap-4">
          <View className="w-[46px] h-[46px] border  ">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View>
            <Text
              className="text-base text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="text-sm text-gray-100 font-pregular">
              {username}
            </Text>
          </View>
        </View>

        <View>
          <Image source={icons.menu} className="size-5" resizeMode="contain" />
        </View>
      </View>

      {isPlay ? (
        <Text className="text-white">Playing...</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setIsPlay(true)}
          className="relative items-center justify-center w-full h-60"
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full mt-3"
            resizeMode="contain"
          />
          <Image source={icons.play} className="absolute size-12" />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default VideoCard;
