import Copyright from './Copyright';
import ProfileLinkList from './ProfileLinkList';
import RSLink from './RSLink';

const Footer = () => {
  return (
    <footer className="p-6 flex flex-col md:flex-row justify-between items-center flex-initial gap-5">
      <ProfileLinkList />
      <Copyright />
      <RSLink />
    </footer>
  );
};

export default Footer;
