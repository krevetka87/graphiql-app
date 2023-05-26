import { TextState } from 'src/types/text.types';

interface BannerProps {
  text: TextState;
}

const Banner = ({ text }: BannerProps) => {
  return (
    <div className="flex flex-col bg-gray-100 p-4 rounded-md flex-1 w-full hover:bg-[#fe718d] transition-all select-none">
      <span className="font-bold flex-shrink-0">{text.title}</span>
      <p className="flex-grow-1 break-words">{text.description}</p>
    </div>
  );
};

export default Banner;
