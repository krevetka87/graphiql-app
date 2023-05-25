import { injectStores } from '@mobx-devtools/tools';
import SchemaStore from './schemaStore';
import EditorStore from './editorStore';

const schemaStore = new SchemaStore();
const editorStore = new EditorStore();

injectStores({
  schemaStore,
  editorStore,
});

export { schemaStore, editorStore };
