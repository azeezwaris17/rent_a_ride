const Footer = () => {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-8">
      <div className="container mx-auto text-center">
        © {new Date().getFullYear()} RentARide. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
