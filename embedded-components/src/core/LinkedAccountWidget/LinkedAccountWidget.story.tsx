import { LinkedAccountWidget } from './LinkedAccountWidget';

export default {
  title: 'Linked Account Widget',
};

export const Usage = () => (
  <div className="eb-max-w-[40rem]">
    <LinkedAccountWidget variant="singleAccount" />
  </div>
);
