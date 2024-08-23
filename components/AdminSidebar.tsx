const AdminSidebar = () => {
  return (
    <div className="w-64 bg-sky-700 text-white h-screen p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
      <ul>
        <li className="mb-4">
          <a href="/admin/hero" className="block p-3 rounded-lg hover:bg-sky-800">
            Hero
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/about" className="block p-3 rounded-lg hover:bg-sky-800">
            About
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/projectdata" className="block p-3 rounded-lg hover:bg-sky-800">
            Project Data
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/projectSection" className="block p-3 rounded-lg hover:bg-sky-800">
            Project Section
          </a>
        </li>
        <li className="mb-4">
          <a href="/admin/settings" className="block p-3 rounded-lg hover:bg-sky-800">
            Settings
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
