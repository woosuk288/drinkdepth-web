import path from 'path';
import { readFile, writeFile } from 'fs/promises';
import { DB_CAFES, DB_MENUS, fetchAllMenus } from './firebase/services';

const readCacheDB = async <T>(name: string) => {
  try {
    const data = await readFile(path.join(process.cwd(), `${name}.db`));
    const list: T[] = JSON.parse(data as unknown as string);
    return list;
  } catch (error) {
    console.info(`No cache ${name}.db`);

    return null;
  }
};

// export const apiCafeCache = {
//   list: async () => {
//     const cafes = await readCacheDB<CafeType>(DB_MENUS);
//     return cafes;
//   },
//   get: async (id: string): Promise<CafeType | null | undefined> => {
//     const cafes = await readCacheDB<CafeType>(DB_MENUS);
//     return cafes.find((cafe) => cafe.id === id);
//   },
//   set: async (cafes: CafeType[]) => {
//     return await writeFile(
//       path.join(process.cwd(), `${DB_CAFES}.db`),
//       JSON.stringify(cafes)
//     );
//   },
// };

export const apiMenuCache = {
  list: async (): Promise<CafeMenuType[] | null | undefined> => {
    const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
    return menus;
  },
  get: async (
    cafeId: CafeMenuType['cafeId'],
    menuId: CafeMenuType['id']
  ): Promise<CafeMenuType | null | undefined> => {
    const menus = await readCacheDB<CafeMenuType>(DB_MENUS);
    return menus?.find((menu) => menu.id === menuId && menu.cafeId === cafeId);
  },
  set: async (menus: CafeMenuType[]) => {
    return await writeFile(
      path.join(process.cwd(), `${DB_MENUS}.db`),
      JSON.stringify(menus)
    );
  },
};
