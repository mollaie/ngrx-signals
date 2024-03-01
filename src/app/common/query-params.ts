import { WhereFilterOp } from '@angular/fire/firestore';

export interface QueryParams {
  field: string;
  operator: WhereFilterOp;
  value: any;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}
