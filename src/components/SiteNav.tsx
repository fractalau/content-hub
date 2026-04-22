import { Link } from "react-router-dom";
import { NavLink } from "@/components/NavLink";

const SiteNav = () => {
  return (
    <header className="border-b">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Fractal Hub
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <NavLink
              to="/"
              end
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground font-medium"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeClassName="text-foreground font-medium"
            >
              Blog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default SiteNav;
