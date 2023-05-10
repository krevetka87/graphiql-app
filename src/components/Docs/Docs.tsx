import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import QueryTools from './QueryTools/QueryTools';
import { schemaStore } from '../../store';
import Queries from './Queries/Queries';
import Root from './Root/Root';
import ScalarType from './ScalarType/ScalarType';
import Spinner from './Spinner/Spinner';

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
    <div className="border-l border-gray-700 p-4">
      {schemaStore.opened.query && <Root />}
      {schemaStore.opened.queryFields && <Queries />}
      {schemaStore.opened.queryField && <QueryTools />}
      {schemaStore.opened.scalarType && <ScalarType />}
    </div>
  );
});

export default Docs;
