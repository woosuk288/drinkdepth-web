import path from 'path';
import fs from 'fs/promises';
import axios from 'axios';

export const fetchCafes = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + '/cafes';
  const cafes = await axios.get<CafeType[]>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });
  return cafes.data;
};

export const fetchCafe = async (cafeId: string) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + '/cafes/' + cafeId;
  const cafe = await axios.get<CafeType>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });
  return cafe.data;
};

export const apiCafe = {
  list: async () => {
    return fetchCafes();
  },
  fetch: async (cafeId: string) => {
    return fetchCafe(cafeId);
  },
  cache: {
    get: async (id: string): Promise<CafeType | null | undefined> => {
      return fs
        .readFile(path.join(process.cwd(), 'cafes.db'))
        .then((data) => {
          const cafes: CafeType[] = JSON.parse(data as unknown as string);

          return cafes.find((cafeMenu) => cafeMenu.id === id);
        })
        .catch((error) => {
          console.info(`No cache cafes.db`);
          return null;
        });
    },
    set: async (cafes: CafeType[]) => {
      return await fs.writeFile(
        path.join(process.cwd(), 'cafes.db'),
        JSON.stringify(cafes)
      );
    },
  },
};

export const fetchAllMenus = async () => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + '/cafes/any/all_menus';
  const menus = await axios.get<CafeMenuType[]>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });

  return menus.data;
};

export const fetchCafeMenus = async (cafeId: string) => {
  const url = process.env.NEXT_PUBLIC_SERVER_URL + `/cafes/${cafeId}/menus`;
  const menus = await axios.get<CafeMenuType[]>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });

  return menus.data;
};

export const fetchCafePairingMenus = async (
  cafeId: string,
  menuIds: string[]
) => {
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL +
    `/cafes/${cafeId}/pairing_menus/${menuIds.join()}`;
  const menus = await axios.get<CafeMenuType[]>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });

  return menus.data;
};

export const fetchCafeMenu = async (cafeId: string, menuId: string) => {
  const url =
    process.env.NEXT_PUBLIC_SERVER_URL + `/cafes/${cafeId}/menus/${menuId}`;
  const menu = await axios.get<CafeMenuType>(url, {
    headers: { Authorization: process.env.API_SECRET_KEY },
  });
  return menu.data;
};

export const apiMenu = {
  list: async () => {
    return fetchAllMenus();
  },
  fetch: async (cafeId: string, menuId: string) => {
    return fetchCafeMenu(cafeId, menuId);
  },
  cache: {
    list: async () => {
      return fs
        .readFile(path.join(process.cwd(), 'cafeMenus.db'))
        .then((data) => {
          const cafeMenus: CafeMenuType[] = JSON.parse(
            data as unknown as string
          );
          return cafeMenus;
        })
        .catch((error) => {
          console.info(`No cache cafeMenus.db`);
          return null;
        });
    },
    get: async (
      cafeId: string,
      menuId: string
    ): Promise<CafeMenuType | null | undefined> => {
      return fs
        .readFile(path.join(process.cwd(), 'cafeMenus.db'))
        .then((data) => {
          const cafeMenus: CafeMenuType[] = JSON.parse(
            data as unknown as string
          );

          return cafeMenus.find(
            (cafeMenu) => cafeMenu.cafeId === cafeId && cafeMenu.id === menuId
          );
        })
        .catch((error) => {
          console.info(`No cache cafeMenus.db`);
          return null;
        });
    },
    set: async (cafeMenus: CafeMenuType[]) => {
      return await fs.writeFile(
        path.join(process.cwd(), 'cafeMenus.db'),
        JSON.stringify(cafeMenus)
      );
    },
  },
};

// const readCacheDB = async <T>(name: string) => {
//   try {
//     const data = await readFile(path.join(process.cwd(), `${name}.db`));
//     const list: T[] = JSON.parse(data as unknown as string);
//     console.info(`Hit ${name}`);

//     return list;
//   } catch (error) {
//     console.info(`No cache ${name}.db`);

//     return null;
//   }
// };
