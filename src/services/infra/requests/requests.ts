import { api } from '../api';
import { getEnv } from '../../../environment';
import { GetProducts } from '../../../types';

export const useMakeupApi = () => {
  const { URL_BASE } = getEnv();

  const getProducts = async () => {
    const res = await api.get<GetProducts[]>(URL_BASE);
    return res.data;
  };

  const getProductsByFilter = async ({
    brandFilter,
    typeFilter,
  }: {
    brandFilter: string | null;
    typeFilter: string | null;
  }) => {
    let filters = ``;
    if (brandFilter) {
      filters += `&brand=${brandFilter}`;
    }
    if (typeFilter) {
      filters += `&product_type=${typeFilter}`;
    }
    const res = await api.get<GetProducts[]>(
      `${URL_BASE}/${filters ? `?${filters}` : ''}`
    );
    return res.data;
  };

  return { getProducts, getProductsByFilter };
};
