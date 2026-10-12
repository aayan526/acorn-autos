import React, { useState } from 'react';
import { Calendar, Clock, Car, User, Phone, CheckCircle, ArrowRight, ArrowLeft, Download, RefreshCw, ShieldCheck, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SERVICES_LIST, GARAGE_INFO } from '../data/garageData';
import { BookingFormData } from '../types';

interface BookingFlowProps {
  initialServiceId?: string;
  initialReg?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  initialServiceId,
  initialReg = '',
  isModal = false,
  onCloseModal,
}) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialServiceId || 'mot-testing',
    serviceName: SERVICES_LIST.find((s) => s.id === initialServiceId)?.title || 'Class 4 MOT Testing',
    registration: initialReg || '',
    makeModel: '',
    fuelType: 'Petrol',
    mileage: '',
    preferredDate: '',
    preferredTime: '08:30 AM (Early Drop-off)',
    fullName: '',
    phoneNumber: '',
    email: '',
    notes: '',
  });

  const [bookingRef, setBookingRef] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Available time slots within Mon-Fri 8:30 AM - 4:00 PM
  const timeSlots = [
    '08:30 AM (Early Drop-off)',
    '09:30 AM (Morning Slot)',
    '11:00 AM (Midday Slot)',
    '01:00 PM (Afternoon Slot)',
    '02:30 PM (Late Slot)',
  ];

  // Helper to get minimum selectable date (tomorrow or next weekday)
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  const handleServiceSelect = (serviceId: string, serviceTitle: string) => {
    setFormData((prev) => ({ ...prev, serviceId, serviceName: serviceTitle }));
    setErrors((prev) => ({ ...prev, service: '' }));
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.serviceId) newErrors.service = 'Please select a service';
    } else if (currentStep === 2) {
      if (!formData.registration.trim()) newErrors.registration = 'Vehicle registration is required';
      if (!formData.makeModel.trim()) newErrors.makeModel = 'Vehicle make and model is required';
    } else if (currentStep === 3) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select a date';
      } else {
        const selectedDate = new Date(formData.preferredDate);
        const dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          newErrors.preferredDate = 'We are closed on Saturdays & Sundays. Please choose Mon–Fri.';
        }
      }
      if (!formData.preferredTime) newErrors.preferredTime = 'Please select a preferred arrival slot';
    } else if (currentStep === 4) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.phoneNumber.trim() || formData.phoneNumber.length < 9) {
        newErrors.phoneNumber = 'Valid phone number is required (e.g. 0113 or 07xxx)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 4) {
        // Complete booking
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const ref = `ACORN-${randomNum}`;
        setBookingRef(ref);
        setStep(5);
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      } else {
        setStep((prev) => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((prev) => prev - 1);
  };

  const prefillTestVehicle = (reg: string, make: string, fuel: string) => {
    setFormData((prev) => ({
      ...prev,
      registration: reg,
      makeModel: make,
      fuelType: fuel,
      mileage: '48,500',
    }));
  };

  // Generate .ics calendar invite
  const downloadCalendarEvent = () => {
    const title = `${formData.serviceName} - Acorn Autos Ltd`;
    const description = `Booking Ref: ${bookingRef}\\nVehicle: ${formData.registration} (${formData.makeModel})\\nAddress: 4 Low Mills Rd, Lower Wortley, Leeds LS12 4UY\\nPhone: 0113 279 9404`;
    const location = '4 Low Mills Rd, Lower Wortley, Leeds LS12 4UY';
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Acorn Autos Ltd//Booking System//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      `DTSTART;VALUE=DATE:${formData.preferredDate.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${formData.preferredDate.replace(/-/g, '')}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\\r\\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${bookingRef}-acorn-autos.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetBooking = () => {
    setStep(1);
    setBookingRef('');
    setFormData({
      serviceId: 'mot-testing',
      serviceName: 'Class 4 MOT Testing',
      registration: '',
      makeModel: '',
      fuelType: 'Petrol',
      mileage: '',
      preferredDate: '',
      preferredTime: '08:30 AM (Early Drop-off)',
      fullName: '',
      phoneNumber: '',
      email: '',
      notes: '',
    });
  };

  return (
    <div className={`w-full max-w-4xl mx-auto ${isModal ? '' : 'p-4 sm:p-8'}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Booking Card Header */}
        <div className="p-6 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Official Leeds MOT & Workshop Booking</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              {step === 5 ? 'Booking Confirmed' : 'Book MOT or Vehicle Servicing'}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              4 Low Mills Rd, Lower Wortley, Leeds LS12 4UY · Mon–Fri 8:30 AM – 4:00 PM
            </p>
          </div>

          {step < 5 && (
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-colors ${
                    step === s
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : step > s
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {step > s ? '✓' : s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Step 1: Choose Required Service or MOT</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select your primary appointment reason. Additional advisory checks are carried out automatically.
                </p>
              </div>

              {errors.service && (
                <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-lg text-xs text-red-300 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errors.service}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {SERVICES_LIST.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleServiceSelect(srv.id, srv.title)}
                    className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      formData.serviceId === srv.id
                        ? 'bg-amber-950/20 border-amber-400 text-white shadow-md ring-1 ring-amber-400'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-white line-clamp-1">{srv.title}</span>
                        <span className="text-xs font-bold text-amber-400 shrink-0 font-mono">{srv.priceEstimate}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{srv.description}</p>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-3 pt-2 border-t border-slate-900 flex items-center justify-between">
                      <span>Approx: {srv.duration}</span>
                      {formData.serviceId === srv.id && (
                        <span className="text-emerald-400 font-bold">Selected ✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: VEHICLE DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Step 2: Vehicle Information</h3>
                <p className="text-xs text-slate-400 mt-1">
                  We verify parts matching and fluids using your vehicle registration number.
                </p>
              </div>

              {/* Quick pre-fill buttons for test user convenience */}
              <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400">
                <span className="font-semibold text-slate-300 mr-2">Quick 1-Click Test Vehicles:</span>
                <button
                  type="button"
                  onClick={() => prefillTestVehicle('YK19 XZP', 'Volkswagen Golf 1.5 TSI', 'Petrol')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 mr-2 font-mono text-[11px]"
                >
                  YK19 XZP (VW Golf)
                </button>
                <button
                  type="button"
                  onClick={() => prefillTestVehicle('BD68 VTY', 'Ford Focus 1.0 EcoBoost', 'Petrol')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 mr-2 font-mono text-[11px]"
                >
                  BD68 VTY (Ford Focus)
                </button>
                <button
                  type="button"
                  onClick={() => prefillTestVehicle('LS12 4UY', 'Nissan Qashqai 1.3', 'Petrol')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-amber-400 hover:text-slate-950 text-slate-200 font-mono text-[11px]"
                >
                  LS12 4UY (Qashqai)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="reg-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Registration Plate *
                  </label>
                  <div className="relative flex items-center rounded-lg bg-amber-400 p-1 border border-amber-300">
                    <div className="bg-blue-800 text-white px-2 py-1 rounded-l text-[10px] font-bold select-none leading-none">
                      UK
                    </div>
                    <input
                      id="reg-field"
                      type="text"
                      value={formData.registration}
                      onChange={(e) => setFormData({ ...formData, registration: e.target.value.toUpperCase() })}
                      placeholder="e.g. YK19 XZP"
                      maxLength={10}
                      className="w-full bg-transparent text-slate-950 font-mono font-black text-lg tracking-wider px-3 py-1 focus:outline-none uppercase"
                    />
                  </div>
                  {errors.registration && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.registration}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="make-model-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Vehicle Make & Model *
                  </label>
                  <input
                    id="make-model-field"
                    type="text"
                    value={formData.makeModel}
                    onChange={(e) => setFormData({ ...formData, makeModel: e.target.value })}
                    placeholder="e.g. Ford Focus or BMW 1 Series"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.makeModel && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.makeModel}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="fuel-type-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Fuel / Engine Type
                  </label>
                  <select
                    id="fuel-type-field"
                    value={formData.fuelType}
                    onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric (EV)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="mileage-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Approx Mileage (Optional)
                  </label>
                  <input
                    id="mileage-field"
                    type="text"
                    value={formData.mileage}
                    onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    placeholder="e.g. 52,000 miles"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PREFERRED DATE & TIME */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Step 3: Appointment Date & Time</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Workshop operating hours: <strong>Monday to Friday: 8:30 AM – 4:00 PM</strong> (Weekends closed).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="booking-date-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Select Weekday Date *
                  </label>
                  <input
                    id="booking-date-field"
                    type="date"
                    min={getMinDate()}
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.preferredDate && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.preferredDate}</span>
                  )}
                  <p className="text-[11px] text-slate-500 mt-2">
                    Tip: Cars dropped off at 8:30 AM are typically ready by midday or early afternoon.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Preferred Drop-off Slot *
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot })}
                        className={`w-full p-2.5 rounded-lg text-left text-xs font-semibold border transition-all cursor-pointer flex items-center justify-between ${
                          formData.preferredTime === slot
                            ? 'bg-amber-400 text-slate-950 border-amber-400 font-bold'
                            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span>{slot}</span>
                        {formData.preferredTime === slot && <span>✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: CONTACT INFORMATION & SUMMARY */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Step 4: Contact Details & Confirmation</h3>
                <p className="text-xs text-slate-400 mt-1">
                  We send confirmation and call with your MOT status / progress report.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Selected Service:</span>
                  <span className="font-bold text-amber-400">{formData.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-white">{formData.registration} ({formData.makeModel})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Slot:</span>
                  <span className="font-bold text-white">{formData.preferredDate} · {formData.preferredTime}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="full-name-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    id="full-name-field"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. David Miller"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.fullName}</span>
                  )}
                </div>

                <div>
                  <label htmlFor="phone-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Phone Number (for updates) *
                  </label>
                  <input
                    id="phone-field"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="e.g. 07700 900123 or 0113..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  {errors.phoneNumber && (
                    <span className="text-xs text-red-400 mt-1 block">{errors.phoneNumber}</span>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="email-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Email Address (for confirmation copy)
                  </label>
                  <input
                    id="email-field"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. david.miller@example.co.uk"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="notes-field" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Additional Symptoms or Notes for Mechanic (Optional)
                  </label>
                  <textarea
                    id="notes-field"
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="e.g. Squeaking noise from front right when braking, or warning light on dashboard..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: CONFIRMATION SCREEN (End-to-end completed state) */}
          {step === 5 && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-900/40 animate-in zoom-in-75 duration-300">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-amber-400 font-bold">
                  Reference: {bookingRef}
                </div>
                <h3 className="text-2xl font-black text-white">
                  Appointment Provisionally Booked!
                </h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto">
                  Thank you, <strong>{formData.fullName || 'Customer'}</strong>. Your slot has been reserved at our Lower Wortley workshop. Our reception team will review vehicle parts allocations and contact you if anything further is required.
                </p>
              </div>

              {/* Complete Confirmation Summary Details */}
              <div className="max-w-md mx-auto text-left p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Service:</span>
                  <span className="font-bold text-amber-400">{formData.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Vehicle:</span>
                  <span className="font-bold text-white font-mono">{formData.registration} ({formData.makeModel})</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Appointment Date:</span>
                  <span className="font-bold text-white">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Arrival Time:</span>
                  <span className="font-bold text-white">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span className="text-slate-400">Drop-off Address:</span>
                  <span className="font-bold text-white">4 Low Mills Rd, Leeds LS12 4UY</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Contact Number:</span>
                  <span className="font-bold text-white">{formData.phoneNumber}</span>
                </div>
              </div>

              {/* Interactive confirmation actions */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={downloadCalendarEvent}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>Add to Calendar (.ics)</span>
                </button>

                <button
                  type="button"
                  onClick={resetBooking}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs border border-slate-700 flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Book Another Vehicle</span>
                </button>

                {isModal && onCloseModal && (
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                )}
              </div>

              <div className="pt-2 text-xs text-slate-500">
                Need to amend or cancel? Call reception directly on{' '}
                <a href={GARAGE_INFO.phoneHref} className="text-amber-400 font-bold hover:underline">
                  {GARAGE_INFO.phone}
                </a>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer (Steps 1 to 4) */}
          {step < 5 && (
            <div className="flex items-center justify-between pt-6 border-t border-slate-800 mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>{step === 4 ? 'Confirm & Book Appointment' : 'Continue to Next Step'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
