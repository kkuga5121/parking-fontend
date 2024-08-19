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
  import {  licProSearch, rangeDate } from "../config/type/lpr.type";
import httpService from "../service/httpService";
import { LprParking } from "../config/type/parking.type";

const useLprParking = ()=>{
  const queryClient = useQueryClient()
    const queryKey: MutationKey = ['postLPRParking'];
    const postFindAllData = async (search:licProSearch,daterange:rangeDate)=>{
        try {

            let payload ={
                LICENSEPLATE:search.license,
                PROVINCE:search.province,
                TimeStart: daterange.start?.toDate().toISOString(),
                TimeEnd:daterange.end?.toDate().toISOString()
            }
            console.log('payload',payload)
          const response = await httpService.post<LprParking[]>('/parking/findAllData',payload);
         
          let data = response.map((d:LprParking)=>{

            return {
                id: d.id,
                license: d.lprdata?.LICENSEPLATE,
                province: d.lprdata?.PROVINCE,
                timeParking: Math.round(Number(d.timeParking)).toString(),
                timeCapture: new Date(d.timeCapture).toString(),
                timeUpdate: d.timeUpdate != null ? new Date(d.timeUpdate).toString() : null,
                alarm: d.alarmCount as number ,
                lprId:d.lprId
            }
          })
          console.log('postFindAllData',data)
          return data;
        } catch (error) {
          console.error('Error fetching data', error);
        }
    }

    const {isError ,isSuccess,mutate ,data,isIdle,isPending } = useMutation({
      
        mutationFn:(data:any)=>postFindAllData(data.search,data.daterange),
        mutationKey:queryKey
    });
    const handle = (search:licProSearch,daterange:rangeDate)=>{
        mutate({ search: search,daterange:daterange });
    }
    return {isError ,isSuccess,data ,handle,isIdle,isPending}
  
};
export default useLprParking;