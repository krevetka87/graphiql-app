import { GraphQLInputObjectType, GraphQLObjectType, GraphQLScalarType } from 'graphql';
import { OpenState } from '../../../constants/docs';
import { schemaStore } from '../../../store';

interface TypeFormatProps {
  arg: string;
}

const TypeFormat = ({ arg }: TypeFormatProps) => {
  const firstLetterIndex = arg.search(/[a-zA-Z]/);
  const lastLetterIndex = arg.search(/[A-Za-z](?=[^A-Za-z]*$)/) + 1;

  const firstPart = arg.slice(0, firstLetterIndex);
  const secondPart = arg.slice(firstLetterIndex, lastLetterIndex);
  const thirdPart = arg.slice(lastLetterIndex);

  const { schema, headerText } = schemaStore;

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { target } = event;
    const text = (target as HTMLSpanElement).textContent || '';

    schemaStore.saveStateToHistory();

    schemaStore.setBackText(headerText);
    schemaStore.setHeaderText(text);

    const type = schema?.getType(secondPart);

    if (schema && type && type instanceof GraphQLScalarType) {
      schemaStore.setSelectedScalarType(type);
      schemaStore.setOpenState(OpenState.scalarType);
    }

    if (
      (schema && type && type instanceof GraphQLObjectType) ||
      (schema && type && type instanceof GraphQLInputObjectType)
    ) {
      schemaStore.setQueryFields(type.getFields());

      schemaStore.setSelectedTypeName(text);
      schemaStore.setOpenState(OpenState.typeName);
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
};

export default TypeFormat;
