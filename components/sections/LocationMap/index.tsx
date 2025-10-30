export default function LocationMap() {
  return (
    <section className="relative bg-gray-50 py-20 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Where We Are Located
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Visit the <span className="font-semibold text-blue-700">Department of Science and Technology – Science and Technology Information Institute (DOST–STII)</span> headquarters and explore our S&T resources firsthand.
        </p>

        {/* Google Map Embed */}
        <div className="w-full h-[450px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <iframe
            title="DOST-STII Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.894077658463!2d121.04713797587307!3d14.490769579754666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf12326f4957%3A0xe269f8b3b850bc95!2sDOST-%20Science%20and%20Technology%20Information%20Institute%20(STII)!5e0!3m2!1sen!2sph!4v1761804971754!5m2!1sen!2sph"
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Address / Contact Info */}
        <div className="mt-10 text-gray-700 text-base">
          <p className="font-semibold text-lg text-gray-800 mb-1">
            📍 DOST-STII Main Office
          </p>
          <p>Science Heritage Building, DOST Compound, Gen. Santos Ave., Bicutan, Taguig City, Philippines</p>
          <p className="mt-3">
            ☎️ <span className="font-medium">(+632) 8837-2071 to 82</span> local 2124-2128  
            <br />
            📧 <a href="mailto:info@stii.dost.gov.ph" className="text-blue-700 hover:underline">info@stii.dost.gov.ph</a>
          </p>
        </div>
      </div>
    </section>
  );
}
