import React, { useCallback, useEffect, useState } from 'react';
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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { Link } from 'react-router-dom';
import {
    Box,
    Paper,
    TableCell,
    TextField,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody
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
    const handleTabla = useCallback(() => {
        try {
            fetch('http://localhost:3030/getItems')
                .then(response => {
                    // Verificar si la solicitud fue exitosa (código de estado 200-299)
                    if (!response.ok) {
                        throw new Error(`Error de red: ${response.status}`);
                    }
                    // Parsear la respuesta como JSON
                    return response.json();
                })
                .then(data => {
                    // Manejar los datos obtenidos
                    setTableData(data.data)
                    // Aquí puedes realizar cualquier operación que necesites con los datos
                })
                .catch(error => {
                    // Manejar errores de red o errores en la respuesta
                    console.error('Error en la solicitud:', error);
                });
        } catch (err) {
            console.error("Error obteniendo datos de la tabla")
        }
    }, [])

    // Efecto para verificar la autenticación al cargar la página
    useEffect(() => {
        if (!isLoggedin) {
            // Si no está autenticado, navegar a la página de inicio de sesión
            navigate('/')
            
        }
    }, [isLoggedin, navigate]);
    useEffect(() => {
        handleTabla()
    }, [handleTabla]) 
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
                alert("Inserción de datos correcta");
                handleTabla()
            }
        } catch (err) {
            console.error("Error en la comunicación con el backend: ", err)
        }
    }
    const handleDeleteItem = async (row) => {
        try {
            const response = await fetch(`http://localhost:3030/deleteItem?id=${row.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                handleTabla()
                console.log('Datos eliminados:', data);
            } else {
                console.error('Error al intentar eliminar los datos');
            }
        } catch (err) {
            console.error('Error en la comunicación con el backend', err);
        }
    }

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
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell align="right">Marca</TableCell>
                            <TableCell align="right">Tipo</TableCell>
                            <TableCell align="right">Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row) => (
                            <TableRow
                                key={row.nombre}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Button onClick={() => handleDeleteItem(row)}>
                                        <DeleteForeverIcon />
                                    </Button>
                                    {row.nombre}
                                </TableCell>
                                <TableCell align="right">{row.marca}</TableCell>
                                <TableCell align="right">{row.tipo}</TableCell>
                                <TableCell align="right">{row.precio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
};

export default Home;
