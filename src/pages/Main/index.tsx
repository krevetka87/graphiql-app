import { useEffect } from 'react';
import GraphQLEditor from '../../components/GraphQLEditor';
import { disposeEditors } from '../../utils/editorHelpers';
import { schemaStore } from '../../store';

const Main = () => {
  useEffect(() => {
    schemaStore.loadSchema();

    return () => {
      disposeEditors();
    };
  });

  return (
    <main className="flex-auto w-full lg:min-h-0">
      <GraphQLEditor />
    </main>
  );
};

export default Main;
