import React, { useState } from 'react';

function Help() {
  // State for the help selection modal, confirmation modal, and success modal
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  // State to hold the selected help option and the submitted option
  const [selectedHelp, setSelectedHelp] = useState(null);
  const [submittedHelp, setSubmittedHelp] = useState('');

  // List of help options (tiers)
  const helpOptions = [
    'Tier 10: Critical Emergency',
    'Tier 9: Severe Emergency',
    'Tier 8: High Urgency',
    'Tier 7: Emergency Assistance',
    'Tier 6: Serious Medical Issue',
    'Tier 5: Moderate Medical Issue',
    'Tier 4: Routine Help Request',
    'Tier 3: Non-urgent Help',
    'Tier 2: Minor Help',
    'Tier 1: Convenience Request'
  ];

  // Open the help selection modal
  const openHelpModal = () => {
    setIsHelpModalOpen(true);
  };

  // Close the help selection modal and reset the selection
  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
    setSelectedHelp(null);
  };

  // Handle submit from the help selection modal
  const handleSubmit = () => {
    if (selectedHelp) {
      setIsConfirmModalOpen(true);
    } else {
      alert("Please select a help option before submitting.");
    }
  };

  // Finalize the help request (confirmation)
  const confirmHelpRequest = () => {
    setSubmittedHelp(selectedHelp);
    setIsSuccessModalOpen(true);
    setIsConfirmModalOpen(false);
    setIsHelpModalOpen(false);
    setSelectedHelp(null);
  };

  // Cancel the confirmation and return to the selection modal
  const cancelConfirmation = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <div>
      {/* Circular Help Button with increased size */}
      <button className="btn btn-circle btn-primary w-32 h-32 text-2xl" onClick={openHelpModal}>
        Help
      </button>

      {/* Help Selection Modal */}
      {isHelpModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            {/* Close Button */}
            <label 
              onClick={closeHelpModal} 
              className="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold mb-4">Request Help</h3>
            <p className="mb-4">Choose the appropriate help request:</p>
            <div className="mb-4">
              {helpOptions.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name="helpOption"
                    id={`option-${index}`}
                    value={option}
                    checked={selectedHelp === option}
                    onChange={() => setSelectedHelp(option)}
                    className="mr-2"
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </div>
              ))}
            </div>
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {isConfirmModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            {/* Close Button */}
            <label 
              onClick={cancelConfirmation} 
              className="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold mb-4">Confirm Help Request</h3>
            <p className="mb-4">
              Are you sure you want to request help for: 
              <span className="font-semibold"> {selectedHelp}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button className="btn btn-error" onClick={cancelConfirmation}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={confirmHelpRequest}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isSuccessModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            {/* Close Button */}
            <label 
              onClick={() => setIsSuccessModalOpen(false)} 
              className="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
            >
              ✕
            </label>
            <h3 className="text-lg font-bold mb-4">Success</h3>
            <p className="mb-4">
              Your help request for <span className="font-semibold">{submittedHelp}</span> has been submitted!
            </p>
            <div className="flex justify-end">
              <button className="btn btn-success" onClick={() => setIsSuccessModalOpen(false)}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Help;
