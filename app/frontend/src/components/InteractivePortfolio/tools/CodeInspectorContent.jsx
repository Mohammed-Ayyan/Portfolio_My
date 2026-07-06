import { motion } from "framer-motion";
import { Copy, Check } from "@phosphor-icons/react";
import { useState } from "react";

const codeSnippets = {
  appointment: {
    component: `// React Component - Appointment Form
const AppointmentForm = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const handleBooking = async (data) => {
    const response = await api.post('/api/bookings', data);
    return response.data;
  };

  return (
    <div className="appointment-form">
      <h2>Book Your Appointment</h2>
      {slots.map(slot => (
        <TimeSlot key={slot.id} slot={slot} />
      ))}
      <BookingButton onClick={handleBooking} />
    </div>
  );
};`,
    api: `// Node.js/Express - Booking API Endpoint
app.post('/api/bookings', authenticate, async (req, res) => {
  const { serviceId, slotId, customerData } = req.body;

  // Validate booking
  const slot = await TimeSlot.findById(slotId);
  if (!slot.available) {
    return res.status(409).json({ error: 'Slot unavailable' });
  }

  // Create booking
  const booking = new Booking({
    service: serviceId,
    slot: slotId,
    customer: customerData,
    status: 'confirmed',
  });

  await booking.save();
  res.json({ booking, confirmationId: booking._id });
});`,
    database: `// MongoDB - Booking Schema
const bookingSchema = new Schema({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'TimeSlot',
    required: true,
  },
  customer: {
    name: String,
    email: String,
    phone: String,
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});`,
  },
  "real-estate": {
    component: `// React Component - Property Listing
const PropertyCard = ({ property }) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    api.post(\`/api/saved/\${property._id}\`);
    setIsSaved(!isSaved);
  };

  return (
    <motion.div className="property-card">
      <ImageGallery images={property.images} />
      <PropertyInfo property={property} />
      <PriceDisplay price={property.price} />
      <ActionButtons 
        onSave={handleSave} 
        isSaved={isSaved}
      />
    </motion.div>
  );
};`,
    api: `// Node.js - Property Search with Filters
app.get('/api/properties', async (req, res) => {
  const { city, priceMin, priceMax, beds, baths } = req.query;

  let query = {};
  if (city) query.city = city;
  if (priceMin) query.price = { $gte: priceMin };
  if (priceMax) query.price = { ...query.price, $lte: priceMax };
  if (beds) query.bedrooms = beds;
  if (baths) query.bathrooms = baths;

  const properties = await Property.find(query)
    .select('_id title price city images')
    .lean();

  res.json({ count: properties.length, properties });
});`,
    database: `// MongoDB - Property Schema
const propertySchema = new Schema({
  title: String,
  description: String,
  price: Number,
  city: String,
  address: String,
  images: [String],
  bedrooms: Number,
  bathrooms: Number,
  sqft: Number,
  amenities: [String],
  owner: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});`,
  },
};

export default function CodeInspectorContent({ selectedProject }) {
  const [copiedCode, setCopiedCode] = useState(null);

  const snippets = codeSnippets[selectedProject?.id] || codeSnippets.appointment;

  const handleCopy = (key) => {
    navigator.clipboard.writeText(snippets[key]);
    setCopiedCode(key);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="code-inspector-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Code Inspector / Source Analysis
        </div>
        <p className="text-base text-[#A9A69F]">
          Explore the implementation details: component architecture, API
          endpoints, and database schemas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(snippets).map(([type, code], index) => (
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-[#E8E8E3]/10 rounded bg-[#101014] overflow-hidden"
          >
            <div className="bg-[#0B0B0D] border-b border-[#E8E8E3]/10 px-4 py-3 flex items-center justify-between">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D97736]">
                {type === "component" && "React Component"}
                {type === "api" && "API Endpoint"}
                {type === "database" && "Database Schema"}
              </div>
              <button
                onClick={() => handleCopy(type)}
                className="p-1.5 rounded hover:bg-[#E8E8E3]/10 transition-colors"
              >
                {copiedCode === type ? (
                  <Check size={16} className="text-green-500" />
                ) : (
                  <Copy size={16} className="text-[#8A8A93]" />
                )}
              </button>
            </div>

            <pre className="p-4 overflow-x-auto">
              <code className="text-[11px] leading-relaxed font-mono text-[#A9A69F]">
                {code}
              </code>
            </pre>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-2">
          Implementation Highlights
        </div>
        <ul className="space-y-2 text-sm text-[#A9A69F]">
          <li>✓ JWT authentication for secure API routes</li>
          <li>✓ MongoDB schema with proper indexing</li>
          <li>✓ Error handling and validation middleware</li>
          <li>✓ Optimized database queries</li>
          <li>✓ CORS-enabled for production</li>
        </ul>
      </motion.div>
    </div>
  );
}
