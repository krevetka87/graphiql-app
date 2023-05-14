import { GraphQLArgument } from 'graphql';
import TypeFormat from '../TypeFormat';

interface ArgumentsProps {
  args: readonly GraphQLArgument[];
}

const Arguments = ({ args }: ArgumentsProps) => {
  return (
    <>
      {args.map((arg, _index, arr) => (
        <div key={arg.name}>
          <div className={`font-normal ${arr.length > 1 ? 'ml-2' : ''}`}>
            <span className="text-red-500">{arg.name}</span>: <TypeFormat arg={String(arg.type)} />
          </div>
        </div>
      ))}
    </>
  );
};

export default Arguments;
