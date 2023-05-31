import {
  Text,
  Radio,
  SimpleGrid,
  Title,
  Button,
  Avatar,
  Group,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { IconUsers, IconPlus } from '@tabler/icons';

import type { Step } from '../../models';

import { businessOwnersStepSchema } from './BusinessOwnersStep.schema';
import { BusinessOwnerForm } from './BusinessOwnerForm/BusinessOwnerForm';
import type { BusinessOwnerFormValues } from './BusinessOwnerForm/BusinessOwnerForm.schema';

import useStyles from './BusinessOwnersStep.styles';

interface BusinessOwnerButtonProps extends ButtonProps {
  name: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BusinessOwnerButton = ({ name, ...props }: BusinessOwnerButtonProps) => {
  const { classes } = useStyles();
  return (
    <Button
      classNames={{
        root: classes.button,
        inner: classes.buttonInner,
      }}
      variant="default"
      {...props}
    >
      <Group>
        <Avatar size={40} color="blue">
          {name
            .split(' ')
            .map((n: string) => n[0])
            .join('')}
        </Avatar>
        <Text className={classes.buttonText}>{name}</Text>
      </Group>
    </Button>
  );
};

interface AddBusinessOwnerButtonProps extends ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const AddBusinessOwnerButton = (props: AddBusinessOwnerButtonProps) => {
  const { classes } = useStyles();
  return (
    <Button
      classNames={{
        root: classes.button,
        inner: classes.buttonInner,
      }}
      variant="outline"
      {...props}
    >
      <Group noWrap position="left">
        <ThemeIcon variant="light" size="xl">
          <IconPlus />
        </ThemeIcon>
        <Text className={classes.buttonText}>
          Click to add a business owner
        </Text>
      </Group>
    </Button>
  );
};

const BusinessOwnersStep: Step = ({ form }) => {
  const theme = useMantineTheme();
  const modals = useModals();

  const openBusinessOwnerFormModal = (index?: number) => {
    const editMode = typeof index !== 'undefined';

    const onAddBusinessOwner = (owner: BusinessOwnerFormValues) => {
      form.insertListItem('owners', owner);
      modals.closeAll();
    };

    const onEditBusinessOwner = (owner: BusinessOwnerFormValues) => {
      form.insertListItem('owners', owner, index!);
      modals.closeAll();
    };

    const onDeleteBusinessOwner = () => {
      form.removeListItem('owners', index!);
      modals.closeAll();
    };

    modals.openModal({
      title: <Title order={3}>Enter business owner details</Title>,
      size: 'xl',
      children: (
        <BusinessOwnerForm
          editMode={editMode}
          initialValues={editMode ? form.values.owners[index] : undefined}
          onSubmit={editMode ? onEditBusinessOwner : onAddBusinessOwner}
          onCancel={() => modals.closeAll()}
          onDelete={onDeleteBusinessOwner}
        />
      ),
    });
  };

  const maxOwners = 4 - (form.values.ownersExist === 'yes' ? 1 : 0);

  return (
    <section>
      <Title order={2} mb="sm">
        Provide information for any business owners
      </Title>
      <Radio.Group
        label="Does anyone own 25% or more of the business?"
        mb="md"
        {...form.getInputProps('ownersExist')}
      >
        <Radio value="yes" label="Yes" mt="xs" />
        <Radio value="no" label="No" mt="xs" />
      </Radio.Group>
      {form.values.ownersExist === 'yes' ? (
        <>
          <Radio.Group
            label="Do you, the controller, own 25% or more of the business?"
            mb="md"
            {...form.getInputProps('controllerIsOwner')}
          >
            <Radio value="yes" label="Yes" mt="xs" />
            <Radio value="no" label="No" mt="xs" />
          </Radio.Group>
          <Title order={3} mt="xl" mb="xs">
            Business Owners
          </Title>
          <SimpleGrid
            cols={4}
            breakpoints={[
              { maxWidth: theme.breakpoints.lg, cols: 3 },
              { maxWidth: theme.breakpoints.md, cols: 2 },
              { maxWidth: theme.breakpoints.xs, cols: 1 },
            ]}
          >
            {form.values.controllerIsOwner === 'yes' ? (
              <BusinessOwnerButton
                name={`${form.values.controllerFirstName} ${form.values.controllerLastName}`}
                disabled
              />
            ) : null}
            {form.values.owners.map((owner, index) => (
              <BusinessOwnerButton
                key={index}
                name={`
              ${owner.firstName}
              ${owner.lastName}
            `}
                onClick={() => openBusinessOwnerFormModal(index)}
              />
            ))}
            {form.values.owners.length < maxOwners && (
              <AddBusinessOwnerButton
                onClick={() => openBusinessOwnerFormModal()}
              />
            )}
          </SimpleGrid>
        </>
      ) : null}
    </section>
  );
};

BusinessOwnersStep.label = 'Owners';
BusinessOwnersStep.Icon = IconUsers;
BusinessOwnersStep.validationSchema = businessOwnersStepSchema;

export { BusinessOwnersStep };
