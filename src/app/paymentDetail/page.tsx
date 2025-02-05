'use client'


import React, { useState } from 'react';

const PaymentSection = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    address: '',
    cnic: '',
    duration: '',
    durationType: 'hour',
  });
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Handle user details form change
  const handleUserDetailsChange = (e:any) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle duration change
  const handleDurationChange = (e:any) => {
    const { value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      duration: value,
    }));

    calculatePayment(value, userDetails.durationType); // Recalculate payment when duration changes
  };

  // Handle duration type (hours, days, or weeks) change
  const handleDurationTypeChange = (e:any) => {
    const { value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      durationType: value,
    }));

    calculatePayment(userDetails.duration, value); // Recalculate payment when duration type changes
  };

  // Calculate payment amount based on duration and type
  const calculatePayment = (duration:any, durationType:any) => {
    let baseAmount = 300; // Base price for the car rental
    let finalAmount = 0;

    // Calculate payment based on the selected duration type
    if (durationType === 'hour') {
      finalAmount = baseAmount * duration;
    } else if (durationType === 'day') {
      finalAmount = baseAmount * 24 * duration; // 1 day = 24 hours
    } else if (durationType === 'week') {
      finalAmount = baseAmount * 7 * 24 * duration; // 1 week = 7 days
    }

    setPaymentAmount(finalAmount); // Set the calculated payment amount
  };

  // Handle payment form submission
  const handleSubmit = (e:any) => {
    e.preventDefault();

    // Simulate payment confirmation
    if (userDetails.name && userDetails.email && userDetails.address && userDetails.cnic && paymentAmount > 0) {
      setBookingConfirmed(true);

      // Here you would typically call your payment gateway API (e.g., Stripe) to process payment.
      // After successful payment, confirm the booking and send a message to the user.
      alert('Payment Successful! Booking Confirmed.');
    } else {
      alert('Please fill in all details and select a payment method.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  bg-gray-100">
      <div className="bg-indigo-300 p-8 rounded-lg shadow-lg w-[580px]">
        <h2 className="text-2xl font-bold text-center mb-6">Car Rental Payment</h2>

        {!bookingConfirmed ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Details - Flex layout */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleUserDetailsChange}
                placeholder="Full Name"
                className="w-[80%] p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleUserDetailsChange}
                placeholder="Email Address"
                className="w-[80%] p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address and CNIC - Flex layout */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleUserDetailsChange}
                placeholder="Address"
                className="w-[80%] p-3 border border-gray-300 rounded-md"
                required
              />
              <input
                type="text"
                name="cnic"
                value={userDetails.cnic}
                onChange={handleUserDetailsChange}
                placeholder="CNIC Number"
                className="w-[80%] p-3 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Duration Input */}
            <div>
              <label>Enter Duration:</label>
              <input
                type="number"
                name="duration"
                value={userDetails.duration}
                onChange={handleDurationChange}
                placeholder="Enter number of hours/days/weeks"
                className="w-full p-3 mb-4 border border-gray-300 rounded-md"
                min="1"
                required
              />
            </div>

            {/* Duration Type (Hours, Days, or Weeks) */}
            <div>
              <label>Choose Duration Type:</label>
              <select
                name="durationType"
                value={userDetails.durationType}
                onChange={handleDurationTypeChange}
                className="w-full p-3 mb-4 border border-gray-300 rounded-md"
              >
                <option value="hour">Per Hour</option>
                <option value="day">Per Day</option>
                <option value="week">Per Week</option>
              </select>
            </div>

            {/* Payment Method */}
            <div className="flex justify-between">
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit_card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="jazz_cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                JazzCash
              </label>
              <label>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="other_card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Other Cards
              </label>
            </div>

            {/* Payment Amount */}
            <div>
              <p className="text-lg font-bold">Payment Amount: {paymentAmount} PKR</p>
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-md">
              Confirm Booking
            </button>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold">Booking Confirmed</h3>
            <p>Thank you for booking! Your car rental is confirmed.</p>
            <p>Payment Amount: {paymentAmount} PKR</p>
            <p>Duration: {userDetails.duration} {userDetails.durationType}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSection;

