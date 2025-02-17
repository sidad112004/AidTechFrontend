import React, { use, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import axios from 'axios';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);


function Profile() {
  // Sample user data; in a real app, this data would be fetched from an API or context.
  const [data,setdata]=useState({});
  const getdata=async()=>{
    try {
         const res=await axios.post("http://localhost:8080/api/get-data",{},{withCredentials:true})
         
         setdata(res);
         console.log("new",res);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    getdata();
  },[])
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    coins: 200,
    totalTasks: 23,      // Total tasks (including completed, pending, and canceled)
    completedTasks: 15,
    pendingTasks: 5,
    canceledTasks: 3,
  };

  // Data for the doughnut chart representing task distribution
  const tasksDoughnutData = {
    labels: ['Completed', 'Pending', 'Canceled'],
    datasets: [
      {
        data: [user.completedTasks, user.pendingTasks, user.canceledTasks],
        backgroundColor: ['#34D399', '#FBBF24', '#F87171'], // green, amber, red
        hoverBackgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      },
    ],
  };

  // Data for the bar chart representing task counts
  const tasksBarData = {
    labels: ['Total Tasks', 'Completed', 'Pending', 'Canceled'],
    datasets: [
      {
        label: 'Tasks',
        data: [user.totalTasks, user.completedTasks, user.pendingTasks, user.canceledTasks],
        backgroundColor: ['#60A5FA', '#34D399', '#FBBF24', '#F87171'], // blue, green, amber, red
      },
    ],
  };

  // Logout handler (replace with your actual logout logic)
  const handleLogout = () => {
    console.log('User logged out');
    // e.g., clear tokens, redirect to login page, etc.
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Information Card */}
        <div className="card bg-gray-800 shadow-xl rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">{user.name}</h1>
              <p className="mt-2">Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p className="mt-2">
                Coins: <span className="font-bold text-green-400">{user.coins}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button onClick={handleLogout} className="btn btn-error">
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Card */}
        <div className="card bg-gray-800 shadow-xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Doughnut Chart for Task Distribution */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Task Distribution</h2>
            <div className="w-full h-64">
              <Doughnut data={tasksDoughnutData} />
            </div>
          </div>
          {/* Bar Chart for Task Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Task Overview</h2>
            <div className="w-full h-64">
              <Bar
                data={tasksBarData}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: { color: 'white' },
                    },
                    x: {
                      ticks: { color: 'white' },
                    },
                  },
                  plugins: {
                    legend: { labels: { color: 'white' } },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
