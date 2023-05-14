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
  const { opened, schema } = schemaStore;

  useEffect(() => {
    schemaStore.loadSchema();
  }, []);

  if (!schema) {
    return (
      <div className="border-l border-gray-700 p-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="border-l border-gray-700 p-4 overflow-auto">
      {opened.query && <Root />}
      {opened.queryFields && <Queries />}
      {opened.queryField && <QueryTools />}
      {opened.scalarType && <ScalarType />}
      {opened.typeName && <Types />}
    </div>
  );
});

export default Docs;
