import { injectStores } from '@mobx-devtools/tools';
import SchemaStore from './schemaStore';

const schemaStore = new SchemaStore();

injectStores({
  schemaStore,
});

export { schemaStore };
