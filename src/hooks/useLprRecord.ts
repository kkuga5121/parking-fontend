import { useState } from "react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryKey,
    UseQueryResult,
    MutationKey,
  } from '@tanstack/react-query'
import httpService from "../service/httpService";
import { ILpr, licProSearch, rangeDate } from "../config/type/lpr.type";
const useLprRecord = () =>{
 
    // const {search,daterange} = props
    const queryKey: MutationKey = ['postLPR'];
    
    const postFindAllData = async (search:licProSearch,daterange:rangeDate)=>{
        try {
          const symbolRegex = /[^a-zA-Z0-9\s]/g;

            let payload ={
                LICENSEPLATE:search.license,
                PROVINCE:search.province,
                TimeStart: daterange.start?.toDate().toISOString(),
                TimeEnd:daterange.end?.toDate().toISOString()
            }
            console.log('payload',payload)
          const response = await httpService.post<ILpr[]>('/lpr/findAllData',payload);
          let data = response.map((d:ILpr)=>{
            return {
              PID: d.PID,
              plate: d.LICENSEPLATE,
              license: d.LICENSEPLATE,
              province: d.PROVINCE,
              cam: d.CAMERA,
              time: new Date(d.DATETIME).toString(),
            }
          })
          return data;
        } catch (error) {
          console.error('Error fetching data', error);
        }
    }
    const {isError ,isSuccess,mutate ,data,isIdle,isPending } = useMutation({
        mutationFn:(data:any)=>postFindAllData(data.search,data.daterange),
        mutationKey:queryKey,
      });
    const handle = (search:licProSearch,daterange:rangeDate)=>{
      mutate({ search: search,daterange:daterange });
    }
    return {isError ,isSuccess,data ,handle,isIdle,isPending}
};
export default useLprRecord;