import DataLoader from 'dataloader';
import { ObjectType } from 'typedi';
import { getCustomRepository, getRepository, Repository } from 'typeorm';

export * from './graphql-error-handling';

export interface CreateDataLoaderOptions {
    method?: string;
    key?: string;
    multiple?: boolean;
}

export function createDataLoader<T>(
    obj: ObjectType<T>,
    options: CreateDataLoaderOptions = {}
): DataLoader<any, any> {
    let repository: Repository<T>;
    try {
        repository = getCustomRepository<Repository<T>>(obj);
    } catch (errorRepo) {
        try {
            repository = getRepository(obj);
        } catch (errorModel) {
            throw new Error(
                'Could now create a dataloader, because object is nether model or repository!'
            );
        }
    }

    return new DataLoader(async (ids: number[]) => {
        let items = [];
        if (options.method) {
            items = await repository[options.method](ids);
        } else {
            items = await repository.findByIds(ids);
        }

        const handleBatch = (arr: any[]) => (options.multiple ? arr : arr[0]);
        return ids.map((id) =>
            handleBatch(
                items.filter((item) => item[options.key || 'id'] === id)
            )
        );
    });
}
