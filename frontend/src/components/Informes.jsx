import Topbar from "./Topbar";
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import { Grid } from "@mui/material";
import InformeColeccion from "./InformeColeccion";
const Informes = () => {
    const [tableData, setTableData] = useState([]);
    const [mostrarInforme, setMostrarInforme] = useState(false);
    const handleMostrarInforme = () => {
        setMostrarInforme(true);
    };
    const handleTabla = async () => {
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
    }

    // Efecto para verificar la autenticación al cargar la página
    useEffect(() => {
        handleTabla()
    }, [])

    return (
        <div>
            <Topbar />
            {!mostrarInforme ?
                <Grid container alignItems="center">
                    <Button
                        style={{ display: 'block', margin: 'auto' }}
                        variant='contained'
                        onClick={handleMostrarInforme}
                    >
                        Informe Colección
                    </Button>
                </Grid>:
                 <div>
                    <InformeColeccion tableData={tableData}/>
                </div>
            }
        </div>
    )
}
export default Informes