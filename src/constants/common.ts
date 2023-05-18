const URL = 'https://rickandmortyapi.com/graphql';

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

enum RoutePath {
  welcome = '/',
  main = '/main',
  login = '/login',
  notFound = '/not-found',
}

enum Languages {
  en = 'en',
  ru = 'ru',
}

export { RoutePath, Languages, profiles, URL };
