import React from 'react';
import { User, Phone } from 'lucide-react';

interface CustomerDetailsFormProps {
  customerName: string;
  onCustomerNameChange: (val: string) => void;
  phoneNumber: string;
  onPhoneNumberChange: (val: string) => void;
  nameError?: string;
  phoneError?: string;
}

export const CustomerDetailsForm: React.FC<CustomerDetailsFormProps> = ({
  customerName,
  onCustomerNameChange,
  phoneNumber,
  onPhoneNumberChange,
  nameError,
  phoneError,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
        <User className="w-3.5 h-3.5 text-purple-400" />
        <span>Customer Details</span>
      </div>

      {/* Grid: Name & Phone inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
        
        {/* Customer Name (Required) */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-zinc-300">
            Customer Name <span className="text-purple-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4 text-zinc-400" />
            </div>
            <input
              type="text"
              value={customerName}
              onChange={(e) => onCustomerNameChange(e.target.value)}
              placeholder="Enter customer name"
              className={`w-full h-10 sm:h-10.5 pl-9 pr-3 rounded-xl sm:rounded-2xl bg-[#120d24] border text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                nameError
                  ? 'border-red-500/80 focus:ring-red-500/30'
                  : 'border-purple-500/25 focus:border-purple-400 focus:ring-purple-500/20'
              }`}
            />
          </div>
          {nameError && (
            <p className="text-[11px] text-red-400 font-medium pl-1">{nameError}</p>
          )}
        </div>

        {/* Phone Number (Optional) */}
        <div className="space-y-1">
          <label className="block text-xs font-semibold text-zinc-300">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <Phone className="w-4 h-4 text-zinc-400" />
            </div>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => onPhoneNumberChange(e.target.value)}
              placeholder="Enter phone number"
              className={`w-full h-10 sm:h-10.5 pl-9 pr-3 rounded-xl sm:rounded-2xl bg-[#120d24] border text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 transition-all ${
                phoneError
                  ? 'border-red-500/80 focus:ring-red-500/30'
                  : 'border-purple-500/25 focus:border-purple-400 focus:ring-purple-500/20'
              }`}
            />
          </div>
          {phoneError && (
            <p className="text-[11px] text-red-400 font-medium pl-1">{phoneError}</p>
          )}
        </div>

      </div>
    </div>
  );
};
