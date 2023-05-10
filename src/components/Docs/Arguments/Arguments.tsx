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
      {copyArgs.map((arg, index, arr) => (
        <React.Fragment key={arg.name}>
          {arr.length > 1 && <br />}
          <div className="font-normal ml-2">
            <span className="text-red-500">{arg.name}</span>:{' '}
            <span>
              <TypeFormat arg={arg.type.toString()} />
            </span>
          </div>
          {arr.length > 1 && index === arr.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}

export default Arguments;
