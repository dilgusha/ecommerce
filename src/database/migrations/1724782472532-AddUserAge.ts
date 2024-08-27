import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserAge1724679945985 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'user',
            new TableColumn({
                name: 'age',
                type: 'integer',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'age');
    }
}