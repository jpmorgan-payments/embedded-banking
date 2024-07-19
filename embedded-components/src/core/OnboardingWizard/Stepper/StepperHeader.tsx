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
    title: 'Intro',
    icon: <User key="userIcon" size={20} color="black"></User>,
  },
  {
    title: 'Individual',
    icon: <User key="userIcon" size={20} color="black"></User>,
  },
  {
    title: 'Organization',
    icon: <Building key="buildingIcon" size={20} color="black"></Building>,
  },
  {
    title: 'Business Owners',
    icon: <Users key="userIcon" size={20} color="black"></Users>,
  },
  {
    title: 'Decision Makers',
    icon: <Users key="userIcon" size={20} color="black"></Users>,
  },
  {
    title: 'Questions',
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
    title: 'Verification',
    icon: <Checklist key="checklistIcon" size={20} color="black"></Checklist>,
  },
];

type StepperHeaderProps = {
  activeStep: number;
  setCurrentStep: (val: number) => void;
  steps: string[];
};

const StepperHeader = ({
  activeStep,
  setCurrentStep,
  steps,
}: StepperHeaderProps) => {
  return (
    <Box className="eb-my-5 eb-flex eb-cursor-pointer eb-flex-row eb-justify-center sm:eb-hidden md:eb-flex">
      {steps
        ?.filter((step) => {
          return icons.filter((i: any) => i.title === step);
        })
        .map((val, idx) => {
          const icon: any = icons.filter((i: any) => i?.title === val)[0];

          return (
            <Box
              className="eb-flex eb-flex-row eb-items-center eb-gap-2"
              key={icon?.title}
              onClick={() => {
                setCurrentStep(idx);
              }}
            >
              <Box
                className={`eb-flex eb-h-12 eb-w-12 eb-place-content-center eb-justify-center eb-rounded-full eb-border-2 hover:eb-drop-shadow-sm ${activeStep === idx ? 'eb-border-primary/90' : 'eb-border-gray-500/80'} eb-place-content-center eb-items-center eb-justify-center eb-justify-items-center`}
              >
                {icon?.icon}
              </Box>

              <Text className="eb-mr-2 eb-text-sm">{icon?.title}</Text>

              {idx !== icons.length - 1 && (
                <Box className="eb-mr-2 eb-grid eb-grid-rows-2 sm:eb-hidden lg:eb-grid">
                  <Box></Box>
                  <Box className="eb-w-5 eb-border-t-2"></Box>
                </Box>
              )}
            </Box>
          );
        })}
    </Box>
  );
};

export default StepperHeader;
