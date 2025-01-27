'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from '../../components/NavbarComponent/NavbarComponent';

export default function SupportPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.subject || !formData.message) {
      toast.error('Please fill in all required fields!');
      return;
    }

    // Prepare the data to send to the backend in the order: name, email, subject, message
    const dataToSend = {
      name: formData.firstName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      const response = await axios.post('/api/support', dataToSend);
      if (response.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({
          firstName: '',
          email: '',
          subject: '',
          message: '',
        });
      }
    } catch (error) {
      toast.error('Failed to send the message. Please try again.');
    }
  };

  return (
    <div>
      <NavbarComponent />


      <div className="isolate bg-white px-6 py-6 sm:py-10 lg:px-8">

        <ToastContainer />

        {/* Background clip-path styling */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#53aaf6] to-[#4bfd63] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Main content with two sections */}
        <div className="flex justify-between items-start ">

          {/* Left Section: Talk with Expert */}
          {/* Left Section: Talk with Expert */}
          <div className="flex-1 text-left pr-8 flex flex-col justify-center items-center text-center mt-32">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Talk with Expert
            </h2>

            <p className="text-lg text-gray-600 mt-4">
              If you are facing any agricultural issues or need advice, click the button below to get in touch with one of our experts.
            </p>

            <button onClick={() => navigate('/meet/abc1234')} className="mt-6 text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Start Meeting
            </button>
          </div>



          <div className="border-l-2 border-gray-300 h-[calc(90vh-4rem)] mx-6"></div>

          {/* Right Section: Support Center */}
          <div className="flex-1 pl-8">
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl text-center">
              Support Center
            </h2>
            <p className="mt-2 text-lg text-gray-600 text-center">
              Submit your queries, and we will get back to you soon.
            </p>

            <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-6">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-900">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-900">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-900">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-900">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                    required
                  />
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>

    </div>
  );
}