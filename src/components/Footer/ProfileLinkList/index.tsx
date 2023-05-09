import ProfileLink from '../ProfileLink';

const ProfileLinkList = () => {
  const profiles = [
    {
      id: 1,
      name: 'krevetka87',
      link: 'https://github.com/krevetka87',
      avatar: 'https://avatars.githubusercontent.com/u/77237102?v=4',
    },
    {
      id: 2,
      name: 'metalknock',
      link: 'https://github.com/MetalKnock',
      avatar: 'https://avatars.githubusercontent.com/u/102481723?v=4',
    },
    {
      id: 3,
      name: 'dazmond-ru',
      link: 'https://github.com/Dazmond-ru',
      avatar: 'https://avatars.githubusercontent.com/u/60709379?v=4',
    },
  ];

  return (
    <ul className="flex gap-2">
      {profiles.map(({ name, link, avatar, id }) => (
        <ProfileLink name={name} avatar={avatar} href={link} key={id} />
      ))}
    </ul>
  );
};

export default ProfileLinkList;
