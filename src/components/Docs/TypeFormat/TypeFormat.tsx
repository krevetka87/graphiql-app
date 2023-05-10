import { GraphQLScalarType } from 'graphql';
import { OpenState } from '../../../constants/docs';
import { schemaStore } from '../../../store';

interface TypeFormatProps {
  arg: string;
}

function TypeFormat({ arg }: TypeFormatProps) {
  const firstLetterIndex = arg.search(/[a-zA-Z]/);
  const lastLetterIndex = arg.search(/[A-Za-z](?=[^A-Za-z]*$)/) + 1;

  const firstPart = arg.slice(0, firstLetterIndex);
  const secondPart = arg.slice(firstLetterIndex, lastLetterIndex);
  const thirdPart = arg.slice(lastLetterIndex);

  const { schema } = schemaStore;

  const handleClick = () => {
    const type = schema?.getType(secondPart);
    if (schema && type && type instanceof GraphQLScalarType) {
      schemaStore.setSelectedScalarType(type);
      schemaStore.setOpenState(OpenState.scalarType);
    }
  };

  return (
    <span>
      {firstPart}
      <span
        className="text-orange-500 hover:underline cursor-pointer font-normal"
        onClick={handleClick}
      >
        {secondPart}
      </span>
      {thirdPart}
    </span>
  );
}

export default TypeFormat;
