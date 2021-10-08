import glob from 'glob';
import {
    MicroframeworkLoader as Loader,
    MicroframeworkSettings as Setting,
} from 'microframework-w3tec';
import { env } from '../env';

export const eventDispatchLoader: Loader = (setting: Setting | undefined) => {
    if (setting) {
        const patterns = env.app.dirs.subscribers;
        patterns.forEach((pattern) => {
            glob(pattern, (_err: any, files: string[]) => {
                for (const file of files) {
                    require(file);
                }
            });
        });
    }
};
