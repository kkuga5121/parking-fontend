
import { CellContext, ColumnDef, Row, createColumnHelper } from "@tanstack/react-table";
import { ILprRecordShow } from "../../config/type/lpr.type";
import { format } from 'date-fns';

const columnHelper = createColumnHelper<ILprRecordShow>();
export const LprRecordColumnDefs:ColumnDef<ILprRecordShow,any>[]=[
  columnHelper.accessor((row) => row.PID, {
    id: "PID",
    cell: (info:any) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span >Id</span>,
  }),
  columnHelper.accessor((row) => row.license, {
    id: "license",
    cell: (info:any)=>(
      <span className="text-center">
        {info.row.original.license}</span>),
    
    // cell: (info:any)=>(
    //   <span className="text-center">{formatLicensePlate(info.row.original.license)}</span>),
    footer: (info) => info.column.id,
    header: () => <span>License Plate</span>,
  }),
  columnHelper.accessor((row) => row.province, {
      id: "province",
      cell: (info:any)=>(
        <span className="text-center">{info.row.original.province}</span>),
      footer: (info) => info.column.id,
      header: () => <span>Province</span>,
    }),
  columnHelper.accessor((row) => row.cam, {
    id: "cam",
    cell: (info:any) => info.getValue(),
    footer: (info) => info.column.id,
    header: () => <span >Camera</span>,
  }),
  columnHelper.accessor((row) => row.time, {
    id: "time",
    cell: (info:any) => format(new Date(info.getValue()),'yyyy-MM-dd HH:mm:ss'),
    footer: (info) => info.column.id,
    header: () => <span>Time (year-month-day hour:minute:second)</span>,
  }),
]