import { useEffect } from 'react';
import GraphQLEditor from '../../components/GraphQLEditor';
import { disposeEditors } from '../../utils/editorHelpers';

const Main = () => {
  useEffect(() => {
    return () => {
      disposeEditors();
    };
  });

  return <GraphQLEditor />;
};

export default Main;
