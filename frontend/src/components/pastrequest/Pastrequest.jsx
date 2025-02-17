import React, { useState, useEffect } from 'react';
import './PastRequests.css'; // Import the custom CSS file
import axios from 'axios';

function Pastrequest() {
  const [pastRequests, setPastRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 
  const getpastreques=async()=>{
    try {
       const res=await axios.post("http://localhost:8080/api/help-requests/pastrequestofuser",{},{withCredentials:true});
       console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>{
       getpastreques();
  },[])
  // Helper function to get card background class based on urgency tier.
  const getCardColor = (urgencyTier) => {
    if (urgencyTier >= 8) {
      return "tier-high";
    } else if (urgencyTier >= 5) {
      return "tier-medium";
    } else {
      return "tier-low";
    }
  };

  useEffect(() => {
    // Simulate fetching completed (past) requests from an API or data source.
    const fetchPastRequests = async () => {
      const data = [
        {
          id: 1,
          name: "Alice",
          title: "Completed Grocery Help",
          description: "Assisted with grocery shopping last week.",
          urgencyTier: 3,
          isActive: false,
          completionTime: "2:00 PM",
          rewardCoins: 50,
          address: "123 Main St, City, Country",
          completedAt: "2025-02-05T14:00:00",
        },
        {
          id: 2,
          name: "Bob",
          title: "Completed Allergic Reaction Help",
          description: "Provided immediate help for a severe allergic reaction.",
          urgencyTier: 8,
          isActive: false,
          completionTime: "ASAP",
          rewardCoins: 100,
          address: "456 Elm St, City, Country",
          completedAt: "2025-02-07T10:00:00",
        },
        {
          id: 3,
          name: "Charlie",
          title: "Old Completed Request",
          description: "Helped with a minor home repair task completed earlier.",
          urgencyTier: 2,
          isActive: false,
          completionTime: "N/A",
          rewardCoins: 0,
          address: "789 Oak St, City, Country",
          completedAt: "2025-02-01T09:00:00",
        },
      ];

      // Filter for only completed requests (isActive === false)
      const completedRequests = data.filter(request => !request.isActive);
      // Sort by completion date (latest completed first)
      completedRequests.sort(
        (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
      );
      setPastRequests(completedRequests);
    };

    fetchPastRequests();
  }, []);

  // Modal handling
  const openModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Past Requests
      </h1>

      {pastRequests.length > 0 ? (
        <div className="space-y-6">
          {pastRequests.map(request => (
            <div
              key={request.id}
              className={`p-6 rounded-lg ${getCardColor(request.urgencyTier)} shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
            >
              <h2 className="text-2xl font-semibold mb-2 text-white">
                {request.title}
              </h2>
              <p className="mb-4 text-white">{request.description}</p>
              <div className="flex justify-between mb-4">
                <p className="text-white text-sm">
                  Completed At: {new Date(request.completedAt).toLocaleString()}
                </p>
                <p className="text-white text-sm">
                  Reward: {request.rewardCoins} Coins
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-white bg-opacity-20 text-white rounded-full text-sm">
                  Urgency Tier: {request.urgencyTier}
                </span>
                <button
                  onClick={() => openModal(request)}
                  className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-white">
          You currently have no past requests.
        </p>
      )}

      {/* DaisyUI Modal for viewing details */}
      {isModalOpen && selectedRequest && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-900 text-white">
            <h3 className="font-bold text-lg">{selectedRequest.title}</h3>
            <p className="py-2">{selectedRequest.description}</p>
            <p className="py-2">
              <strong>Urgency Tier:</strong> {selectedRequest.urgencyTier}
            </p>
            <p className="py-2">
              <strong>Completed At:</strong>{" "}
              {new Date(selectedRequest.completedAt).toLocaleString()}
            </p>
            <p className="py-2">
              <strong>Name:</strong> {selectedRequest.name || "N/A"}
            </p>
            <p className="py-2">
              <strong>Reward:</strong> {selectedRequest.rewardCoins} Coins
            </p>
            <p className="py-2">
              <strong>Address:</strong> {selectedRequest.address}
            </p>
            <div className="modal-action">
              <button className="btn bg-gray-700" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pastrequest;
