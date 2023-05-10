import React from 'react';
import { GraphQLArgument } from 'graphql';
import TypeFormat from '../TypeFormat/TypeFormat';

interface ArgumentsProps {
  args: readonly GraphQLArgument[];
}

function Arguments({ args }: ArgumentsProps) {
  const copyArgs = [...args];

  return (
    <>
      {copyArgs.map((arg, _index, arr) => (
        <React.Fragment key={arg.name}>
          <div className={`font-normal ${arr.length > 1 ? 'ml-2' : ''}`}>
            <span className="text-red-500">{arg.name}</span>: <TypeFormat arg={String(arg.type)} />
          </div>
        </React.Fragment>
      ))}
    </>
  );
}

export default Arguments;
