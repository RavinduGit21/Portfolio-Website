import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-gray-50 py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-brand-dark tracking-tight">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              We'd love to hear from you! Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
            </p>
          </div>
          <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">Our Address</h3>
                <div className="text-gray-700 space-y-2">
                  <p>Westnahira Cellularz</p>
                  <p>123 Tech Road</p>
                  <p>Silicon Valley, CA 94000</p>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">Contact Information</h3>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Email:</strong> support@westnahira.com</p>
                  <p><strong>Phone:</strong> (123) 456-7890</p>
                </div>
              </div>
            </div>
            <div className="mt-8 border-t pt-8">
               <h3 className="text-xl font-bold text-brand-dark mb-4">Send us a Message</h3>
                <form action="#" method="POST" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="name" className="sr-only">Full Name</label>
                        <input type="text" name="name" id="name" required placeholder="Full Name" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                    </div>
                     <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input type="email" name="email" id="email" required placeholder="Email Address" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                    </div>
                     <div>
                        <label htmlFor="message" className="sr-only">Message</label>
                        <textarea name="message" id="message" rows={4} required placeholder="Your Message" className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-primary hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
