interface AccordionTitleProps {
  title: string;
}

const AccordionTitle = ({ title }: AccordionTitleProps) => {
  return (
    <div className="flex items-center gap-5 text-2xl mb-6">
      <div className="w-full h-1 bg-gray-100" />
      <h5 className="whitespace-nowrap">{title}</h5>
      <div className="w-full h-1 bg-gray-100" />
    </div>
  );
};

export default AccordionTitle;
