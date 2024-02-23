import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useAppSelector } from "../../store";

interface IProps {
  user_id: string;
  album_count: number;
}

export const AlbumListUserHeader = ({ user_id, album_count }: IProps) => {
  /* ******************** Hooks ******************** */
  const { users } = useAppSelector((state) => state.main);

  /* ******************** Variables ******************** */
  const user = users.find((user) => user.id.toString() === user_id);

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <Text style={styles.name_text}>{user?.name ?? "Unknown user"}</Text>
      <View style={styles.album_count_container}>
        <Text style={styles.album_count_text}>{album_count}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderColor: "rgba(255,255,255,0.2)",
    borderBottomWidth: 1,
    backgroundColor: "#faf9f7",
  },
  name_text: {
    color: "gray",
    fontSize: 22,
    fontWeight: "bold",
  },
  album_count_container: {
    backgroundColor: "lightgray",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  album_count_text: {
    color: "gray",
    fontWeight: "bold",
  },
});
