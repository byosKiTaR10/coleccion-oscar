import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/storelogin';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.login);
    const isLoggedin = userData.isAutenticated;
    const username = userData.userName;
    const rol = userData.userRol;

    // Efecto para verificar la autenticación al cargar la página
    useEffect(() => {
        if (!isLoggedin) {
            // Si no está autenticado, navegar a la página de inicio de sesión
            navigate('/')
        }
    }, [isLoggedin, navigate]);

    // Manejar el logout
    const handleLogout = () => {
        // Implementa la lógica de logout y cambia el estado del store
        dispatch(loginActions.logout())
        // Navegar a la página raíz
        navigate('/')
    };

    // Mostrar datos en la consola al cargar la página
    useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <div>
            <h1>Página home de Óscar Ojeda</h1>
            <h2>{`Usuario: ${username}, Rol: ${rol}`}</h2>
            <button onClick={handleLogout}>Salir</button>
        </div>
    );
};

export default Home;
