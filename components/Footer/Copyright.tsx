import Link from "next/link";
import React from "react";
import Image from "next/image";

const Copyright: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 mt-10 text-center">
      <Link prefetch={false} href="/">
        <Image
          src="/images/footer_logo.png"
          alt="DOST Footer Logo"
          width={540}      // Adjust width as needed
          height={100}      // Adjust height as needed
          className="mb-4"
          priority          // ensures logo loads quickly
        />
      </Link>

      <p className="text-xs text-gray-300">
        &copy; 2024 DOST - All Rights Reserved.
      </p>
    </div>
  );
};

export default Copyright;
