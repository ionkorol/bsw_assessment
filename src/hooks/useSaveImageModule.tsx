import { NativeModules } from "react-native";

export const useSaveImageModule = () => {
  /* ******************** Hooks ******************** */
  /* ******************** Variables ******************** */
  /* ******************** Functions ******************** */
  const save_image = (base64: string): Promise<string> => {
    return NativeModules.SaveImageModule.saveImageToAlbum(base64);
  };

  /* ******************** Effects ******************** */
  /* ******************** JSX ******************** */
  return { save_image };
};
