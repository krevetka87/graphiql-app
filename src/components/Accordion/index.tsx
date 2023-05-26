import { TextState } from 'src/types/text.types';
import { ReactComponent as ArrowIcon } from '../../assets/accordion-arrow.svg';

interface AccordionProps {
  text: TextState;
  index: number;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const Accordion = ({ text, index, isOpen, toggleAccordion }: AccordionProps) => {
  return (
    <div
      className={`rounded-md hover:bg-[#fe718d] transition-all ${
        isOpen ? 'my-3 bg-[#fe718d]' : 'bg-gray-100'
      } ${index === 0 && 'mt-0'} ${index === 3 && 'mb-0'}`}
    >
      <div
        className="flex items-center justify-between px-4 py-2 cursor-pointer"
        onClick={toggleAccordion}
      >
        <span className="font-bold">{text.title}</span>
        <ArrowIcon className={`w-8 h-8 ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      <div className={`overflow-hidden duration-300 ease-in-out ${isOpen ? 'h-auto' : 'h-0'}`}>
        <div className="pb-4 px-4">{text.description}</div>
      </div>
    </div>
  );
};

export default Accordion;
