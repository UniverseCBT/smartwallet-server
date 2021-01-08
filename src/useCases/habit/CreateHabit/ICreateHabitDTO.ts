export interface ICreateHabitDTO {
  habit_name: string;
  importance: number;
  expected_spent: number;
  current_spent?: number;
  available?: number;
  category_id: string;
  user_id: string;
}
