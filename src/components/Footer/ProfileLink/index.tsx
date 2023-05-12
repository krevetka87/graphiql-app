interface IProfileLinkProps {
  avatar: string;
  href: string;
  name: string;
}

const ProfileLink = ({ avatar, href, name }: IProfileLinkProps) => {
  return (
    <li className="w-8 h-8 rounded-full border-2 border-black hover:scale-95 transition-all ease-in-out duration-500">
      <a href={href} target="_blank" rel="noreferrer">
        <img src={avatar} alt={name} className="block rounded-full w-full h-full" />
      </a>
    </li>
  );
};

export default ProfileLink;
