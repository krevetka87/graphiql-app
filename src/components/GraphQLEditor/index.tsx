import EditorHeader from './EditorHeader';
import RequestSection from './RequestSection';
import ResponseSection from './ResponseSection';
import DocsSection from './DocsSection';

const GraphQLEditor = () => {
  return (
    <div className="shadow-lg flex flex-col flex-auto min-w-0 h-auto lg:h-full mx-6">
      <EditorHeader />
      <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row lg:h-auto ml-[57px] lg:ml-0 border-l border-[#ECF3FA] lg:border-l-0">
        <RequestSection />
        <ResponseSection />
        <DocsSection />
      </div>
    </div>
  );
};

export default GraphQLEditor;
