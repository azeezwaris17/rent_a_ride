// src/components/admin/dashboard/AdminFooter.js
const AdminFooter = () => {
  return (
    <footer className="bg-green-600 p-4 text-white mt-8">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} RentARide. All rights reserved.
      </div>
    </footer>
  );
};

export default AdminFooter;
