/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useQueryClient } from '@tanstack/react-query';

// API client function to fetch power statuses
const fetchPowerStatuses = async () => {
  const response = await axios.get('/api/report', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

// API client function to fetch power status by ID


// React Query hook for fetching power statuses
export const usePowerStatuses = () => {
    const queryClient = useQueryClient();
  return useQuery('powerStatuses', fetchPowerStatuses, {
    refetchInterval: 60000, // Refetch every minute
    staleTime: 30000, // Consider data stale after 30 seconds
    onSuccess:(response)=>{
        queryClient.setQueryData(['powerStatuses'], response)
    }
  });
};


export const useUpdatePowerStatus = (value:string) => {
    const queryClient = useQueryClient();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutation<any>({
        mutationFn: async () => {
            const data ={
                "status":value
              }
              const response =  await axios.post('/api/', data)
            return response.data;
        },
        onError: (error: any) => {
            console.error(
              "Error in fetching list of jobs:", error
            );
          },
          onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['powerStatuses'] });
            console.log("Power status updated successfully");
          }
    });

}

const fetchPowerStatusById = async (value: string) => {
    const response = await axios.get(`/api/power-status/${value}`, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  };
export const useGetPowerStatusById =(value:string)=>{
    const queryClient = useQueryClient();
    return useQuery(['powerStatus',value], () => fetchPowerStatusById(value), {
        refetchInterval: 60000, // Refetch every minute
        staleTime: 30000, // Consider data stale after 30 seconds
        onSuccess:(response)=>{
            queryClient.setQueryData(['powerStatus',value], response)
        }
    })
    ;
}


export const UsedeletePowerStatus =  ()=>{
    const queryClient  = useQueryClient()
    return useMutation<any>({
        mutationFn: async () => {
            const response = await axios.delete('/api/power-status', {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            return response.data;
        },
        onError: (error: any) => {
            console.error(
              "Error in fetching list of jobs:", error
            );
          },
          onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey: ['powerStatuses'] });
            console.log("Power status deleted successfully");
          }
    })
}