import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch, useAppSelector } from "../../store";
import { setSearchText } from "../../store/slices/main-slice";

export const AlbumListSearchBar = () => {
  /* ******************** Hooks ******************** */
  const { search_text } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  /* ******************** Variables ******************** */
  const show_clear_button = Boolean(search_text);

  /* ******************** Functions ******************** */
  const on_search = (val: string) => {
    dispatch(setSearchText(val));
  };

  const on_clear = () => {
    dispatch(setSearchText(""));
  };

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="gray" />
      <TextInput
        value={search_text}
        onChangeText={on_search}
        placeholder="Search album..."
        style={styles.text_input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {show_clear_button && (
        <TouchableOpacity onPress={on_clear}>
          <Ionicons name="close" size={24} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "lightgray",
    borderRadius: 8,
    columnGap: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  text_input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 10,
  },
});
