import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class RemoveUserWalletAndCreateIncomeTable1608000873838
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'income_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'incomes',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'expected_wallet',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'current_wallet',
            type: 'decimal',
            default: 0,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        name: 'UserToIncome',
        columnNames: ['income_id'],
        referencedTableName: 'incomes',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'incomes',
      new TableForeignKey({
        name: 'IncomeToUser',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('incomes', 'IncomeToUser');

    await queryRunner.dropForeignKey('users', 'UserToIncome');

    await queryRunner.dropTable('incomes');

    await queryRunner.dropColumn('users', 'income_id');
  }
}
