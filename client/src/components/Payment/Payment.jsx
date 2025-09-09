
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useLocation } from "react-router-dom";
import PaymentSuccess from "./PaymentSuccess.jsx";

const API = process.env.REACT_APP_BACKEND_API;
const stripeKey = process.env.REACT_APP_STRIPE_KEY;

function Payment() {
    const location = useLocation();

    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
    });

    // get total from query string (should be a number string)
    const total = new URLSearchParams(location.search).get("total") || 0;

    useEffect(() => {
        const priceInPaise = Number(total) * 100; // convert to integer paise
        setProduct({
            name: "Handyman",
            price: priceInPaise,
            description: `Pay Rs. ${Number(total)} for the most awaited event, Handyman`,
        });
    }, [total]);

    // react-stripe-checkout calls token with one param: the token object
    const handleToken = async (token) => {
        if (!token || !token.id) {
            console.error("Invalid Stripe token received");
            return;
        }

        try {
            const response = await fetch(
                `${API}/api/config`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        token,
                        product,
                    }),
                }
            );
            const data = await response.json();
            if (data.status === "success") {
                setPaymentSuccess(true);
            } else {
                console.error("Payment failed:", data);
            }
        } catch (error) {
            console.error("Error during payment:", error);
        }
    };

    return (
        <div className="pt-20 lg:pt-10 px-4">
            {paymentSuccess && (
                <div className="fixed inset-0 z-50 flex items-center mx-auto backdrop-blur-sm bg-black/30">
                    <PaymentSuccess />
                </div>
            )}

            <div className="flex flex-col items-center text-center space-y-4">
                <h2 className="text-3xl sm:text-4xl font-semibold">
                    Pay using <span className="text-[#5F57F7] font-bold">Stripe</span>
                </h2>
                <p className="text-sm text-gray-500">
                    Payment is currently in{" "}
                    <span className="font-bold text-gray-700">Test Mode</span>
                </p>
            </div>

            <div className="mt-10 space-y-6 flex flex-col items-center">
                <p className="text-base text-gray-700">
                    Use the following test credentials:
                </p>

                <div className="overflow-x-auto shadow-lg rounded-lg w-full max-w-lg">
                    <table className="w-full text-sm text-left">
                        <thead className="uppercase text-xs bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-6 py-3">Field</th>
                                <th className="px-6 py-3">Value</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800">
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">Card Number</td>
                                <td
                                    className="px-6 py-4 cursor-pointer hover:underline"
                                    onClick={() => navigator.clipboard.writeText("4242424242424242")}
                                    title="Click to copy"
                                >
                                    4242 4242 4242 4242
                                </td>
                            </tr>
                            <tr className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">Expiry</td>
                                <td className="px-6 py-4">Any future date (e.g., 03/26)</td>
                            </tr>
                            <tr className="bg-white hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">CVC</td>
                                <td className="px-6 py-4">Any 3-digit number (e.g., 123)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="mt-6">
                    <StripeCheckout
                        stripeKey={stripeKey}
                        amount={product.price} // pass price in paise
                        token={handleToken}
                        name={product.name}
                        currency="INR"
                        billingAddress
                        shippingAddress
                    />
                </div>
            </div>
        </div>
    );
}

export default Payment;
