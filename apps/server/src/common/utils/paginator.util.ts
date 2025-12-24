/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PrismaClient } from '@prisma/client';

type ModelKeys<TClient extends object> = {
  [K in keyof TClient]: TClient[K] extends { findMany: (...args: any[]) => any }
    ? K
    : never;
}[keyof TClient];

type ModelDelegate<
  TClient extends object,
  TKey extends keyof TClient,
> = TClient[TKey];

interface PaginationOptions<T extends { findMany: (...args: any[]) => any }> {
  where?: NonNullable<Parameters<T['findMany']>[0]>['where'];
  include?: NonNullable<Parameters<T['findMany']>[0]>['include'];
  orderBy?: NonNullable<Parameters<T['findMany']>[0]>['orderBy'];
  select?: NonNullable<Parameters<T['findMany']>[0]>['select'];
  page: number;
  pageSize: number;
}

interface PaginationResult<T> {
  items: T[];
  total: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
}

export async function paginator<
  TKey extends ModelKeys<PrismaClient>,
  TDelegate extends ModelDelegate<PrismaClient, TKey>,
>(
  delegate: TDelegate,
  options: PaginationOptions<TDelegate>,
): Promise<
  PaginationResult<Awaited<ReturnType<TDelegate['findMany']>>[number]>
> {
  const { page, pageSize, where, include, orderBy } = options;

  if (!Number.isInteger(page) || page < 1) {
    throw new Error('Page must be a positive integer');
  }

  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error('Page size must be a positive integer');
  }

  if (!('findMany' in delegate) || !('count' in delegate)) {
    throw new Error(
      'Invalid Prisma delegate: missing findMany or count method',
    );
  }

  const findMany = delegate.findMany as (
    ...args: any[]
  ) => Promise<Awaited<ReturnType<TDelegate['findMany']>>>;
  const count = delegate.count as (args: { where?: any }) => Promise<number>;

  const total = await count({ where });
  const items = await findMany({
    where,
    include,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    items,
    total,
    currentPage: page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}
