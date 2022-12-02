export const resize_image_file = (
  file: File,
  maxSize: number = 640
): Promise<{ dataURL: string; dataFile: File; blob: Blob | null }> => {
  return new Promise(function (resolve, reject) {
    function error(e: any) {
      reject(e);
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        // TODO : exif 데이터 가져오기
        let canvas = document.createElement("canvas"),
          max_size = maxSize,
          // 최대 기준을 1280으로 잡음.
          width = img.width,
          height = img.height;

        if (width > height) {
          // 가로가 길 경우
          if (width > max_size) {
            height *= max_size / width;
            width = max_size;
          }
        } else {
          // 세로가 길 경우
          if (height > max_size) {
            width *= max_size / height;
            height = max_size;
          }
        }
        canvas.width = width;
        canvas.height = height;
        canvas.getContext("2d")?.drawImage(img, 0, 0, width, height);

        const { name, type } = file;
        const dataURL = canvas.toDataURL(type);
        canvas.toBlob((blob) => {
          let dataFile = new File([blob!], name, { type });
          resolve({ dataURL, dataFile, blob });
        }, type);
        // resolve(canvas.el);
      };
      img.onerror = error;
      img.src = e.target?.result as string;
    };
    reader.onerror = error;
    reader.readAsDataURL(file);
  });
};

//load src and convert to a File instance object
//work for any type of src, not only image src.
//return a promise that resolves with a File instance

export function srcToFile(src: string, fileName: string, mimeType: string) {
  return fetch(src)
    .then(function (res) {
      return res.arrayBuffer();
    })
    .then(function (buf) {
      return new File([buf], fileName, { type: mimeType });
    });
}
