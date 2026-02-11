import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  value: { start: string; end: string };
  onChange: (range: { start: string; end: string }) => void;
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white">
      <Calendar className="w-4 h-4 text-slate-400" />
      <input
        type="date"
        value={value.start}
        onChange={(e) => onChange({ ...value, start: e.target.value })}
        className="text-sm text-slate-700 focus:outline-none"
        placeholder="Start date"
      />
      <span className="text-slate-400">—</span>
      <input
        type="date"
        value={value.end}
        onChange={(e) => onChange({ ...value, end: e.target.value })}
        className="text-sm text-slate-700 focus:outline-none"
        placeholder="End date"
      />
    </div>
  );
}
