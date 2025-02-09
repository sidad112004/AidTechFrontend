import React, { useState } from 'react';

function Notification() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Button to open the notification modal with a notification symbol */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="btn btn-primary flex items-center gap-2"
      >
        {/* Notification Symbol */}
        <span role="img" aria-label="notification">🔔</span>
        Open Notifications
      </button>

      {/* Render the modal only when isOpen is true */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            {/* Close button */}
            <label 
              onClick={() => setIsOpen(false)} 
              className="btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer"
            >
              ✕
            </label>
            <h3 className="font-bold text-lg">Notifications</h3>
            <div className="py-4">
              <p>Notification 1: You have a new message.</p>
              <p>Notification 2: Your request has been approved.</p>
              <p>Notification 3: Update your profile for a better experience.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notification;
