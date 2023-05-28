import { observer } from 'mobx-react-lite';
import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { schemaStore } from '../../store';
import { ReactComponent as Spinner } from '../../assets/spinner.svg';

const Root = lazy(() => import('./Root'));
const ScalarType = lazy(() => import('./ScalarType'));
const Queries = lazy(() => import('./Queries'));
const QueryTools = lazy(() => import('./QueryTools'));
const Types = lazy(() => import('./Types'));

const Docs = observer(() => {
  const { t } = useTranslation();
  const { opened, isSchemaLoading, isSchemaError } = schemaStore;

  if (isSchemaLoading) {
    return (
      <div className="[&>*:first-child]:w-24 [&>*:first-child]:h-24 p-4 w-full h-[300px] lg:h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (!isSchemaLoading && isSchemaError) {
    return (
      <div className="h-[300px] lg:h-full w-full flex justify-center items-center">
        <h3 className="text-center">{t('docs.loadError')}</h3>
      </div>
    );
  }

  return (
    <div className="text-sm md:text-base p-2 overflow-auto max-h-full h-auto w-full scrollbar scrollbar-thumb-gray-300 scrollbar-w-1 scrollbar-h-1 relative">
      <div className="absolute top-0 left-0 pr-2">
        {opened.query && <Root />}
        {opened.queryFields && <Queries />}
        {opened.queryField && <QueryTools />}
        {opened.scalarType && <ScalarType />}
        {opened.typeName && <Types />}
      </div>
    </div>
  );
});

export default Docs;
