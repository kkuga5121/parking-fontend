import * as React from 'react';
import { licProSearch, rangeDate } from '../config/type/lpr.type';
import dayjs from 'dayjs';
import useLprRecord from '../hooks/useLprRecord';
import SearchBar from '../componants/SearchBar';
import LprRecordTable from '../componants/table/LprRecordTable';
export default function LprRecord(){
    return(
    <React.Fragment>
        <LprRecordTable    />
    </React.Fragment>)
}