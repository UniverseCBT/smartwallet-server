export type RegisterPages = 'income' | 'expense' | 'overview';

export interface ICheckUserStepDTO {
  user_id: string;
  entity: RegisterPages;
}
