import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchField from "@/components/search-field";
import Trending from "@/components/trending";
import Empty from "@/components/empty";
import { useState } from "react";
import { getAllVideos } from "@/lib/appWrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";
import { Videos } from "@/types";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refetch } = useAppwrite(getAllVideos);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item } : {item: Videos}) => (
         <VideoCard {...item} />
        )}
        ListHeaderComponent={() => (
          <View className="px-4 my-6 gap-y-6">
            <View className="flex-row items-start justify-between">
              <View>
                <Text className="text-sm text-gray-100 font-pmedium">
                  Welcome back
                </Text>
                <Text className="text-2xl text-white font-pregular">
                  Bishal Moktan
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="h-10 w-9"
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchField
              handleTextChange={() => {}}
              placeholder="Search for a video topic"
              value=""
            />

            <View className="w-full pt-6 pb-8">
              <Text className="mb-3 text-lg text-gray-100 font-pregular">
                Latest Videos
              </Text>

              <Trending />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty
            title="No videos found"
            subtitle="Be the first one to create it"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};
export default Home;
