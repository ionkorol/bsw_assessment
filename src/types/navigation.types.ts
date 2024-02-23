import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type MainRouterParamList = {
  AlbumList: undefined;
  AlbumDetails: { album_id: number; album_title: string };
};

export type MainRouterScreenProps<T extends keyof MainRouterParamList> = NativeStackScreenProps<MainRouterParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainRouterParamList {}
  }
}
