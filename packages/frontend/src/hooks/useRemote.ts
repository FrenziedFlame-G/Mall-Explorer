import { TARGET } from '@/constant/request';
import axios from 'axios';
import { useCallback, useMemo } from 'react';

export const useRemote = () => {
  const setRemoteCookie = useCallback(
    (cookie: string) => axios.post(`${TARGET}/cookie`, { cookie }),
    []
  );
  const search = useCallback((params: any) => axios.post(`${TARGET}/search`, {
    ...params
  }), []);


  return {
    setRemoteCookie,
    search,
  };
};
