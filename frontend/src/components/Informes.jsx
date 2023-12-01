import Topbar from "./Topbar";
import Button from '@mui/material/Button';
import { Grid } from "@mui/material";
import { useState } from "react";
import InformeColeccion from "./InformeColeccion";
const Informes = () => {
    const [mostrarInforme, setMostrarInforme] = useState(false);
    const handleMostrarInforme = () => {
        setMostrarInforme(true);
    };

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
                    <InformeColeccion />
                </div>
            }
        </div>
    )
}
export default Informes