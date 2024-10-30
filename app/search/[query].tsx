import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../../constants";
import SearchField from "@/components/search-field";
import Trending from "@/components/trending";
import Empty from "@/components/empty";
import { useCallback, useEffect } from "react";
import {  searchVideoTopics } from "@/lib/appWrite";
import { useAppwrite } from "@/lib/useAppwrite";
import VideoCard from "@/components/video-card";
import { Videos } from "@/types";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();
  const fetchVideos = useCallback(() => {
    const searchQuery = Array.isArray(query) ? query[0] : query;
    return searchVideoTopics(searchQuery);
  }, [query]);

  const { data: posts, refetch } = useAppwrite(fetchVideos);

  useEffect(() => {
    refetch();
  }, [query])

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }: { item: Videos }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="px-4 my-6=">
            <Text className="text-sm text-gray-100 font-pmedium">
              Search Results
            </Text>
            <Text className="text-2xl text-white font-pregular">{query}</Text>
            <View className="mt-6 mb-8">
            <SearchField
              initialQuery={Array.isArray(query) ? query[0] : query}
              />
              </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <Empty
            title="No videos found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};
export default Search;
