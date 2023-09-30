export * from './firebase';

export const openUrlInNewTab = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const parseImageToString = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (!evt?.target?.result) {
        return reject();
      }
      const { result } = evt.target;
      resolve(result as string);
    };
    reader.readAsDataURL(file);
  });
};
