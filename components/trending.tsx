import { icons } from "@/constants";
import { getLatestVideos } from "@/lib/appWrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { Videos } from "@/types";
import { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { ViewToken } from "react-native";
import { ResizeMode, Video } from "expo-av";

interface TrendingItemProps {
  item: Videos;
  activeItem: string | null;
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1.1,
  },
};

const zoomOut = {
  0: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ item, activeItem }: TrendingItemProps) => {
  const isActive = activeItem === item.$id;
  const [play, setPlay] = useState(false);
  return (
    <Animatable.View
      className="mr-5"
      // @ts-ignore
      animation={isActive ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video}}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            marginTop: 12,
          }}
          resizeMode={ResizeMode.CONTAIN}
          className="w-52 h-72 rounded-[35px] mt-3 bg-white/10"
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(playbackStatus) => {
            if (!playbackStatus.isLoaded) {
              if (playbackStatus.error) {
                console.log(
                  `Encountered a fatal error during playback: ${playbackStatus.error}`
                );
              }
            } else {
             

              if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
                console.log("finished..");
                setPlay(false);
              }
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="relative items-center justify-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] overflow-hidden my-5 shadow-lg shadow-black/70"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="absolute size-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = () => {
  const { data: posts, loading } = useAppwrite(getLatestVideos);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  useEffect(() => {
    if (posts) {
      setActiveItem(posts[1]);
    }
  }, [posts]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default Trending;
