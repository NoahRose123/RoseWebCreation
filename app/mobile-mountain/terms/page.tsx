export default function MobileMountainTermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-gray-300 mb-4">
              By accessing and using Mobile Mountain Detail's services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
            <p className="text-gray-300">
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
            <p className="text-gray-300 mb-4">
              Mobile Mountain Detail provides professional mobile car detailing services, including:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Basic car wash and detailing</li>
              <li>Premium interior and exterior detailing</li>
              <li>Paint correction and ceramic coating</li>
              <li>Mobile service at your location</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Booking and Cancellation</h2>
            <p className="text-gray-300 mb-4">
              Booking terms are as follows:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Appointments must be booked at least 24 hours in advance</li>
              <li>Cancellations must be made at least 4 hours before the scheduled appointment</li>
              <li>Late cancellations may result in a cancellation fee</li>
              <li>We reserve the right to reschedule due to weather conditions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
            <p className="text-gray-300 mb-4">
              Payment terms are as follows:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Payment is due upon completion of services</li>
              <li>We accept cash, credit cards, and digital payments</li>
              <li>Prices are subject to change without notice</li>
              <li>Additional fees may apply for special requests or conditions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Customer Responsibilities</h2>
            <p className="text-gray-300 mb-4">
              Customers are responsible for:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Providing accurate contact and vehicle information</li>
              <li>Ensuring the vehicle is accessible at the scheduled time</li>
              <li>Removing personal items from the vehicle before service</li>
              <li>Providing a safe and suitable location for detailing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Liability and Warranty</h2>
            <p className="text-gray-300 mb-4">
              Mobile Mountain Detail:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">
              <li>Uses professional-grade products and equipment</li>
              <li>Carries appropriate insurance coverage</li>
              <li>Will address any issues promptly and professionally</li>
              <li>Is not responsible for pre-existing damage to vehicles</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Privacy and Data</h2>
            <p className="text-gray-300">
              Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-gray-300">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 text-gray-300">
              <p>Email: info@mobilemountain.com</p>
              <p>Phone: (555) 123-4567</p>
              <p>Address: Denver Metro Area, Colorado</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
