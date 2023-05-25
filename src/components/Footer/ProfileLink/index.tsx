import ghLogo from '../../../assets/github-logo.svg';

interface ProfileLinkProps {
  avatar: string;
  href: string;
  name: string;
}

const ProfileLink = ({ avatar, href, name }: ProfileLinkProps) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = ghLogo;
  };

  return (
    <li className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-95 transition-all ease-in-out duration-500">
      <a href={href} target="_blank" rel="noreferrer">
        <img
          src={avatar}
          alt={name}
          className="block rounded-full w-full h-full"
          onError={handleImgError}
        />
      </a>
    </li>
  );
};

export default ProfileLink;
