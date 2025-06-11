import type { MUTATION_TYPE } from '../contants/mutationType.ts';

export type MutationType = (typeof MUTATION_TYPE)[keyof typeof MUTATION_TYPE];
