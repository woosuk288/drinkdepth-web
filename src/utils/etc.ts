export const clipText = (text: string, minLenth: number) => {
  const idx = text.indexOf('\n', minLenth);

  if (idx === -1 || text.length < minLenth) {
    return text;
  } else {
    return text.slice(0, idx);
  }
};

export const getProfileId = (uid: string) => {
  const id = uid.split(':').length === 1 ? uid : uid.split(':')[1];
  return id;
};