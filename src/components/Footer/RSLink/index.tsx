import RSLogo from '../../../assets/rs-logo.svg';

const RSLink = () => {
  return (
    <a
      href="https://rs.school/react/"
      target="_blank"
      rel="noreferrer"
      className="hover:scale-95 ease-in-out duration-500"
    >
      <img src={RSLogo} alt="RSSchool" className="h-8 w-auto" />
    </a>
  );
};

export default RSLink;
