import * as React from 'react';
import { licProSearch, rangeDate } from '../config/type/lpr.type';
import dayjs from 'dayjs';
import useLprRecord from '../hooks/useLprRecord';
import SearchBar from '../componants/SearchBar';
import LprParkingTable from '../componants/table/LprParkingTable';
import useLprParking from '../hooks/useLprParking';
export default function LprParking(){
    return(
    <React.Fragment>

        <LprParkingTable 
        />
    </React.Fragment>)
}