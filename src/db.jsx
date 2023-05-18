import Dexie from 'dexie';

const db = new Dexie('myDB');
db.version(1).stores({
    unidades: '++id',
    roles: '++id, nombre',
    rol: '++id, nombre'
});

export default db;