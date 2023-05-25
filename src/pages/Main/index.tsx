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

  return <GraphQLEditor />;
};

export default Main;
