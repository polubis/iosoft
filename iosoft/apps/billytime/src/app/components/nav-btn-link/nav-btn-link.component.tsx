import { Link, To, useMatch, useResolvedPath } from 'react-router-dom';
import { NavBtn, NavBtnProps } from '../../ui';

interface NavBtnLinkComponentProps
  extends Pick<NavBtnProps, 'children' | 'title'> {
  to: To;
}

export const NavBtnLinkComponent = ({
  to,
  title,
  children,
}: NavBtnLinkComponentProps) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link to={to}>
      <NavBtn active={!!match} title={title}>
        {children}
      </NavBtn>
    </Link>
  );
};
