import * as React from 'react';
import { Avatar } from '@/index';

// CSF format story
export const withSvg = () => {
  const withTooltip = true;
  const firstName = 'John';
  const lastName = 'Doe';

  const options = {
    withTooltip,
    firstName,
    lastName,
  };

  return (
    <Avatar {...options}>
      <Avatar.Image>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
          <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </Avatar.Image>
    </Avatar>
  );
};

export default {
  title: 'Components/Avatar/Avatar/With Svg',
  component: Avatar,
  subcomponents: { 'Avatar.Image': Avatar.Image, 'Avatar.Icon': Avatar.Icon },
};
