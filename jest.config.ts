import type { Config } from 'jest';

const config: Config = {
    testEnvironment: 'node',
    roots: ['./src'],
    preset: 'ts-jest',
};

export default config;
