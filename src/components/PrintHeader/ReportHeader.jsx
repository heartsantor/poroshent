import React from 'react';

const ReportHeader = () => {
  return (
    <>
      <div className="invoice-header mb-2">
        <div className="invoice-header-into">
          <h1></h1>
        </div>
        <div className="invoice-header-company">
          <div className="invoice-header-company-name">
            <h1>মেসার্স পরশ এন্টারপ্রাইজ</h1>
          </div>
          <div className="invoice-header-company-contact">
            <div className="invoice-header-company-number">
              <p>ওয়েবসাইট:</p>
              <span>www.poroshent.com</span>
            </div>
            <div className="invoice-header-company-number">
              <p>ইমেইল: </p>
              <span>support@poroshent.com</span>
            </div>
            <div className="invoice-header-company-number">
              <p>মোবাইল :</p>
              <span>০১৭৯৯-৩৪৫৪৯৯</span>
            </div>
          </div>
        </div>

        <div className="invoice-header-provider">
          <div className="invoice-header-provider-name">
            <h1>প্রো: মোঃ নূরে আলম সিদ্দিক (রুবেল)</h1>
            <p>উত্তর বাজার, নকলা, শেরপুর। </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportHeader;
