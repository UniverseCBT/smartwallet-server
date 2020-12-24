export interface ICreatePaycheckDTO {
  name: string;
  expected_received: number;
  current_received: number;
  received_date: string;
  user_id: string;
}
