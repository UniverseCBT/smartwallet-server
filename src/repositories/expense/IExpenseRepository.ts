import { Expense } from '../../entities/Expense';
import { ICreateExpenseDTO } from '../../useCases/expense/CreateExpense/ICreateExpenseDTO';

export interface IExpenseRepository {
  create(data: ICreateExpenseDTO): Promise<Expense>;
}
