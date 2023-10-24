import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import initialTestData from './initialTestData';

class SeedDataSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        await initialTestData(em);
    }
}

export default SeedDataSeeder;
