export interface IBooleanFilter {
  equals?: boolean;
  not?: IBooleanFilter | boolean;
}

export interface IStringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: IStringFilter | string;
}
export interface IDateTimeFilter {
  equals?: string | Date;
  gt?: string | Date;
  gte?: string | Date;
  lt?: string | Date;
  lte?: string | Date;
}

export interface IBooleanFilter {
  equals?: boolean;
}

export interface INumberFilter {
  equals?: number;
  in?: number[];
  notIn?: number[];
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
  not?: INumberFilter | number;
}
