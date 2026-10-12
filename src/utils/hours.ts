export interface GarageStatus {
  isOpen: boolean;
  statusText: string;
  detailText: string;
  badgeClass: string;
}

export function getGarageStatus(): GarageStatus {
  // Use UK London time
  const now = new Date();
  // Get time in Europe/London timezone
  const ukTimeString = now.toLocaleString('en-GB', { timeZone: 'Europe/London' });
  const [datePart, timePart] = ukTimeString.split(', ');
  const [day, month, year] = datePart.split('/').map(Number);
  const [hours, minutes] = timePart.split(':').map(Number);

  const ukDate = new Date(year, month - 1, day, hours, minutes);
  const dayOfWeek = ukDate.getDay(); // 0 is Sunday, 6 is Saturday
  const currentTimeDec = hours + minutes / 60;

  // Monday = 1 ... Friday = 5
  const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
  const isSaturday = dayOfWeek === 6;
  const isSunday = dayOfWeek === 0;

  if (isWeekday) {
    if (currentTimeDec >= 8.5 && currentTimeDec < 16.0) {
      return {
        isOpen: true,
        statusText: 'Open Now',
        detailText: 'Workshop open until 4:00 PM',
        badgeClass: 'text-emerald-400 bg-emerald-950/60 border-emerald-500/30',
      };
    } else if (currentTimeDec < 8.5) {
      return {
        isOpen: false,
        statusText: 'Opening at 8:30 AM',
        detailText: 'Doors open at 8:30 AM this morning',
        badgeClass: 'text-amber-400 bg-amber-950/60 border-amber-500/30',
      };
    } else {
      // After 16:00
      if (dayOfWeek === 5) {
        return {
          isOpen: false,
          statusText: 'Closed for Weekend',
          detailText: 'Reopens Monday 8:30 AM',
          badgeClass: 'text-slate-400 bg-slate-900 border-slate-700',
        };
      }
      return {
        isOpen: false,
        statusText: 'Closed Now',
        detailText: 'Reopens tomorrow at 8:30 AM',
        badgeClass: 'text-slate-400 bg-slate-900 border-slate-700',
      };
    }
  } else {
    // Weekend
    return {
      isOpen: false,
      statusText: isSaturday ? 'Closed (Weekend)' : 'Closed (Sunday)',
      detailText: 'Reopens Monday 8:30 AM',
      badgeClass: 'text-slate-400 bg-slate-900 border-slate-700',
    };
  }
}
