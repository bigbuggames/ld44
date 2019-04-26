/**
 * Loads the image and returns a promise with the wanted data
 */
export default function driver(bundle) {
  return bundle.assets.map(asset => {
    return new Promise((resolve, reject) => {
      const tempImage = new Image();
      const locator = `${bundle.baseFolder}${asset.filename}`;
      tempImage.src = locator;
      tempImage.onload = function() {
        /**
         * Takes the data from each asset loaded and creates the object
         * that will be passed over with the `withAssets` provider.
         */
        resolve({
          id: asset.id,
          locator,
          size: {
            x: this.width,
            y: this.height
          }
        });
      };
      tempImage.onerror = function(err) {
        reject(err);
      };
    });
  });
}
