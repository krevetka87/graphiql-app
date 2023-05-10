import { ReactComponent as RootIcon } from '../../../assets/root.svg';
import { schemaStore } from '../../../store';

function Root() {
  const { schema } = schemaStore;

  const queryType = schema ? schema.getQueryType() : null;

  return (
    <div className="max-w-md">
      <h2 className="text-3xl">{schemaStore.headerText}</h2>
      <p className="mt-5">A GraphQL schema provides a root type for each kind of operation.</p>
      <div className="flex items-center mt-5">
        <RootIcon className="mr-2" />
        <p className="text-sm">Root Types</p>
      </div>
      <p className="font-normal mt-5 text-blue-500">
        query:{' '}
        {queryType ? (
          <span className="text-orange-500 hover:underline cursor-pointer font-normal">
            {queryType.name}
          </span>
        ) : (
          ''
        )}
      </p>
    </div>
  );
}

export default Root;
