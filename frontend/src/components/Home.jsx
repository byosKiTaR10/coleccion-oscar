import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../store/storelogin';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import {
    Box,
    Paper,
    TextField
} from '@mui/material'
const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const [marca, setMarca] = useState('');
    const [tipo, setTipo] = useState('');
    const [precio, setPrecio] = useState('');
    const [tableData, setTableData] = useState([]);

    const userData = useSelector(state => state.login);
    const isLoggedin = userData.isAutenticated;
    const username = userData.userName;
    const rol = userData.userRol;

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleMarcaChange = (event) => {
        setMarca(event.target.value);
    };
    const handleTipoChange = (event) => {
        setTipo(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };
    // Efecto para verificar la autenticación al cargar la página
    useEffect(() => {
        if (!isLoggedin) {
            // Si no está autenticado, navegar a la página de inicio de sesión
            navigate('/')
        }
    }, [isLoggedin, navigate]);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3030/addItem', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, marca, tipo, precio })
            });
            if (response.ok) {
                console.alert("Inserción de datos correcta");
            }
        } catch (err) {
            console.error("Error en la comunicación con el backend: ", err)
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3030/getItems');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                // Supongamos que la respuesta es un objeto con una propiedad 'data' que contiene los datos de la tabla
                setTableData(data.data);
            } catch (error) {
                console.error('Error en la solicitud GET:', error.message);
                // Puedes manejar el error según tus necesidades
            }
        };

        fetchData();
    }, []);

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
            <AppBar position='static'>
                <Container>
                    <Toolbar>
                        <Grid container alignItems="center">
                            <Grid item xs={2} md={2} lg={2}>
                                <AccountCircleIcon />
                                <Typography>{username}</Typography>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <Link to='/home' style={{ color: 'white' }}>Inicio</Link>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <Link to='/' style={{ color: 'white' }}>Informes</Link>
                            </Grid>
                            <Grid item xs={2} md={2} lg={2}>
                                <Link to='/' style={{ color: 'white' }}>Ayuda</Link>
                            </Grid>
                            <Grid item xs={2} md={2} lg={3}>
                                <Button variant='contained' onClick={handleLogout}>Salir</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <Paper elevation={3}>
                <Box component='form' autoComplete='off' onSubmit={handleSubmit}>
                    <Grid container alignItems="center">
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                label='Nombre'
                                required
                                value={nombre}
                                onChange={handleNombreChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                label='Marca'
                                required
                                value={marca}
                                onChange={handleMarcaChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                label='Tipo'
                                required
                                value={tipo}
                                onChange={handleTipoChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={2.5}>
                            <TextField
                                label='Precio'
                                required
                                value={precio}
                                onChange={handlePrecioChange}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={2} md={1.5}>
                            <Button type="submit" variant="contained">
                                Insertar
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <TableContainer>
                <Table aria-label='Productos'>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            .
                            .
                            .
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Button onClick={() => handleDeleteItem(row.id)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>
                                <TableCell>{row.nombre}</TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default Home;
