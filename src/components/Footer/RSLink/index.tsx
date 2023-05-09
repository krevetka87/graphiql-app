import RSLogo from '../../../assets/icons/rs-logo.svg';

const RSLink = () => {
  return (
    <a
      href="https://rs.school/react/"
      target="_blank"
      rel="noreferrer"
      className="hover:scale-95 ease-in-out duration-500"
    >
      <img src={RSLogo} alt="RSSchool" />
    </a>
  );
};

export default RSLink;
