import { ReactNode, useState } from 'react';

interface IEditorButtonProps {
  onClick: () => void;
  children: ReactNode;
  tooltip: string;
  name: string;
}
const EditorButton = ({ onClick, children, tooltip, name }: IEditorButtonProps) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleClick = (): void => {
    onClick();

    if (name === 'copy') {
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  };

  return (
    <div className="group relative" data-name={name}>
      <button
        type="button"
        className="p-2 rounded-lg hover:bg-gray-400 duration-500 ease-in-out"
        onClick={handleClick}
      >
        {children}
      </button>
      <div className="text-xs invisible opacity-0 duration-500 group-hover:visible group-hover:opacity-100 absolute -bottom-7 left-0 bg-white rounded-sm py-1 px-2 shadow-sm z-10 whitespace-nowrap">
        {name === 'copy' && copied ? (
          <span className="text-indigo-600">Copied!</span>
        ) : (
          <span className="capitalize">{tooltip}</span>
        )}
      </div>
    </div>
  );
};

export default EditorButton;
