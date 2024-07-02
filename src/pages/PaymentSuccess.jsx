import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  // const email = searchParams.get("user");
  // const quantityString = searchParams.get("quantity");
  // const quantity = parseInt(quantityString);
  // const data = {
  //   email,
  //   coin: quantity,
  // };


  // useEffect(() => {
  //   const apiUrl = `${import.meta.env.VITE_API_URL}/users/recharge-coin`;
  //   fetch(apiUrl, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <div className="flex flex-col items-center justify-center py-12 testimonial-section">
      <img
        className="w-60"
        src="https://i.ibb.co/4pNcH90/success.png"
        alt="payment_success"
      />
      <h3 className="text-2xl font-semibold text-gray-600 py-2">
        {" "}
        Your transaction was completed successfully.
      </h3>
      <p className="text-sm text-justify w-4/12 py-2 text-gray-500">
        Your coin have been added to your account. Thank you for choosing us and
        being a valued part of our community. We appreciate your support!
      </p>
      <Link to={"/"}>
        {" "}
        <button
          className="font-medium bg-gray-200 px-4 py-2 rounded-sm text-gray-700
      "
        >
          Go to home{" "}
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;