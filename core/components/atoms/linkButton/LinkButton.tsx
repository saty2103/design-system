import * as React from 'react';
import classNames from 'classnames';
import { BaseProps, BaseHtmlProps } from '@/utils/types';
import { Icon } from '@/index';

export type ButtonType = 'button' | 'submit' | 'reset';
export type LinkButtonSize = 'tiny' | 'regular';
export type IconAlignment = 'left' | 'right';

export interface LinkButtonProps extends BaseProps, BaseHtmlProps<HTMLButtonElement> {
  /**
   * Type of `Link Button`
   */
  type?: ButtonType;
  /**
   * The size of `Link Button`
   * @default "regular"
   */
  size?: LinkButtonSize;
  /**
   * Disables the `Button`, making it unable to be pressed
   */
  disabled?: boolean;
  /**
   * Name of icon that is to be added inside `Button`
   * Material icon name
   */
  icon?: string;
  /**
   * Align icon left or right
   * @default "left"
   */
  iconAlign?: IconAlignment;
  /**
   * Text to be added inside `Button`
   */
  children: React.ReactText;
  /**
   * Specifies tab index of `Button`
   * @default 0
   */
  tabIndex?: number;
  /**
   * Specifies autoFocus on render
   */
  autoFocus?: boolean;
  /**
   * Display `subtle` appearance
   */
  subtle?: boolean;
  /**
   * Handler to be called when `Button` is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Handler to be called when mouse pointer enters `Button`.
   */
  onMouseEnter?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  /**
   * Handler to be called when mouse pointer leaves `Button`.
   */
  onMouseLeave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const sizeMapping: Record<LinkButtonSize, number> = {
  tiny: 12,
  regular: 16,
};

export const LinkButton = React.forwardRef<HTMLButtonElement, LinkButtonProps>((props, ref) => {
  const { children, type, className, disabled, tabIndex, icon, subtle, size, iconAlign, ...rest } = props;

  const buttonClass = classNames({
    ['LinkButton']: true,
    [`LinkButton--${size}`]: size,
    ['LinkButton--default']: !subtle,
    ['LinkButton--subtle']: subtle,
    [`LinkButton--iconAlign-${iconAlign}`]: children && iconAlign,
    [`${className}`]: className,
  });

  const iconClass = classNames({
    ['LinkButton-icon']: true,
    [`LinkButton-icon--${iconAlign}`]: children && iconAlign,
  });

  return (
    <button
      ref={ref}
      type={type}
      data-test="DesignSystem-LinkButton"
      className={buttonClass}
      disabled={disabled}
      tabIndex={tabIndex}
      {...rest}
    >
      <>
        {icon && (
          <div className={iconClass}>
            <Icon data-test="DesignSystem-LinkButton--Icon" name={icon} size={size && sizeMapping[size]} />
          </div>
        )}
        {children}
      </>
    </button>
  );
});

LinkButton.displayName = 'LinkButton';
LinkButton.defaultProps = {
  size: 'regular',
  type: 'button',
  iconAlign: 'left',
};

export default LinkButton;
