import React, { useEffect, useId, useState } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../redux/auth";
import logo from "../assest/logo.png"
import toast from "react-hot-toast";

const Payment = () => {
  // Sample booking details

  const [checkout, setCheckout] = useState([]);
  const [products, setProducts] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [key, setKey] = useState("");
  const navigat = useNavigate();
  const [orderId, setOrderId] = useState("");
  const { user } = useAuth();
  const [userData , setUserData] = useState();
  
  console.log("User:", user);
  useEffect(() => {
    // console.log("Setting userId:", user.userData._id);
    setUserData(user.userData);
  }, [user]);
  console.log(userData);




  const sampleBookingDetails = {
    depositPrice: 4000,
    rentPrice: 5000,
    tax: 500,
    noOfDays: 2,
  };

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    fetch(`http://localhost:3000/api/checkout/getcheckoutDetial/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data.products[0])
        setCheckout(data.products[0]);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  console.log(checkout);

  const productId = checkout.carId;
  console.log(productId);
  useEffect(() => {
    fetch(`http://localhost:3000/api/detail/getProduct/ProductById/${productId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setProducts(data);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);
  console.log(products);

  const totalRent = products.price * checkout.numberOfDays;
  const taxAmount = totalRent * 5 / 100;


  const calculateTotal = () => {
    const totalBeforeDiscount = products.depositPrice + totalRent + taxAmount;
    const discountedAmount = totalBeforeDiscount * discount;
    return totalBeforeDiscount - discountedAmount;
  };

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Deposite");


  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setSelectedAmount(method === "Deposit" ? products.depositPrice : calculateTotal());
  };




  const handlePayment = async (re, res) => {


    await fetch('http://localhost:3000/api/checkout/getkey')
      .then(response => response.json())
      .then(data => {
        setKey(data.key);
        console.log(data);
      })
      .catch(error => console.error('Error fetching products in payment page :', error));
    console.log(window);


    const response = await fetch("http://localhost:3000/api/checkout/payment", {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ amount: Math.round(selectedAmount) }),
    });

    // const data = await response.json();
    const order = await response.json();
    console.log(order);
    if (response.ok) {
      console.log(order.order.id);
      setOrderId(order.order.id);

    } else {
      const errorData = await response.json();
      throw new Error(`Payment request failed: ${errorData.message}`);
    }


    const sendPaymentData = async (values) => {
      console.log(values);
      try {
        const response = await fetch('http://localhost:3000/api/checkout/verifyPayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          navigat('/paymentsuccess');
          toast.success("Booking Confirmed! Enjoy Your Ride!")
        }else{
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        alert('Success');
      } catch (error) {
        console.error('Error:', error);
        // toast.error("Please login first ");
      }
    };




    console.log(key);
    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: selectedAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "RentEasy",
      description: "Test Transaction",
      image: {logo},
      order_id: orderId,
      handler: function (response) {
        console.log(response);
        var values = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
          userId: userData._id,
          carId: productId,
          paymentMethod : paymentMethod ,
          amount : selectedAmount
        };
        sendPaymentData(values);
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)
      },
      prefill: {
        name: "RentEasy",
        email: "renteasy312@gmail.com",
        contact: "70963054878"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#363C44"
      },
      callback_url: "http://localhost:3000/api/checkout/verifyPayment" //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    };



    const razor = new window.Razorpay(options);
    console.log(razor);
    razor.open();
    razor.on('payment.failed', function (response) {
      console.log(response);
      alert("This step of Payment Failed");
    });


    if (paymentMethod === "Deposit" || paymentMethod === "Total") {
      console.log(`Payment processed for ${paymentMethod} amount :  ${selectedAmount}`);

    } else if (paymentMethod === "CashOnDelivery") {
      console.log("Payment on delivery");

    } else {
      console.error("Please select a payment method.");
    }
  };


  const renderPayButton = () => {
    if (paymentMethod === "Deposit" || paymentMethod === "Total") {
      return (
        <div className="flex justify-center">
          <button
            className="bg-black text-white py-2 px-5 rounded-md mt-10 hover:bg-gray-700 focus:outline-none"
            onClick={handlePayment}
          >
            Pay ₹{selectedAmount}
          </button>
        </div>
      );
    } else if (paymentMethod === "CashOnDelivery") {
      return (
        <div className="flex justify-center">
          <button
            className="bg-black text-white py-2 px-5 rounded-md mt-10 hover:bg-gray-700 focus:outline-none"
            onClick={handlePayment}
          >
            Pay on Delivery
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  const applyCoupon = () => {
    if (couponCode === "CODE10") {
      setDiscount(0.25); // 10% discount
    } else {
      console.log("Invalid coupon code");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="flex-1 h-full p-8">
        <p className="text-4xl font-semibold text-center mb-4">Payment Page</p>
        <hr className="my-4" />
        <div className="mt-8 w-1/2 mx-auto">
          {/* Payment Details Card */}
          <div className="bg-white p-4 rounded-md shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <div className="flex justify-between mb-2">
              <p>Deposit Price:</p>
              <p>₹{products.depositPrice}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Rent Price:</p>
              <p>₹{totalRent}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>Tax: (5% of rent)</p>
              <p>₹{taxAmount}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="font-semibold">Total:</p>
              <p className="font-semibold">₹{calculateTotal()}</p>
            </div>
          </div>
          <div className="bg-white w-full text-black p-6 rounded-lg shadow-lg ">
            <div className="text-3xl pt-4  font-bold mb-4">Special Offer!</div>
            <div className="text-lg mb-4">Unlock exclusive savings by entering your personalized coupon code at checkout!</div>
            <div className="text-base mb-4">Enter coupon code:</div>
            <div className="text-white rounded-lg flex items-center justify-normal gap-10">
              <input
                type="text"
                className="text-2xl border-black border-2 rounded-lg pl-1 font-semibold text-black"
                onChange={(e) => setCouponCode(e.target.value)} />
              <button
                className="bg-black text-white px-3 py-1  rounded focus:outline-none 
              focus:ring-2 focus:ring-white-500"
                onClick={applyCoupon}>
                Apply
              </button>
            </div>
            <div className="text-sm  mt-6 pb-6">
              <p>Terms and conditions apply.</p>
            </div>
          </div>
          {/* Payment Method Selection */}
          <div className="bg-white p-4 mt-6 rounded-md shadow-md">
            <p className="text-xl font-semibold mb-4">Select Payment Method:</p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Deposit"
                  name="paymentMethod"
                  value="Deposit"
                  checked={paymentMethod === "Deposit"}
                  onChange={() => handlePaymentMethodChange("Deposit")}
                />
                <label htmlFor="deposit" className="ml-2">Deposit Amount</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="Total"
                  name="paymentMethod"
                  value="Total"
                  checked={paymentMethod === "Total"}
                  onChange={() => handlePaymentMethodChange("Total")}
                />
                <label htmlFor="total" className="ml-2">Total Amount</label>
              </div>
            </div>
            {renderPayButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
