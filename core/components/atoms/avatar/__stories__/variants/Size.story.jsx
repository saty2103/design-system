import * as React from 'react';
import { Avatar } from '@/index';
import Text from '@/components/atoms/text';

// CSF format story
export const size = () => {
  const weight = 'strong';

  return (
    <div className="d-flex">
      <div className="mr-9 d-flex flex-column">
        <Text weight={weight}>Regular</Text> <br />
        <Avatar firstName="John" lastName="Doe" />
      </div>
      <div className="mr-9  d-flex flex-column">
        <Text weight={weight}>Tiny</Text> <br />
        <Avatar firstName="John" lastName="Doe" size="tiny" />
      </div>
      <div className="mr-9 d-flex flex-column">
        <Text weight={weight}>Regular</Text> <br />
        <Avatar appearance="accent4" firstName="John" lastName="Doe" shape="square" />
      </div>
      <div className="mr-9  d-flex flex-column">
        <Text weight={weight}>Tiny</Text> <br />
        <Avatar appearance="accent4" firstName="John" lastName="Doe" size="tiny" shape="square" />
      </div>
    </div>
  );
};

export default {
  title: 'Components/Avatar/Avatar/Variants/Size',
  component: Avatar,
  parameters: {
    docs: {
      docPage: {
        title: 'Avatar',
      },
    },
  },
};
