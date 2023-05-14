import { GraphQLInputObjectType, GraphQLObjectType } from 'graphql';
import { schemaStore } from '../../../store';
import Queries from '../Queries';

const Types = () => {
  const { schema, typeName } = schemaStore;

  const type = schema ? schema.getType(typeName) : null;

  if (type instanceof GraphQLObjectType || type instanceof GraphQLInputObjectType) {
    return <Queries />;
  }

  return null;
};

export default Types;
