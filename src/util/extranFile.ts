export const extractFile = (
  data: any,
  fileName: string = 'extractedData',
  fileType: string = 'application/json'
) => {
  const element = document.createElement('a');
  const textFile = new Blob([JSON.stringify(data, null, 2)], {
    type: fileType,
  }); //pass data from localStorage API to blob
  element.href = URL.createObjectURL(textFile);
  element.download = `${fileName}.json`;
  document.body.appendChild(element);
  element.click();
};
