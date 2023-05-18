import EditorHeader from './EditorHeader';
import RequestSection from './RequestSection';
import ResponseSection from './ResponseSection';
import DocsSection from './DocsSection';

const GraphQLEditor = () => {
  return (
    <div className="shadow-xl flex flex-row lg:flex-col flex-auto min-w-0 h-auto lg:h-full mx-6 border-[1px] border-[#ECF3FA]">
      <EditorHeader />
      <div className="flex flex-1 min-w-0 min-h-0 flex-col lg:flex-row border-l border-[#ECF3FA] lg:border-l-0">
        <RequestSection />
        <ResponseSection />
        <DocsSection />
      </div>
    </div>
  );
};

export default GraphQLEditor;
