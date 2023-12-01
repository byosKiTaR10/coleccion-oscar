import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
const InformeColeccion = (props) => {
    const col = [
        { title: "Nombre", field: "nombre" },
        { title: "Marca", field: "marca" },
        { title: "Tipo", field: "tipo" },
        { title: "Precio", field: "precio"}
    ]
    return (
        <MaterialTable
            title="Informe"
            columns={col} data={props.tableData}
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