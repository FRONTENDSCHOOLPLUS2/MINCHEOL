import Footer from '@components/Footer';
import Header from '@components/Header';
import React from 'react';

export default function Error() {
  return (
    <div className="flex flex-col min-h-screen duration-500 ease-in-out dark:bg-gray-700 dark:text-gray-200 transition-color">
      <Header />
      <div className="flex flex-col items-center p-4 py-20 space-y-2 text-red-700 bg-red-100 border border-red-400 rounded-lg">
        <h2 className="mb-2 text-lg font-semibold text-center">
          🚧 앗, 무언가 잘못됐네요!
        </h2>
        <p className="text-center">
          이 오류는 더 나은 서비스를 위한 첫걸음이에요. 조금만 기다려 주세요!
        </p>
        <button className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
          ⚙️ 문제 해결하기
        </button>
      </div>
      <Footer />
    </div>
  );
}
