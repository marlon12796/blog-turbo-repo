import { CONFIG } from '@/constants';

export const transformLimitOffset = ({ page, pageSize }: { page: number; pageSize: number }) => {
  const limit = pageSize || CONFIG.PAGE_SIZE;
  const offset = (page - 1) * limit;
  return { limit, offset };
};

export type PaginationTypes = {
  totalPages: number;
  currentPage: number;
  pageNeighbors?: number;
};
export const calculatePageNumbers = (pagination: PaginationTypes) => {
  const { totalPages, currentPage, pageNeighbors = 2 } = pagination;

  if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const startPage = Math.max(2, currentPage - pageNeighbors);
  const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);

  const pages: (number | string)[] = [1];

  // Agregar "..." si hay páginas ocultas entre la primera y el inicio del rango
  if (startPage > 2) pages.push('...');

  // Agregar las páginas del rango calculado
  for (let i = startPage; i <= endPage; i++) pages.push(i);
  // Agregar "..." si hay páginas ocultas entre el final del rango y la última página
  if (endPage < totalPages - 1) pages.push('...');

  pages.push(totalPages);
  return pages;
};
