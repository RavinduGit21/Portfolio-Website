import React from 'react';
import type { Review } from '../types';

interface CustomerReviewsProps {
    reviews: Review[];
}

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight">What Our Customers Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            We value our customers' feedback. Here's what they have to share.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
             <div key={review.id} className="bg-gray-50 border border-gray-200 p-8 rounded-lg">
                 <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} filled={i < review.rating} />
                    ))}
                  </div>
                 <blockquote className="text-gray-700 italic">"{review.text}"</blockquote>
                 <p className="mt-4 font-bold text-brand-dark text-right">- {review.name}</p>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
