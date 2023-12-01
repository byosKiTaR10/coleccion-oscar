import React, { useEffect, useState } from 'react';
import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
const InformeColeccion = (props) => {
    const [tableData, setTableData] = useState([]);
    const col = [
        { title: "Nombre", field: "nombre" },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio"}
    ]
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
        <MaterialTable
            title="Informe"
            columns={col} data={tableData}
            //Esto de aquí abajo es lo nuevo. Dentro de options pondremos la parte de exportación
            options={{
                draggable: false,
                columnsButton: true,
                filtering: true,
                exportMenu: [
                    {
                        label: "Exportar a PDF",
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, "InformePDFPrueba"),
                    },
                    {
                        label: "Exportar a CSV",
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, "InformeCSVPrueba"),
                    },
                ],
            }}
        />)
}
export default InformeColeccion