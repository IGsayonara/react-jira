import JiraSpace from '@/packages/Jira/components/JiraSpace/JiraSpace';

import { JiraProvider } from '@/packages/Jira/providers/JiraProvider';

function Jira() {
  const items = new Array(5);
  items.fill(0);
  return (
    <JiraProvider>
      <JiraSpace />;
    </JiraProvider>
  );
}

export default Jira;
