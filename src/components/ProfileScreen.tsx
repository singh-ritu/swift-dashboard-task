import React from "react";
import { ArrowLeft, User, Mail, Phone, Hash } from "lucide-react";
import type { User as UserType } from "../types";

interface ProfileScreenProps {
  user: UserType;
  onBackToDashboard: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  onBackToDashboard,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBackToDashboard}
          className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow text-blue-600 hover:bg-blue-50">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-blue-100">@{user.username}</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Contact Information
                  </h2>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{user.website}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Address
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      {user.address.suite} {user.address.street}
                      <br />
                      {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company and Location */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Company
                  </h2>
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-800">
                      {user.company.name}
                    </h3>
                    <p className="text-gray-600 italic">
                      "{user.company.catchPhrase}"
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {user.company.bs}
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Location
                  </h2>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <span className="font-medium">Latitude:</span>{" "}
                      {user.address.geo.lat}
                      <br />
                      <span className="font-medium">Longitude:</span>{" "}
                      {user.address.geo.lng}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
