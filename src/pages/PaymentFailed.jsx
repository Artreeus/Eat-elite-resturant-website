import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col justify-center items-center testimonial-section py-12">
      <img
        className="w-60"
        src="https://i.ibb.co/QJRLM1V/filed-Icon.png"
        alt=""
      />
      <h2 className="text-2xl font-semibold text-gray-600 py-2">
        Your payment was failed or declined
      </h2>
      <p className="text-sm text-justify w-3/12 py-2 text-gray-500">
        Your payment was not successfully processed. Please contact our customer
        support or try again to pay.
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

export default PaymentFailed;