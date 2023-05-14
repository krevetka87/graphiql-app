interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton = ({ isOpen, onClick }: BurgerButtonProps) => {
  return (
    <button
      type="button"
      className={`hidden max-md:block z-40 cursor-pointer relative w-8 h-6 transition-all after:transition-all  after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-1 after:bg-black before:transition-all before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-1 before:bg-black ${
        isOpen && 'after:rotate-45 after:-translate-y-2 before:-rotate-45 before:translate-y-3'
      }`}
      onClick={onClick}
    >
      <div className={`w-full h-1 bg-black transition-all ${isOpen && 'opacity-0'}`} />
    </button>
  );
};

export default BurgerButton;
