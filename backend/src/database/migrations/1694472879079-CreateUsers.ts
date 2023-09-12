import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1694472879079 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Users',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'type',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'first_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'last_name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'cpf',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Users')
    }

}
