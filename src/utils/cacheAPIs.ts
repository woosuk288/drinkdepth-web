import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { DB_MENUS, fetchAllMenus, fetchCafeMenu } from '../firebase/services';

const readCacheDB = async <T>(name: string) => {
  try {
    const data = await readFile(path.join(process.cwd(), `${name}.db`));
    const list: T[] = JSON.parse(data as unknown as string);
    console.info(`Hit ${name}`);

    return list;
  } catch (error) {
    console.info(`No cache ${name}.db`);

    return null;
  }
};

export const menuApi = {
  list: async () => {
    // 개발 테스트용
    const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
    if (process.env.NODE_ENV !== 'production' && menus) {
      return menus;
    }

    return fetchAllMenus();
  },
  fetch: async (cafeId: string, menuId: string) => {
    return fetchCafeMenu(cafeId, menuId);
  },
  cache: {
    get: async (
      cafeId: string,
      menuId: string
    ): Promise<CafeMenuType | null | undefined> => {
      const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
      return menus?.find(
        (menus) => menus.id === menuId && menus.cafeId === cafeId
      );
    },
    set: async (menus: CafeMenuType[]) => {
      return await writeFile(
        path.join(process.cwd(), `${DB_MENUS}.db`),
        JSON.stringify(menus, null, 2)
      );
    },
    getByCafeId: async (cafeId: string) => {
      const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
      return menus?.filter((menu) => menu.cafeId === cafeId);
    },
    all: async () => {
      const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
      return menus;
    },
  },
};
