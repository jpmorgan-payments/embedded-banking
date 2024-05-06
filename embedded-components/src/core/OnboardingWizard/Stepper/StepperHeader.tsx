import {
  Building,
  Checklist,
  FileInfo,
  LayoutDashboard,
  User,
  Users,
} from 'tabler-icons-react';

import { Text } from '@/components/ui/text';

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
    <div className="eb-flex eb-flex-row eb-justify-center sm:eb-hidden md:eb-flex eb-my-5 eb-cursor-pointer">
      {icons?.map((val, idx) => (
        <div
          className="eb-flex eb-items-center eb-flex-row eb-gap-2"
          key={val.title}
          onClick={() => {
            setCurrentStep(idx + 1);
          }}
        >
          <div
            className={`eb-flex eb-w-12 eb-h-12 eb-place-content-center hover:eb-drop-shadow-sm eb-justify-center eb-rounded-full eb-border-2 ${activeStep === idx + 1 ? 'eb-border-primary/90' : 'eb-border-grey/80'} eb-justify-items-center eb-justify-center eb-place-content-center eb-items-center`}
          >
            {val?.icon}
          </div>

        
            <Text className="eb-text-sm eb-mr-2">{val?.title}</Text>
      
          {idx !== icons?.length - 1 && (
            <div className="eb-grid eb-grid-row-2 sm:eb-hidden eb-mr-2 lg:eb-grid">
              <div></div>
              <div className="eb-border-t-2 eb-w-5"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperHeader;
