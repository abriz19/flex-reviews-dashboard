import type { OrderDirection } from 'src/review/dtos/review-order-by.dto';

interface PrismaWhereInput {
  AND?: PrismaWhereInput | PrismaWhereInput[];
  OR?: PrismaWhereInput[];
  NOT?: PrismaWhereInput | PrismaWhereInput[];
  [key: string]: any;
}

export const filterBy = <TPrismaWhere extends PrismaWhereInput>(
  input?: Partial<Record<string, any>>,
): TPrismaWhere => {
  const where = {} as TPrismaWhere;

  if (!input) return where;

  Object.entries(input)
    .filter(([, value]) => value !== undefined && value !== null)
    .forEach(([key, value]) => {
      const parts = key.split('_');
      let current: Record<string, any> = where;

      parts.forEach((part, index) => {
        const isLast = index === parts.length - 1;

        if (isLast) {
          current[part] = value;
        } else {
          current[part] = current[part] || {};
          current = current[part];
        }
      });
    });

  return where;
};

export const searchBy = (
  fields: string[],
  value?: string | null,
): Record<string, any>[] => {
  if (!value || value.trim() === '') {
    return [];
  }

  return fields.map((field) => {
    const parts = field.split('.');
    const last = parts.pop();

    if (!last) {
      return {};
    }

    return parts.reduceRight<Record<string, any>>(
      (acc, key) => ({ [key]: acc }),
      {
        [last]: { contains: value, mode: 'insensitive' as const },
      },
    );
  });
};

type IOrderByOutput<T> = {
  [K in keyof T]?: T[K] extends Record<string, unknown>
    ? IOrderByOutput<T[K]>
    : OrderDirection;
};

export const orderBy = <T extends Record<string, any>>(
  inputs?: Partial<Record<string, any>>,
): IOrderByOutput<T>[] => {
  if (!inputs) return [];

  return Object.entries(inputs).map(([key, value]) => {
    const parts = key.split('_');
    const last = parts.pop();

    if (!last) {
      return {};
    }

    return parts.reduceRight<Record<string, any>>(
      (acc, part) => ({ [part]: acc }),
      { [last]: value },
    );
  });
};
