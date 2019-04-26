/**
 * Loads the sound file and returns a promise with the wanted data
 */
export default function driver(bundle) {
  return bundle.assets.map(asset => {
    return new Promise((resolve, reject) => {
      // ...
    });
  });
}
