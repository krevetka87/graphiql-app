import { schemaStore } from '../../../store';

import { ReactComponent as ArgumentsIcon } from '../../../assets/arguments.svg';
import { ReactComponent as TypeIcon } from '../../../assets/type.svg';
import Arguments from '../Arguments/Arguments';
import TypeFormat from '../TypeFormat/TypeFormat';

function QueryTools() {
  const field = schemaStore.queryField;

  return (
    <div>
      {field ? (
        <>
          <h2 className="text-2xl  mt-3">{schemaStore.headerText}</h2>
          <div className="mt-6">{field.description}</div>

          {field.args && field.args.length ? (
            <>
              <div className="flex items-center mt-5">
                <ArgumentsIcon className="mr-2" />
                <p className="text-sm">Arguments</p>
              </div>
              <Arguments args={field.args} />
            </>
          ) : (
            ''
          )}

          <div className="flex items-center mt-5">
            <TypeIcon className="mr-2" />
            <p className="text-sm">Type</p>
          </div>
          <div className="ml-2 mt-3">
            <TypeFormat arg={field.type.toString()} />
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default QueryTools;
