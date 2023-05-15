import { observer } from 'mobx-react-lite';
import Accordeon from '../Accordeon';
import JsonEditor from '../JsonEditor';
import { Files, Tabs, editorOptions } from '../../../constants/editor';
import QueryEditor from '../QueryEditor';
import { editorStore } from '../../../store';

const RequestSection = observer(() => {
  const { activeTab } = editorStore;

  return (
    <section className="flex-1 border-r-4 border-[#ECF3FA] min-w-0 min-h-0 flex flex-col">
      <div className="flex-1 min-h-0 min-w-0">
        <QueryEditor />
      </div>
      <Accordeon>
        <>
          <JsonEditor
            type={Tabs.variables}
            fileName={Files.variables}
            options={editorOptions}
            className={`h-40 ${activeTab === Tabs.variables ? 'block' : 'hidden'}`}
          />
          <JsonEditor
            type={Tabs.headers}
            fileName={Files.headers}
            options={editorOptions}
            className={`h-40 ${activeTab === Tabs.headers ? 'block' : 'hidden'}`}
          />
        </>
      </Accordeon>
    </section>
  );
});

export default RequestSection;
