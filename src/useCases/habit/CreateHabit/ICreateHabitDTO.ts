export interface ICreateHabitDTO {
  habit_name: string;
  importance: number;
  expected_spent: number;
  category_id: string;
  user_id: string;
}
