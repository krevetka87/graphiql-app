import Copyright from './Copyright';
import ProfileLinkList from './ProfileLinkList';
import RSLink from './RSLink';

const Footer = () => {
  return (
    <footer className="p-5 flex justify-between items-center flex-initial">
      <ProfileLinkList />
      <Copyright />
      <RSLink />
    </footer>
  );
};

export default Footer;
