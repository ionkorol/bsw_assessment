import React, { useEffect, useMemo } from "react";
import { ActivityIndicator, SafeAreaView, SectionList, StyleSheet, Text } from "react-native";
import { useLazyGetAllAlbumsQuery } from "../store/apis/albums-api";
import { useAppDispatch, useAppSelector } from "../store";
import { setAlbums, setUsers } from "../store/slices/main-slice";
import { section_albums } from "../utils/album-sections.utils";
import { useLazyGetUsersQuery } from "../store/apis/users-api";
import { AlbumListUserHeader } from "../components/album-list/album-list-user-header";
import { AlbumListAlbumItem } from "../components/album-list/album-list-album-item";
import { AlbumListDeleteAlbumModal } from "../components/album-list/album-list-delete-album-modal";
import { AlbumListSearchBar } from "../components/album-list/album-list-search-bar";
import { useDebounce } from "use-debounce";

export const AlbumListScreen = () => {
  /* ******************** Hooks ******************** */
  const [get_all_albums_query, { isLoading: is_albums_loading, isError: is_albums_error }] = useLazyGetAllAlbumsQuery();
  const dispatch = useAppDispatch();
  const { albums, search_text } = useAppSelector((state) => state.main);
  const [get_users_quey, { isLoading: is_users_loading, isError: is_users_error }] = useLazyGetUsersQuery();
  const [debounced_search_text] = useDebounce(search_text, 500);

  /* ******************** Variables ******************** */
  const sectioned_filtered_albums = useMemo(() => {
    let filtered_albums = albums;
    if (debounced_search_text) {
      filtered_albums = albums.filter((album) => album.title.toLowerCase().includes(debounced_search_text.toLowerCase()));
    }
    return section_albums(filtered_albums);
  }, [JSON.stringify(albums), debounced_search_text]);

  /* ******************** Functions ******************** */
  /* ******************** Effects ******************** */
  useEffect(() => {
    get_all_albums_query().then((response) => {
      if (response.isSuccess) {
        dispatch(setAlbums(response.data));
      }
    });
    get_users_quey().then((response) => {
      if (response.isSuccess) {
        dispatch(setUsers(response.data));
      }
    });
  }, []);

  /* ******************** JSX ******************** */
  if (is_albums_loading || is_users_loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (is_albums_error || is_users_error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Something went wrong...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AlbumListSearchBar />
      <SectionList
        sections={sectioned_filtered_albums}
        renderItem={({ item }) => <AlbumListAlbumItem album_id={item.id} album_title={item.title} />}
        renderSectionHeader={({ section: { title, data } }) => <AlbumListUserHeader user_id={title} album_count={data.length} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list_content}
      />
      <AlbumListDeleteAlbumModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list_container: {},
  list_content: {
    rowGap: 10,
  },
  album_container: {
    padding: 10,
  },
});
