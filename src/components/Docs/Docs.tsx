import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { schemaStore } from '../../store';
import Queries from './Queries/Queries';
import Root from './Root/Root';
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
    </div>
  );
});

export default Docs;
