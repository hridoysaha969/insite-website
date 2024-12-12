const MaxWidthWrapper = ({ children }) => {
  return (
    <div className="xl:max-w-[1200px] lg:max-w-[1000px] md:max-w-5xl max-w-[98%] mx-auto px-2 md:px-4">
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
