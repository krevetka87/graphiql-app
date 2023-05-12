import ProfileLink from '../ProfileLink';
import { profiles } from '../../../constants/common';

const ProfileLinkList = () => {
  return (
    <ul className="flex gap-2">
      {profiles.map(({ name, link, avatar, id }) => (
        <ProfileLink name={name} avatar={avatar} href={link} key={id} />
      ))}
    </ul>
  );
};

export default ProfileLinkList;
