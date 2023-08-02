import * as React from 'react';
import classNames from 'classnames';
import { Text, Icon, Pills, Tooltip } from '@/index';
import { BaseProps, extractBaseProps } from '@/utils/types';
import { getNavItemColor, getPillsAppearance, Menu } from '@/utils/navigationHelper';
import { TextColor } from '@/common.type';
export interface MenuItemProps extends BaseProps {
  menu: Menu;
  isActive: boolean;
  rounded?: boolean;
  expanded?: boolean;
  hasSubmenu?: boolean;
  isChildren?: boolean;
  isChildrenVisible?: boolean;
  onClick?: (menu: Menu) => void;
  customItemRenderer?: (props: MenuItemProps) => JSX.Element;
}
interface MenuPillsProps {
  isActive: boolean;
  disabled?: boolean;
  count: number | string;
}

interface MenuLabelProps {
  label: string;
  labelColor: TextColor;
}

interface MenuIconProps {
  isChildrenVisible?: boolean;
}

const MenuIcon = (props: MenuIconProps) => {
  const { isChildrenVisible } = props;
  return <Icon className="mx-4" name={isChildrenVisible ? 'keyboard_arrow_up' : 'keyboard_arrow_down'} />;
};

const MenuPills = (props: MenuPillsProps) => {
  const { disabled, isActive, count } = props;

  const PillsClass = classNames({
    ['MenuItem-count']: true,
    ['MenuItem-count--disabled']: disabled,
  });

  return (
    <Pills
      subtle={disabled}
      className={PillsClass}
      appearance={getPillsAppearance(isActive)}
      data-test="DesignSystem-VerticalNav--Pills"
    >
      {count}
    </Pills>
  );
};

export const MenuItem = (props: MenuItemProps) => {
  const { menu, isActive, expanded, rounded, hasSubmenu, isChildren, isChildrenVisible, onClick, customItemRenderer } =
    props;

  const [isTextTruncated, setIsTextTruncated] = React.useState(false);
  const { detectTruncation } = Tooltip.useAutoTooltip();
  const contentRef = React.createRef<HTMLElement>();

  React.useEffect(() => {
    const isTruncated = detectTruncation(contentRef);
    setIsTextTruncated(isTruncated);
  }, [contentRef]);

  const MenuLabel = (props: MenuLabelProps) => {
    const { label, labelColor } = props;
    return (
      <Text
        data-test="DesignSystem-VerticalNav--Text"
        ref={contentRef}
        color={labelColor}
        className={`MenuItem-Text MenuItem--overflow ${hasSubmenu || menu.count !== undefined ? '' : 'mr-5'}`}
      >
        {label}
      </Text>
    );
  };

  const onClickHandler = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    if (onClick) onClick(menu);
  };

  const onKeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onClickHandler(event);
    }
  };

  const baseProps = {
    onClick: onClickHandler,
    href: menu.link,
    tabIndex: 0,
    ...extractBaseProps(props),
  };

  const itemColor = getNavItemColor(isActive, menu.disabled);

  const ItemClass = classNames({
    ['MenuItem']: true,
    ['MenuItem--vertical']: true,
    ['MenuItem--collapsed']: !expanded,
    ['MenuItem--expanded']: expanded,
    ['MenuItem--active']: isActive,
    ['MenuItem--disabled']: menu.disabled,
    ['MenuItem--subMenu']: isChildren && expanded,
    ['MenuItem--rounded']: rounded && expanded,
    [`color-${itemColor}`]: true,
  });

  const renderSubMenu = () => {
    if (hasSubmenu) {
      return <MenuIcon isChildrenVisible={isChildrenVisible} />;
    }

    if (menu.count !== undefined) {
      const count = menu.count > 99 ? '99+' : menu.count;
      return <MenuPills disabled={menu.disabled} isActive={isActive} count={count} />;
    }
    return null;
  };

  if (!expanded && !menu.icon) return null;

  const customItemProps = {
    ...props,
    contentRef,
    MenuIcon: () => MenuIcon({ isChildrenVisible }),
    MenuLabel: () => MenuLabel({ label: menu.label, labelColor: itemColor }),
    MenuPills: () =>
      menu.count !== undefined ? MenuPills({ disabled: menu.disabled, isActive: isActive, count: menu.count }) : <></>,
  };

  return customItemRenderer ? (
    customItemRenderer(customItemProps)
  ) : (
    // TODO(a11y)
    // eslint-disable-next-line
    <Tooltip showTooltip={expanded ? isTextTruncated : true} tooltip={menu.label} position="right">
      <a
        className={ItemClass}
        {...baseProps}
        onKeyDown={onKeyDownHandler}
        role="button"
        tabIndex={menu.disabled ? -1 : 0}
      >
        <div className="d-flex align-items-center overflow-hidden">
          {menu.icon && (
            <Icon
              data-test="DesignSystem-VerticalNav--Icon"
              className={expanded ? 'mr-4' : ''}
              name={menu.icon}
              type={menu.iconType}
            />
          )}
          {expanded && <MenuLabel label={menu.label} labelColor={itemColor} />}
        </div>
        {expanded && renderSubMenu()}
      </a>
    </Tooltip>
  );
};

MenuItem.defaultProps = {
  isActive: false,
};

export default MenuItem;
