import { useState } from 'react';
import CheckoutModal from './CheckoutModal';

export default function CourseCard({ id, name, price, image, onCheckout }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 border-transparent hover:border-indigo-500 transition-colors">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{price}</span>
          <button
            onClick={() => setOpen(true)}
            className="flex cursor-pointer items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <CheckoutModal
          open={open}
          onClose={() => setOpen(false)}
          course={{ id, name, price, image }}
          onCheckout={(payload) => {
            // Hook into your payment flow here (Razorpay, etc.)
            // e.g., navigate(`/checkout?course=${id}`) or open Razorpay widget
            console.log('Checkout payload:', payload);
            setOpen(false);
            onCheckout?.(payload);
          }}
        />
      )}
    </div>
  );
}
