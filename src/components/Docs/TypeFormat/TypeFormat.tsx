interface TypeFormatProps {
  arg: string;
}

function TypeFormat({ arg }: TypeFormatProps) {
  const firstLetterIndex = arg.search(/[a-zA-Z]/);
  const lastLetterIndex = arg.search(/[A-Za-z](?=[^A-Za-z]*$)/) + 1;

  const firstPart = arg.slice(0, firstLetterIndex);
  const secondPart = arg.slice(firstLetterIndex, lastLetterIndex);
  const thirdPart = arg.slice(lastLetterIndex);

  const handleClick = () => {};

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
