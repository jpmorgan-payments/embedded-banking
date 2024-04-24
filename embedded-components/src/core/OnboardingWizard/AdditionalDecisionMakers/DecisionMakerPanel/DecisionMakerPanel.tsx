import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {  DialogTrigger } from '@/components/ui/dialog';

type DecisionMakersPanelProps = {
  controller?: boolean;
};

const fieldsController = (data: any) => {
  return [
    { des: 'Title', var: data?.individualDetails?.jobTitle },
    { des: 'Email', var: data?.email },
    { des: 'SSN', var: data?.individualDetails?.individualIds[0]?.value },
  ];
};

const fieldsOther = (data: any) => {
  return [
    { des: 'Title', var: data?.individualDetails?.jobTitle },
    { des: 'Email', var: data?.email },
    { des: 'Phone', var: data?.phone },
  ];
};

const data = {
  partyType: 'INDIVIDUAL',
  externalId: 'TCU12344',
  email: 'monicagellar@gmail.com',
  roles: ['CONTROLLER', 'BENEFICIAL_OWNER'],
  individualDetails: {
    firstName: 'Monica',
    lastName: 'Gellar',
    countryOfResidence: 'US',
    natureOfOwnership: 'Direct',
    jobTitle: 'Other',
    jobTitleDescription: 'CEO',
    soleOwner: true,
    addresses: [
      {
        addressType: 'RESIDENTIAL_ADDRESS',
        addressLines: ['90 Bedford Street', 'Apt 2E'],
        city: 'New York',
        state: 'NY',
        postalCode: '10014',
        country: 'US',
      },
    ],
    individualIds: [
      {
        idType: 'SSN',
        issuer: 'US',
        value: '100-01-0001',
      },
    ],
  },
};

const DecisionMakerPanel = ({
  controller = false,
}: DecisionMakersPanelProps) => {
  const fields = controller ? fieldsController(data) : fieldsOther(data);
  return (
    <div className="eb-w-80">
      <Card>
        <CardContent
          className={`${controller && 'eb-bg-black/20'} eb-h-60 eb-rounded-md`}
        >
          <div className="eb-grid  eb-grid-cols-2 eb-grid-rows-5">
            <div className=" eb-w-16 eb-h-16 eb-bg-secondary  eb-rounded-lg eb-content-center">
              <Text className="eb-text-center eb-content-center">
                {data?.individualDetails?.firstName?.split('')[0]}
                {data?.individualDetails?.lastName?.split('')[0]}
              </Text>
            </div>

            <div>
              {data?.individualDetails?.firstName}{' '}
              {data?.individualDetails?.lastName}
            </div>

            <div >{fields?.map((fieldVal) => <div><Text className="eb-font-bold">{fieldVal?.des}</Text></div>)}</div>
            <div>{fields?.map((fieldVal) => <div><Text>{fieldVal?.var ? fieldVal?.var : "N/A"}</Text></div>)}</div>
            <div></div>
            <div >{controller? <Text>View/edit details in controller step</Text> : <DialogTrigger><Button variant="default">View/Edit Details</Button></DialogTrigger>}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export { DecisionMakerPanel };
