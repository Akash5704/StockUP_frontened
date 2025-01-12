import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { TrendingUp, DollarSign, User, Mail } from 'lucide-react';

const Profile = () => {
    const [userDetails, setUserDetails] = useState(null);

    const getUserFromToken = () => {
        const token = sessionStorage.getItem("User");
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Failed to decode token:", error);
            return null;
        }
    };

    useEffect(() => {
        const user = getUserFromToken();
        if (user) {
            setUserDetails(user);
        }
    }, []);

    if (!userDetails) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                <div className="text-center p-8 bg-white rounded-xl shadow-lg transform transition-all hover:scale-105 w-full max-w-md">
                    <TrendingUp className="w-16 h-16 text-indigo-600 mx-auto mb-6" />
                    <p className="text-2xl font-semibold text-gray-800">Please log in to view your profile</p>
                    <p className="mt-2 text-gray-600">Access your personal information and settings</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="px-6 py-8 sm:p-10">
                        <div className="flex items-center gap-4 mb-8">
                            <User className="w-12 h-12 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <DollarSign className="w-6 h-6 text-green-600" />
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="text-gray-500">Name:</span> {userDetails.name || 'N/A'}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-blue-600" />
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="text-gray-500">Email:</span> {userDetails.email || 'N/A'}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <TrendingUp className="w-6 h-6 text-purple-600" />
                                <p className="text-lg font-medium text-gray-800">
                                    <span className="text-gray-500">Portfolio Value:</span> ${userDetails.total || 'N/A'}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 text-right">
                            <button className="px-6 py-3 text-white bg-indigo-600 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
