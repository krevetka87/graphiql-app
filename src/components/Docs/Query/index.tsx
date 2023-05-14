import { GraphQLField } from 'graphql';
import React from 'react';
import { OpenState } from '../../../constants/docs';
import { schemaStore } from '../../../store';
import Arguments from '../Arguments';
import TypeFormat from '../TypeFormat';

interface QueryProps {
  field: GraphQLField<unknown, unknown>;
}

const Query = ({ field }: QueryProps) => {
  const { headerText } = schemaStore;

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { target } = event;
    const text = (target as HTMLSpanElement).textContent || '';

    schemaStore.saveStateToHistory();

    schemaStore.setBackText(headerText);
    schemaStore.setHeaderText(text);

    schemaStore.setSelectedQueryField(field);
    schemaStore.setOpenState(OpenState.queryField);
  };

  return (
    <>
      <div className={field && field.args && field.args.length < 2 ? 'flex items-center' : ''}>
        <strong className="text-blue-500 hover:underline cursor-pointer" onClick={handleClick}>
          {field.name}
        </strong>
        {field && field.args && field.args.length ? (
          <>
            (<Arguments args={field.args} />)
          </>
        ) : (
          ''
        )}
        :&nbsp;
        <TypeFormat arg={String(field.type)} />
      </div>
      {field.args && <p className="mt-2">{field.description}</p>}
    </>
  );
};

export default Query;
