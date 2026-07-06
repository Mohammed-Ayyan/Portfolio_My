import { motion } from "framer-motion";
import { Database, Code } from "@phosphor-icons/react";

const mongoSchemas = {
  appointment: [
    {
      name: "Bookings",
      fields: [
        { name: "_id", type: "ObjectId", required: true },
        { name: "serviceId", type: "ObjectId (ref: Services)", required: true },
        { name: "slotId", type: "ObjectId (ref: TimeSlots)", required: true },
        { name: "customerName", type: "String", required: true },
        { name: "customerEmail", type: "String", required: true },
        { name: "customerPhone", type: "String", required: true },
        { name: "status", type: "String (enum)", default: "pending" },
        { name: "createdAt", type: "Date", default: "now" },
      ],
    },
    {
      name: "Services",
      fields: [
        { name: "_id", type: "ObjectId", required: true },
        { name: "name", type: "String", required: true },
        { name: "description", type: "String" },
        { name: "duration", type: "Number (minutes)" },
        { name: "price", type: "Number" },
        { name: "isActive", type: "Boolean", default: true },
      ],
    },
    {
      name: "TimeSlots",
      fields: [
        { name: "_id", type: "ObjectId", required: true },
        { name: "serviceId", type: "ObjectId (ref: Services)", required: true },
        { name: "startTime", type: "Date", required: true },
        { name: "endTime", type: "Date", required: true },
        { name: "available", type: "Boolean", default: true },
        { name: "bookedBy", type: "ObjectId (ref: Bookings)" },
      ],
    },
  ],
  "real-estate": [
    {
      name: "Properties",
      fields: [
        { name: "_id", type: "ObjectId", required: true },
        { name: "title", type: "String", required: true },
        { name: "description", type: "String" },
        { name: "price", type: "Number", required: true },
        { name: "city", type: "String", required: true },
        { name: "address", type: "String", required: true },
        { name: "images", type: "Array[String]" },
        { name: "bedrooms", type: "Number" },
        { name: "bathrooms", type: "Number" },
        { name: "sqft", type: "Number" },
        { name: "ownerId", type: "ObjectId (ref: Users)" },
      ],
    },
    {
      name: "SavedProperties",
      fields: [
        { name: "_id", type: "ObjectId", required: true },
        { name: "userId", type: "ObjectId (ref: Users)", required: true },
        { name: "propertyId", type: "ObjectId (ref: Properties)", required: true },
        { name: "savedAt", type: "Date", default: "now" },
      ],
    },
  ],
};

export default function DatabaseViewerContent({ selectedProject }) {
  const schemas =
    mongoSchemas[selectedProject?.id] || mongoSchemas.appointment;

  return (
    <div className="database-viewer-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          Database Viewer / MongoDB Schemas
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Explore MongoDB collections and schemas. Understand data structure,
          relationships, and how information flows through your application.
        </p>
      </div>

      {/* Schemas Grid */}
      <div className="space-y-6 mb-12">
        {schemas.map((schema, schemaIndex) => (
          <motion.div
            key={schema.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: schemaIndex * 0.1 }}
            className="border border-[#E8E8E3]/10 rounded overflow-hidden bg-[#101014]"
          >
            {/* Schema Header */}
            <div className="bg-[#0B0B0D] border-b border-[#E8E8E3]/10 px-6 py-4 flex items-center gap-3">
              <Database size={18} className="text-[#D97736]" />
              <div>
                <h3 className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#D97736]">
                  Collection: {schema.name}
                </h3>
              </div>
            </div>

            {/* Fields Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E8E8E3]/10 bg-[#0B0B0D]">
                    <th className="px-6 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A93]">
                      Field
                    </th>
                    <th className="px-6 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A93]">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-[#8A8A93]">
                      Constraints
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {schema.fields.map((field, fieldIndex) => (
                    <tr
                      key={field.name}
                      className="border-b border-[#E8E8E3]/5 hover:bg-[#E8E8E3]/3 transition-colors"
                    >
                      <td className="px-6 py-3 font-mono text-[11px] text-[#E8E8E3]">
                        {field.name}
                      </td>
                      <td className="px-6 py-3 font-mono text-[11px] text-[#D97736]">
                        {field.type}
                      </td>
                      <td className="px-6 py-3">
                        <div className="space-y-1">
                          {field.required && (
                            <span className="inline-block px-2 py-1 text-[9px] rounded bg-red-500/20 text-red-400 font-mono">
                              required
                            </span>
                          )}
                          {field.default && (
                            <span className="inline-block px-2 py-1 text-[9px] rounded bg-blue-500/20 text-blue-400 font-mono ml-2">
                              default: {field.default}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Data Relationships */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-4">
          Data Relationships
        </div>
        <div className="space-y-3 text-[12px]">
          {selectedProject?.id === "appointment" ? (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  <strong>Bookings</strong> references both{" "}
                  <code className="bg-[#0B0B0D] px-2 py-1">Services</code> and{" "}
                  <code className="bg-[#0B0B0D] px-2 py-1">TimeSlots</code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  <code className="bg-[#0B0B0D] px-2 py-1">TimeSlots</code> are
                  created for each{" "}
                  <code className="bg-[#0B0B0D] px-2 py-1">Service</code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  One-to-Many relationship: One Service → Many TimeSlots → Many
                  Bookings
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  <strong>Properties</strong> owned by Users (one-to-many)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  <strong>SavedProperties</strong> junction between Users and
                  Properties (many-to-many)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D97736]">•</span>
                <span className="text-[#A9A69F]">
                  Indexes on City and Price for fast queries
                </span>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Best Practices */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: "Indexing",
            desc: "Fields like _id, serviceId, userId are indexed for fast lookups",
          },
          {
            title: "Validation",
            desc: "Schema validation ensures data integrity at the database level",
          },
          {
            title: "References",
            desc: "ObjectId references enable relationships between collections",
          },
        ].map((practice, i) => (
          <div key={i} className="border border-[#E8E8E3]/10 rounded p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D97736] mb-1">
              {practice.title}
            </h4>
            <p className="text-[12px] text-[#A9A69F]">{practice.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
