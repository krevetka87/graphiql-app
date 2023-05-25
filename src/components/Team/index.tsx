import { TeamState } from 'src/types/text.types';
import ghLogo from '../../assets/github-logo.svg';

interface TeamProps {
  developer: TeamState;
}

const Team = ({ developer }: TeamProps) => {
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = ghLogo;
  };

  return (
    <li>
      <a href={developer.link} target="_blank" rel="noreferrer">
        <div className="flex items-center gap-4">
          <img
            src={developer.avatar}
            alt={developer.name}
            className="block rounded-full sm:w-20 w-10"
            onError={handleImgError}
          />
          <div>
            <h4 className="whitespace-nowrap text-lg font-medium">{developer.name}</h4>
            <p className="whitespace-nowrap">{developer.position}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default Team;
