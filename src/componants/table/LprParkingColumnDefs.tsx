import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { LprParking, LprParkingShow } from "../../config/type/parking.type";

import { format } from 'date-fns';
const columnHelper = createColumnHelper<LprParkingShow>();
export const LprParkingColumnDefs:ColumnDef<LprParkingShow,any>[]=[
    
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
    columnHelper.accessor((row) => row.timeParking, {
        id: "timeParking",
        cell: (info:any)=>(
          <span className="text-center">{info.row.original.timeParking}</span>),
        footer: (info) => info.column.id,
        header: () => <span>Parking Time (Second)</span>,
    }),
    columnHelper.accessor((row) => row.timeCapture, {
        id: "timeCapture",
        cell: (info:any)=>(
          <span className="text-center">{ format(new Date(info.getValue()),'yyyy-MM-dd HH:mm:ss')}</span>),
        footer: (info) => info.column.id,
        header: () => <span>Captured Time</span>,
    }),
    columnHelper.accessor((row) => row.timeUpdate, {
        id: "timeUpdate",
        cell: (info:any)=>(
          <span className="text-center">{ format(new Date(info.getValue()),'yyyy-MM-dd HH:mm:ss')}</span>),
        footer: (info) => info.column.id,
        header: () => <span>Last Captured Time</span>,
    }),
    columnHelper.accessor((row) => row.alarm, {
        id: "alarm",
        cell: (info:any)=>(
          <span className="text-center">
            {info.getValue() > 0 ? "Alarm": "No Alarm"}
          </span>),
        footer: (info) => info.column.id,
        header: () => <span>Alarm</span>,
    }),

]