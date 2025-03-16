import { CONFIG } from '@/constants';

export const transformLimitOffset = ({ page, pageSize }: { page: number; pageSize: number }) => {
  const limit = pageSize || CONFIG.PAGE_SIZE;
  const offset = (page - 1) * limit;
  return { limit, offset };
};
