import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import { CheckoutForm } from './CheckoutForm';

// Initialize Stripe outside of component to avoid recreating it on every render
const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_TYooMQauvdEDq54NiTphI7jx'
);

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, onPaymentSuccess }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 shrink-0">
                    <div>
                        <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">
                            Roasell App
                        </h2>
                        <p className="text-zinc-400 text-sm mt-1">3 Günlük Deneme</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                    <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
                        <span className="text-zinc-300 font-medium">3 Günlük Deneme</span>
                        <span className="text-2xl font-black text-white">$1<span className="text-sm font-normal text-zinc-500 ml-1">/ 3 gün</span></span>
                    </div>

                    <Elements stripe={stripePromise} options={{
                        appearance: {
                            theme: 'night',
                            variables: {
                                colorPrimary: '#2563eb',
                                colorBackground: '#18181b',
                                colorText: '#ffffff',
                                colorDanger: '#f87171',
                                fontFamily: 'Inter, system-ui, sans-serif',
                                spacingUnit: '4px',
                                borderRadius: '8px',
                            }
                        },
                        mode: 'payment',
                        amount: 100,
                        currency: 'usd',
                        paymentMethodCreation: 'manual',
                    }}>
                        <CheckoutForm onSuccess={onPaymentSuccess} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
