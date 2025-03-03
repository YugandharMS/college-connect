import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { Link } from 'react-router-dom';
import { User, Calendar, Clock, BookOpen, LogOut, Shield, Sun, Moon } from "lucide-react";
import { useState } from "react";
import StudentAttendance from "./Student-Attendance"

const DashboardPage = () => {
	const { user, logout } = useAuthStore();
	const [isDarkTheme, setIsDarkTheme] = useState(true);

	const handleLogout = () => {
		logout();
	};

	const toggleTheme = () => {
		setIsDarkTheme(!isDarkTheme);
	};

	return (
		<div className={isDarkTheme ? "bg-gray-900 min-h-screen" : "bg-gray-100 min-h-screen"}>
			<div className="relative max-w-4xl w-full mx-auto pt-10 px-4">
				{/* Theme Toggle Button - Fixed position */}
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={toggleTheme}
					className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
						isDarkTheme 
							? "bg-gray-700 text-yellow-300 hover:bg-gray-600" 
							: "bg-blue-100 text-blue-800 hover:bg-blue-200"
					}`}
				>
					{isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
				</motion.button>
				
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.9 }}
					transition={{ duration: 0.5 }}
					className={`w-full p-8 rounded-xl shadow-2xl ${
						isDarkTheme 
							? "bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg border border-gray-800" 
							: "bg-white border border-gray-200"
					}`}
				>
					<div className="flex flex-col md:flex-row gap-8">
						{/* Left Side - Profile Info */}
						<div className="md:w-1/3">
							<div className="flex justify-center mb-6">
								<div className={`w-32 h-32 rounded-full flex items-center justify-center text-white text-4xl font-bold ${
									isDarkTheme 
										? "bg-gradient-to-r from-purple-400 to-blue-500" 
										: "bg-gradient-to-r from-blue-400 to-indigo-500"
								}`}>
									{user.name ? user.name.charAt(0).toUpperCase() : "U"}
								</div>
							</div>
							
							<motion.div
								className={`p-6 rounded-lg ${
									isDarkTheme 
										? "bg-gray-800 bg-opacity-50 border border-gray-700" 
										: "bg-gray-50 border border-gray-200"
								}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.2 }}
							>
								<h3 className={`text-xl font-semibold mb-4 flex items-center ${
									isDarkTheme ? "text-blue-400" : "text-blue-600"
								}`}>
									<User className="w-5 h-5 mr-2" /> Profile Information
								</h3>
								<div className="space-y-3">
									<p className={`pb-3 border-b ${
										isDarkTheme ? "text-gray-300 border-gray-700" : "text-gray-700 border-gray-200"
									}`}>
										<span className="font-semibold">Name:</span> {user.name}
									</p>
									<p className={`pb-3 border-b ${
										isDarkTheme ? "text-gray-300 border-gray-700" : "text-gray-700 border-gray-200"
									}`}>
										<span className="font-semibold">Email:</span> {user.email}
									</p>
									<p className={isDarkTheme ? "text-gray-300" : "text-gray-700"}>
										<span className="font-semibold">Role:</span> 
										<span className={`px-2 py-1 rounded-full text-sm ${
											isDarkTheme 
												? "bg-blue-500 bg-opacity-20 text-blue-300" 
												: "bg-blue-100 text-blue-700"
										}`}>
											{user.role}
										</span>
									</p>
								</div>
							</motion.div>
							
							<motion.div
								className={`p-6 rounded-lg mt-4 ${
									isDarkTheme 
										? "bg-gray-800 bg-opacity-50 border border-gray-700" 
										: "bg-gray-50 border border-gray-200"
								}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}
							>
								<h3 className={`text-xl font-semibold mb-4 flex items-center ${
									isDarkTheme ? "text-blue-400" : "text-blue-600"
								}`}>
									<Clock className="w-5 h-5 mr-2" /> Account Activity
								</h3>
								<div className="space-y-3">
									<p className={`pb-3 border-b flex items-center ${
										isDarkTheme 
											? "text-gray-300 border-gray-700" 
											: "text-gray-700 border-gray-200"
									}`}>
										<Calendar className={`w-4 h-4 mr-2 ${
											isDarkTheme ? "text-gray-400" : "text-gray-500"
										}`} />
										<span className='font-semibold'>Joined: </span>
										<span className="ml-2">
											{new Date(user.createdAt).toLocaleDateString("en-US", {
												year: "numeric",
												month: "long",
												day: "numeric",
											})}
										</span>
									</p>
									<p className={`flex items-center ${
										isDarkTheme ? "text-gray-300" : "text-gray-700"
									}`}>
										<Clock className={`w-4 h-4 mr-2 ${
											isDarkTheme ? "text-gray-400" : "text-gray-500"
										}`} />
										<span className='font-semibold'>Last Login: </span>
										<span className="ml-2">{formatDate(user.lastLogin)}</span>
									</p>
								</div>
							</motion.div>
						</div>
						
						{/* Right Side - Actions and Stats */}
						<div className="md:w-2/3">
							<h2 className={`text-3xl font-bold mb-6 text-center ${
								isDarkTheme 
									? "bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text" 
									: "bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text"
							}`}>
								Welcome, {user.name}!
							</h2>
							
							<motion.div
								className={`p-6 rounded-lg mb-6 ${
									isDarkTheme 
										? "bg-gray-800 bg-opacity-50 border border-gray-700" 
										: "bg-gray-50 border border-gray-200"
								}`}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.3 }}
							>
								<h3 className={`text-xl font-semibold mb-4 flex items-center ${
									isDarkTheme ? "text-blue-400" : "text-blue-600"
								}`}>
									<Shield className="w-5 h-5 mr-2" /> Account Status
								</h3>
								<div className="grid grid-cols-2 gap-4">
									<div className={`p-4 rounded-lg ${
										isDarkTheme 
											? "bg-gray-700 bg-opacity-40 border border-gray-600" 
											: "bg-blue-50 border border-blue-100"
									}`}>
										<p className={isDarkTheme ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Account Type</p>
										<p className={`font-semibold text-lg capitalize ${
											isDarkTheme ? "text-white" : "text-gray-800"
										}`}>
											{user.role}
										</p>
									</div>
									<div className={`p-4 rounded-lg ${
										isDarkTheme 
											? "bg-gray-700 bg-opacity-40 border border-gray-600" 
											: "bg-blue-50 border border-blue-100"
									}`}>
										<p className={isDarkTheme ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Status</p>
										<p className="text-green-500 font-semibold text-lg">Active</p>
									</div>
									<div className={`p-4 rounded-lg ${
										isDarkTheme 
											? "bg-gray-700 bg-opacity-40 border border-gray-600" 
											: "bg-blue-50 border border-blue-100"
									}`}>
										<p className={isDarkTheme ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Account Age</p>
										<p className={`font-semibold text-lg ${
											isDarkTheme ? "text-white" : "text-gray-800"
										}`}>
											{Math.floor((new Date() - new Date(user.createdAt)) / (1000 * 60 * 60 * 24))} days
										</p>
									</div>
									<div className={`p-4 rounded-lg ${
										isDarkTheme 
											? "bg-gray-700 bg-opacity-40 border border-gray-600" 
											: "bg-blue-50 border border-blue-100"
									}`}>
										<p className={isDarkTheme ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Roll no</p>
										<p className={`font-semibold text-lg ${
											isDarkTheme ? "text-white" : "text-gray-800"
										}`}>
											6
										</p>
									</div>
								</div>
							</motion.div>
							
							<div className="space-y-4">
								<StudentAttendance/>
								
								
								{user.role === "teacher" && (
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.6 }}
									>
										<Link to='/attendance'>
											<motion.button
												whileHover={{ scale: 1.03 }}
												whileTap={{ scale: 0.97 }}
												className={`w-full py-4 px-6 text-white font-bold rounded-lg shadow-lg 
												focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${
													isDarkTheme 
														? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:ring-blue-500 focus:ring-offset-gray-900" 
														: "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-400 focus:ring-offset-white"
												}`}
											>
												<Calendar className="w-5 h-5 mr-2" />
												Take Attendance
											</motion.button>
										</Link>
									</motion.div>
								)}
								
								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.7 }}
								>
									<motion.button
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
										onClick={handleLogout}
										className={`w-full py-4 px-6 text-white font-bold rounded-lg shadow-lg 
										focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center justify-center ${
											isDarkTheme 
												? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 focus:ring-red-500 focus:ring-offset-gray-900" 
												: "bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 focus:ring-red-400 focus:ring-offset-white"
										}`}
									>
										<LogOut className="w-5 h-5 mr-2" />
										Logout
									</motion.button>
								</motion.div>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default DashboardPage;