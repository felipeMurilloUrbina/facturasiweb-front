import {DexieConfig} from 'ngx-dexie';
export const configDexie: DexieConfig = {
  databaseName: 'AppDatabase', // your database name here
  schema: {
            unidades: '++id,codigo,descripcion',
            catalogoSat: '++id,codigo, descripcion'
          } // any schema of your choice
};