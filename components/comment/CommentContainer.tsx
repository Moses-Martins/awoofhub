import { Comment } from "@/types/comment";
import { formatDate } from "@/utils/formatDate";
import { FontAwesome } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";

interface Props {
  comments: Comment[];
}

export default function CommentContainer({ comments }: Props) {
  return (
    <View className="max-h-[350px] rounded-lg bg-white">
      <ScrollView nestedScrollEnabled={true}>
        {comments.map((comment) => (
          <View key={comment.id} className="mb-1 rounded-lg bg-gray-100 p-4">
            <View className="flex-row items-center gap-4">
              {comment.user.profileImageUrl ? (
                <Image
                  source={{ uri: comment.user.profileImageUrl }}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <View className="h-10 w-10 items-center justify-center rounded-full bg-gray-300">
                  <FontAwesome name="user" size={24} color="gray" />
                </View>
              )}

              <Text className="text-base font-baloo-medium text-gray-900">
                {comment.user.name}
              </Text>
            </View>

            <Text className="mt-1 text-xs font-mont text-gray-400">
              {formatDate(comment.createdAt)}
            </Text>

            <Text className="mt-2 text-sm font-mont text-gray-800">
              {comment.comment}
            </Text>
          </View>
        ))}

      </ScrollView>

    </View >
  );
}