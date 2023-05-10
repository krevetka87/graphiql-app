import { observer } from 'mobx-react-lite';
import { lazy, useEffect } from 'react';
import { schemaStore } from '../../store';
import Spinner from './Spinner';

const Root = lazy(() => import('./Root'));
const ScalarType = lazy(() => import('./ScalarType'));
const Queries = lazy(() => import('./Queries'));
const QueryTools = lazy(() => import('./QueryTools'));
const Types = lazy(() => import('./Types'));

const Docs = observer(() => {
  useEffect(() => {
    schemaStore.loadSchema();
  }, []);

  if (!schemaStore.schema) {
    return (
      <div className="border-l border-gray-700 p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border-l border-gray-700 p-4 overflow-auto">
      {schemaStore.opened.query && <Root />}
      {schemaStore.opened.queryFields && <Queries />}
      {schemaStore.opened.queryField && <QueryTools />}
      {schemaStore.opened.scalarType && <ScalarType />}
      {schemaStore.opened.typeName && <Types />}
    </div>
  );
});

export default Docs;
