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
    icon: <User key="userIcon" size={40} color="black"></User>,
  },
  {
    title: 'Business',
    icon: <Building key="buildingIcon" size={40} color="black"></Building>,
  },
  {
    title: 'Decision Makers',
    icon: <Users key="userIcon" size={40} color="black"></Users>,
  },
  {
    title: 'Additional Info',
    icon: <FileInfo key="fileIcon" size={40} color="black"></FileInfo>,
  },
  {
    title: 'Review',
    icon: (
      <LayoutDashboard
        key="layoutIcon"
        size={40}
        color="black"
      ></LayoutDashboard>
    ),
  },
  {
    title: 'Verifications',
    icon: <Checklist key="checklistIcon" size={40} color="black"></Checklist>,
  },
];

type StepperHeaderProps = {
    activeStep: number;
}

const StepperHeader = ({ activeStep }: StepperHeaderProps) => {
  return (
    <div className="eb-grid eb-grid-cols-6 eb-my-5">
      {icons?.map((val, key) => (
        <div className="eb-grid eb-grid-cols-3 eb-w-26">
          <div
            className={`eb-flex eb-w-14 eb-h-14 eb-place-content-center eb-rounded-full eb-border-2 ${activeStep === key+1 ? 'eb-border-blue-800' : 'eb-border-primary/80'} eb-justify-items-center eb-justify-center eb-place-content-center eb-items-center`}
          >
            {val?.icon}
          </div>

          <div className="eb-flex eb-justify-center eb-place-content-center eb-items-center eb-mr-5">
            <Text >{val?.title}</Text>
          </div>
          {key !== icons?.length-1 && (
            <div className="eb-grid eb-grid-row-2 eb-w-12">
              <div></div>
              <div className="eb-border-t-4"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperHeader;
