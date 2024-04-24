import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';

type DecisionMakersPanelProps = {
    disabled?: boolean;
}

const data= {
    "firstName": "Monica",
    "lastName": "Gellar",
    "countryOfResidence": "US",
    "natureOfOwnership": "Direct",
    "jobTitle": "Other",
    "jobTitleDescription": "CEO",
    "soleOwner": true,
    "addresses": [
      {
        "addressType": "RESIDENTIAL_ADDRESS",
        "addressLines": [
          "90 Bedford Street",
          "Apt 2E"
        ],
        "city": "New York",
        "state": "NY",
        "postalCode": "10014",
        "country": "US"
      }
    ]

}


const DecisionMakersPanel = ({disabled}: DecisionMakersPanelProps) => {
  return (
    <div className="eb-w-80">
      <Card>
        <CardContent className={`${disabled && 'eb-bg-black/20'} eb-h-40 eb-rounded-md`}>
          <div className="eb-grid eb-grid-col-2 eb-pt-6 eb-grid-flow-col eb-gap-2">
            <div className="eb-col-span-3  ">
            <div className="eb-w-16 eb-h-16 eb-bg-secondary eb-rounded-lg"><Text>{data?.firstName?.split("")[0]}{data?.lastName?.split("")[0]}</Text></div>

            </div>
            <div className="eb-col-span-8  ">01</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export { DecisionMakersPanel };
