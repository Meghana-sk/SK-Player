import "./navbar.css";

export const Navbar = () => {
  return (
    <nav className="bg-dark">
      <div className="brand-name">SK Player</div>
      <input type="text" placeholder="Search videos" />
      <div className="user-section">
        <span className="user-name">Hi, Meghana</span>
        <i className="fas fa-user"></i>
      </div>
    </nav>
  );
};
