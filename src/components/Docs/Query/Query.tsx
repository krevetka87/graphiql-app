import { GraphQLField } from 'graphql';
import React from 'react';
import { OpenState } from '../../../constants/docs';
import { schemaStore } from '../../../store';
import Arguments from '../Arguments/Arguments';
import TypeFormat from '../TypeFormat/TypeFormat';

interface QueryProps {
  field: GraphQLField<unknown, unknown>;
}

function Query({ field }: QueryProps) {
  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { target } = event;
    const text = (target as HTMLSpanElement).textContent || '';

    schemaStore.saveStateToHistory();

    schemaStore.setBackText(schemaStore.headerText);
    schemaStore.setHeaderText(text);

    schemaStore.setSelectedQueryField(field);
    schemaStore.setOpenState(OpenState.queryField);
  };

  return (
    <div>
      <h2>
        <strong
          className="text-blue-500 hover:underline cursor-pointer font-normal"
          onClick={handleClick}
        >
          {field.name}
        </strong>
        {field && field.args && field.args.length ? <Arguments args={field.args} /> : ''}:{' '}
        <span>
          <TypeFormat arg={String(field.type)} />
        </span>
      </h2>
      {field.args && <p className="mt-2">{field.description}</p>}
    </div>
  );
}

export default Query;
