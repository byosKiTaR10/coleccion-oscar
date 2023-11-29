const db = require('./db')

async function getUserData(user, password) {
    try {
        const rows = await db.query('SELECT * FROM usuarios WHERE login = ?', [user]);
        if (rows.length === 0) {
            // El usuario no existe
            return null;
        }

        // Verificar la contraseña
        const storedPassword = rows[0].password;

        if (storedPassword !== password) {
            // La contraseña es incorrecta
            return null;
        }
        const rol = rows[0].rol
        // El usuario y la contraseña son correctos
        return {
            'user': user,
            'password': password,
            'rol': rol
        };
    } catch (error) {
        // Manejar errores de la base de datos
        console.error('Error en la consulta a la base de datos:', error);
        throw error;
    }
}

module.exports = {
    getUserData
}
