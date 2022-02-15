export const isEmpty = (obj:Object):boolean => {
  return obj && Object.keys(obj).length === 0;
};

export const fetcher = (url) => fetch(url).then((res) => res.json());
