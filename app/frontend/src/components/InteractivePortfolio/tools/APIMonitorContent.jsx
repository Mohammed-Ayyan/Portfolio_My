import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, XCircle } from "@phosphor-icons/react";

const apiEndpoints = [
  {
    id: 1,
    method: "GET",
    endpoint: "/api/services",
    status: 200,
    description: "Fetch all available services",
    example: "Retrieves list of bookable services",
  },
  {
    id: 2,
    method: "POST",
    endpoint: "/api/bookings",
    status: 201,
    description: "Create new appointment booking",
    example: "Returns booking confirmation with ID",
  },
  {
    id: 3,
    method: "GET",
    endpoint: "/api/bookings/:id",
    status: 200,
    description: "Get booking details",
    example: "Returns full booking information",
  },
  {
    id: 4,
    method: "PUT",
    endpoint: "/api/bookings/:id",
    status: 200,
    description: "Update existing booking",
    example: "Reschedule or modify booking details",
  },
  {
    id: 5,
    method: "DELETE",
    endpoint: "/api/bookings/:id",
    status: 204,
    description: "Cancel appointment",
    example: "Soft delete with status update",
  },
  {
    id: 6,
    method: "POST",
    endpoint: "/api/auth/login",
    status: 200,
    description: "User authentication",
    example: "Returns JWT token for session",
  },
];

const getMethodColor = (method) => {
  const colors = {
    GET: "#4CAF50",
    POST: "#2196F3",
    PUT: "#FFC107",
    DELETE: "#F44336",
  };
  return colors[method] || "#999";
};

const getStatusIcon = (status) => {
  return status >= 200 && status < 300 ? (
    <CheckCircle size={16} weight="fill" className="text-green-500" />
  ) : (
    <XCircle size={16} weight="fill" className="text-red-500" />
  );
};

export default function APIMonitorContent({ selectedProject }) {
  return (
    <div className="api-monitor-content">
      <div className="mb-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#D97736] mb-3">
          API Monitor / REST Endpoints
        </div>
        <p className="text-base text-[#A9A69F] max-w-2xl">
          Monitor and explore all REST API endpoints used in your MERN
          applications. View request/response patterns and authentication flows.
        </p>
      </div>

      {/* API Endpoints List */}
      <div className="space-y-3 mb-12">
        {apiEndpoints.map((endpoint, index) => (
          <motion.div
            key={endpoint.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="border border-[#E8E8E3]/10 rounded p-4 hover:bg-[#E8E8E3]/3 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="px-2 py-1 rounded font-mono text-[10px] font-bold text-white"
                  style={{ backgroundColor: getMethodColor(endpoint.method) }}
                >
                  {endpoint.method}
                </div>
                <code className="font-mono text-[12px] text-[#E8E8E3]">
                  {endpoint.endpoint}
                </code>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(endpoint.status)}
                <span className="font-mono text-[11px] text-[#8A8A93]">
                  {endpoint.status}
                </span>
              </div>
            </div>

            <p className="text-[12px] text-[#A9A69F] mb-2">
              {endpoint.description}
            </p>
            <p className="text-[11px] text-[#7A7A82]">
              Example: {endpoint.example}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Request/Response Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="border border-[#D97736]/20 bg-[#D97736]/5 rounded p-6 grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-3">
            Request Example
          </div>
          <pre className="bg-[#0B0B0D] border border-[#E8E8E3]/10 rounded p-4 text-[11px] text-[#A9A69F] overflow-x-auto">
            {`POST /api/bookings HTTP/1.1
Content-Type: application/json
Authorization: Bearer <jwt_token>

{
  "serviceId": "60d5ec49c1234567890abcde",
  "slotId": "60d5f12dc9876543210fedcba",
  "customerData": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
          </pre>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#D97736] mb-3">
            Response Example
          </div>
          <pre className="bg-[#0B0B0D] border border-[#E8E8E3]/10 rounded p-4 text-[11px] text-[#A9A69F] overflow-x-auto">
            {`HTTP/1.1 201 Created
Content-Type: application/json

{
  "booking": {
    "_id": "60d5f5a9e123456789abcdef",
    "service": "60d5ec49c1234567890abcde",
    "slot": "60d5f12dc9876543210fedcba",
    "customer": { ... },
    "status": "confirmed",
    "createdAt": "2024-06-25T10:30:00Z"
  },
  "confirmationId": "BOOK-001-60d5f5a9"
}`}
          </pre>
        </div>
      </motion.div>

      {/* API Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          {
            title: "Authentication",
            desc: "JWT-based secure endpoints",
          },
          {
            title: "Validation",
            desc: "Input validation on all routes",
          },
          {
            title: "Error Handling",
            desc: "Consistent error response format",
          },
        ].map((feature, i) => (
          <div key={i} className="border border-[#E8E8E3]/10 rounded p-4">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D97736] mb-1">
              {feature.title}
            </h4>
            <p className="text-[12px] text-[#A9A69F]">{feature.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
