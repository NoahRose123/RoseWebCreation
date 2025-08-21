import React from 'react';

function ServicesSection() {
  const services = [
    {
      title: "Exterior Detail",
      price: "$75",
      description: "Complete exterior wash with professional detailing",
      features: [
        "Foam cannon pre-wash & two-bucket hand wash (scratch-free)",
        "Wheel, tire, and fender cleaning",
        "Bug & tar removal",
        "Tire dressing",
        "Streak-free glass",
        "Hand-dry with a soft microfiber towel"
      ]
    },
    {
      title: "Interior Detail",
      price: "$75",
      description: "Thorough interior cleaning and sanitization",
      features: [
        "Vacuum and dust removal",
        "Dashboard and console cleaning",
        "Seat cleaning and conditioning",
        "Door panels and trim",
        "Air freshener application"
      ]
    },
    {
      title: "Full Detail",
      price: "$140",
      description: "Complete interior and exterior detailing package",
      features: [
        "All exterior services",
        "All interior services",
        "Engine bay cleaning",
        "Trunk cleaning",
        "Premium finish protection"
      ],
      popular: true
    }
  ];

  const addOns = [
    {
      title: "Clay Bar + Wax",
      price: "+$40",
      description: "Deep smoothness and gloss"
    },
    {
      title: "Clay Bar + Ceramic Sealant",
      price: "+$70",
      description: "Extended protection (6-12 months)"
    },
    {
      title: "Interior Ceramic Seat Sealant",
      price: "+$30",
      description: "Protect seats from stains and spills"
    },
    {
      title: "Pet Hair Removal",
      price: "+$15",
      description: "Thorough pet hair removal from all surfaces"
    }
  ];

  const vehicleSurcharges = [
    { type: "Sedan", surcharge: "Base Price" },
    { type: "Midsize", surcharge: "+$25" },
    { type: "SUV/Truck", surcharge: "+$50" }
  ];

  return (
    <section className="section-padding bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Professional detailing packages tailored to your vehicle's needs
          </p>
        </div>

        {/* Main Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`card relative group hover:scale-105 transition-transform duration-300 ${service.popular ? 'ring-2 ring-blue-500' : ''}`}
            >
              {service.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{service.title}</h3>
                <div className="text-5xl font-bold text-blue-400 mb-4">{service.price}</div>
                <p className="text-gray-300 mb-6">{service.description}</p>
                <ul className="text-left space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-white text-center mb-8">Add-on Services</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                <h4 className="text-lg font-semibold text-white mb-2">{addon.title}</h4>
                <div className="text-2xl font-bold text-blue-400 mb-3">{addon.price}</div>
                <p className="text-gray-300 text-sm">{addon.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Surcharges */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-8">Vehicle Type Surcharges</h3>
          <div className="max-w-2xl mx-auto">
            <div className="card">
              <div className="grid grid-cols-1 gap-4">
                {vehicleSurcharges.map((vehicle, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-700 last:border-b-0">
                    <span className="font-medium text-white">{vehicle.type}</span>
                    <span className="text-blue-400 font-semibold">{vehicle.surcharge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
