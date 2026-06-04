import React from "react";

const Copyright: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="border-t border-white/10 px-6 py-6">
      <p className="mx-auto max-w-7xl text-center text-xs text-slate-400">
        &copy; {currentYear} DOST-STII. All rights reserved.
      </p>
    </div>
  );
};

export default Copyright;
