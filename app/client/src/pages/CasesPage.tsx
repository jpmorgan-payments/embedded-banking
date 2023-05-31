import { Badge, Space } from '@mantine/core';
import { PageWrapper } from 'components';
import { GITHUB_REPO } from 'data/constants';
import { CasesTable, CreateCaseForm } from 'features/Cases';

export const CasesPage = () => {
  return (
    <PageWrapper
      title="Support Cases"
      apiEndpoint="/cases"
      githubLink={`${GITHUB_REPO}/tree/main/app/client/src/features/Cases`}
    >
      <div>
        Create a new case with the <Badge>POST /cases</Badge> call.
        <Space h="xs" />
        Update a specific case with the <Badge>POST /cases/{'{id}'}</Badge>call.
        <Space h="xs" />
        List cases with the <Badge>GET /cases</Badge> call.
      </div>
      <CreateCaseForm />
      <CasesTable />
    </PageWrapper>
  );
};
