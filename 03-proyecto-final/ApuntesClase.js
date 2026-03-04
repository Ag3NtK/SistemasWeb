import //...

(alias) inicializaModelos(db: any) : void
import inicializaModelos
inicializaModelos(db);

const server = )








const db = getConnection();


// connection.js

checkConnection(db);

const server = checkConnection(db = getConnection()) {
    const checkStmt = db.prepare('SELECT 1 + 1 as suma');
    const suma = checkStmt.get().suma;
    if(suma == null) //...
}

// modelos.js

import {Direccion} from "./usuarios/Direccion.js"
import {Usuario} from "./usuarios/Usuario.js"


export function inicializaModelos(db){
    Usuario.initiStatements(db);
    Usuario.Direcciones = Direccion;

    Direccion.initiStatements(db);
    Direccion.Usuarios = Usuario;
}

// Usuario.js

    // import

export class Usuario {  
    static #getByUsernameStmt = null;

    static async login(username, password){
        let usuario = null 
        try {

        }
    }


    static getByUsername(username){
        const usuario = this.#getByUsernameStmt.get({username});    //  devuelve un objeto javascript simple
        if(usuario == null) throw new UsuarioNoEncontrado(username);

        return Usuario.#fromRow(usuario);   // Lo convertimos en un tipo de clase Usuario con #fromRow
    }

    static getById(usuarioId){
        const usuario = this.#getByIdStmt.get({usuarioId});
        if(usuario == null) throw new UsuarioNoEncontrado(username);

        return Usuario.#fromRow(usuario);
    }

    static list(pagina, size = 6){
        const rowsUsuarios = this.#listUsuariosStmt.all({offset: pagina * size, size});
        const usuarios = [];
        for(const row of rowsUsuarios){
            const usuario = Usuario.#fromRow(row);
            usuarios.push(usuario);
        }
        return usuarios;
    }

    /**
     * 
     * @param {{col:string; ord: "DESC | "ASC"}[]} columnas 
     * @param {number} pagina 
     * @param {number} size 
     */
    static listOrdenada(columnas, pagina = 1, size = 6){
        const ordenacion = columnas.map(par => `${par.col} ${par.ord}`).join(`,`);
        const numParametros = columnas.length * 2;
        const parametrosOrdenacion = '';
        for(let idx= 0; idx < numParametros; idx++){
            parametrosOrdenacion = `,? ?`;
        }
        // ordenacion = `username ASC, rol DESC`
        const db = getConnection();
        const sql = `SELECT * FROM Usuarios ORDER BY ${parametrosOrdenacion} LIMIT ? OFFSET ?`;
        const stmt = db.prepare(sql);
        const params = columnas.flatMap(par => [par.col, par.ord]).concat(size, pagina); 
        const usuarios = stmt.list(params);
    }

    static count(){
        const numUsuarios = this.#countUsuariosStmt.get();
        return numUsuarios;
    }

    static #insert(usuario){
        try {
            const datos = Usuario.#toRow(usuario);
            const result = this.#insertStmt.run(datos);
            usuario.#id = result.lastInsertRowid;
        } catch(e) {    // SqliteError
            if(e.code === "SQLITE_CONSTRAINT_UNIQUE"){
                throw new UsuarioYaExiste(usuario.username);
            }
        }
        return usuario;
    }


    static #fromRow{

    }
    
    static #toRow{

    }

    static initiStatements(db){//  nunca concatenar información pasada por el usuario
        if(this.#getByusernameStmt !== null) return;

        this.#getByUsernameStmt = db.prepare("SELECT * FROM Usuarios WHERE username = @username");
        this.#getByIdStmt = db.prepare("SELECT * FROM Usuarios WHERE usuarioId = @usuarioId");
        this.#insertSTMT = db.prepare("INSERT INTO Usuarios(username, password, rol, nombre, apellido, email, avatar) VALUES (@username, @password, @rol, @nombre, @apellido, @email, @avatar");
        this.#updateStmt = db.prepare("UPDATE Usuarios SET username = @username, password = @password, rol = @rol, email = @email /*...*/");
        this.#listUsuariosStmt = db.prepare("SELECT * FROM Usuarios ORDER BY usuarioId LIMIT @size OFFSET @offset");
        this.countUsuariosStmt = db.prepare("SELECT COUNT(*) AS numUsuarios FROM Usuarios").pluck();    // pluck hace que devuelva el entero directamente
    }
}