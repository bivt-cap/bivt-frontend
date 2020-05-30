import firebase from 'firebase';
import {Image, Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const uploadImage = async (
  uri,
  shortImageName,
  mime = 'application/octet-stream',
) => {
  // Prepare Blob support
  const Blob = RNFetchBlob.polyfill.Blob;
  const fs = RNFetchBlob.fs;
  window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
  window.Blob = Blob;

  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    let uploadBlob = null;

    const imageRef = firebase.storage().ref('images').child(shortImageName);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, {type: `${mime};BASE64`});
      })
      .then((blob) => {
        uploadBlob = blob;
        return imageRef.put(blob, {contentType: mime});
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        resolve(url);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
