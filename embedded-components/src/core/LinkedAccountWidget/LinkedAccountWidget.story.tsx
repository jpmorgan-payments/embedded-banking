import { LinkedAccountWidget } from './LinkedAccountWidget';

export default {
  title: 'Linked Account Widget',
};

export const Default = () => (
  <div className="eb-max-w-[40rem]">
    <LinkedAccountWidget />
  </div>
);

export const SingleAccount = () => (
  <div className="eb-max-w-[40rem]">
    <LinkedAccountWidget variant="singleAccount" />
  </div>
);
