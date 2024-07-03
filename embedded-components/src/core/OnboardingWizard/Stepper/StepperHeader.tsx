import {
  Building,
  Checklist,
  FileInfo,
  LayoutDashboard,
  User,
  Users,
} from 'tabler-icons-react';

import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui';

const icons = [
  {
    title: 'Personal',
    icon: <User key="userIcon" size={20} color="black"></User>,
  },
  {
    title: 'Business',
    icon: <Building key="buildingIcon" size={20} color="black"></Building>,
  },
  {
    title: 'Decision Makers',
    icon: <Users key="userIcon" size={20} color="black"></Users>,
  },
  {
    title: 'Additional Info',
    icon: <FileInfo key="fileIcon" size={20} color="black"></FileInfo>,
  },
  {
    title: 'Review',
    icon: (
      <LayoutDashboard
        key="layoutIcon"
        size={20}
        color="black"
      ></LayoutDashboard>
    ),
  },
  {
    title: 'Verifications',
    icon: <Checklist key="checklistIcon" size={20} color="black"></Checklist>,
  },
];

type StepperHeaderProps = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
};

const StepperHeader = ({ activeStep, setCurrentStep }: StepperHeaderProps) => {
  return (
    <Box className="eb-my-5 eb-flex eb-cursor-pointer eb-flex-row eb-justify-center sm:eb-hidden md:eb-flex">
      {icons?.map((val, idx) => (
        <Box
          className="eb-flex eb-flex-row eb-items-center eb-gap-2"
          key={val.title}
          onClick={() => {
            setCurrentStep(idx + 1);
          }}
        >
          <Box
            className={`eb-flex eb-h-12 eb-w-12 eb-place-content-center eb-justify-center eb-rounded-full eb-border-2 hover:eb-drop-shadow-sm ${activeStep === idx + 1 ? 'eb-border-primary/90' : 'eb-border-gray-500/80'} eb-place-content-center eb-items-center eb-justify-center eb-justify-items-center`}
          >
            {val?.icon}
          </Box>

          <Text className="eb-mr-2 eb-text-sm">{val?.title}</Text>

          {idx !== (icons?.length ?? 0) - 1 && (
            <Box className="eb-mr-2 eb-grid eb-grid-rows-2 sm:eb-hidden lg:eb-grid">
              <Box></Box>
              <Box className="eb-w-5 eb-border-t-2"></Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default StepperHeader;
