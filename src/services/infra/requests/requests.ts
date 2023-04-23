import { AxiosResponse } from 'axios';

import { api } from '../api';
import { getEnv } from '../../../environment';
import { GetProducts } from '../../../types';

export const useMakeupApi = () => {
  const { URL_BASE } = getEnv();

  const getProducts = async () => await api.get<AxiosResponse<GetProducts[]>>(URL_BASE);

  return { getProducts };
};