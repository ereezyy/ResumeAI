import React, { useState } from 'react';
import { Coins, Copy, Check } from 'lucide-react';

const ETHEREUM_ADDRESS = '0xDb704028F1be95E128495b945347c02b11B27724';

export function DonationSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ETHEREUM_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-4xl mx-auto mt-8">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Coins className="w-6 h-6 text-navy-600" />
          <h2 className="text-2xl font-bold text-navy-800">Support Development</h2>
        </div>
        <p className="text-navy-600 mb-6">
          Help us maintain and improve ResumeAI by making a donation
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="bg-navy-50 p-6 rounded-lg max-w-xs w-full">
            <h3 className="font-semibold text-navy-800 mb-2">Ethereum (ERC-20)</h3>
            <p className="text-sm text-navy-600 mb-4">Send only ERC-20 tokens to this address</p>
            <button 
              onClick={handleCopyAddress}
              className="w-full bg-white p-4 rounded-md mb-4 hover:bg-navy-50 transition-colors flex items-center justify-between group"
            >
              <code className="text-sm text-navy-800 break-all">
                {ETHEREUM_ADDRESS}
              </code>
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-navy-400 group-hover:text-navy-600" />
              )}
            </button>
            <div className="flex justify-center">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ethereum:0xDb704028F1be95E128495b945347c02b11B27724"
                alt="Ethereum Address QR Code"
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}