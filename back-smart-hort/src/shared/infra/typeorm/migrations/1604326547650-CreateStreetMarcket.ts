import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class CreateStreetMarcket1604326547650
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'streetmarcket',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'delivery_time',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'photo_1',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'photo_2',
            type: 'varchar',
            isNullable: true,
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
    )
    await queryRunner.addColumn(
      'streetmarcket',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: false,
      }),
    )

    await queryRunner.createForeignKey(
      'streetmarcket',
      new TableForeignKey({
        name: 'immobile_user',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('streetmarcket', 'immobile_user')
    await queryRunner.dropColumn('streetmarcket', 'user_id')
    await queryRunner.dropTable('streetmarcket')
  }
}
