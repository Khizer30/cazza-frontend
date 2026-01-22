import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (dateRange: DateRange | undefined) => void;
  className?: string;
  placeholder?: string;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  className,
  placeholder = "Pick a date range"
}: DateRangePickerProps) {
  const handleSelect = (range: DateRange | undefined) => {
    // If range is undefined or both from and to are undefined, reset
    if (!range || (!range.from && !range.to)) {
      onDateRangeChange(undefined);
      return;
    }

    // If only from is selected, set it as the start date
    if (range.from && !range.to) {
      onDateRangeChange({ from: range.from, to: undefined });
      return;
    }

    // If both are selected, ensure from is before to
    if (range.from && range.to) {
      if (range.from > range.to) {
        onDateRangeChange({ from: range.to, to: range.from });
      } else {
        onDateRangeChange(range);
      }
      return;
    }

    // Default case
    onDateRangeChange(range);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-[300px] justify-start text-left font-normal !transition-none hover:bg-background hover:text-foreground",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                <>
                  {format(dateRange.from, "LLL dd, y")}
                  <span className="text-muted-foreground ml-2">(Select end date)</span>
                </>
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange?.from || new Date()}
            selected={dateRange}
            onSelect={handleSelect}
            numberOfMonths={2}
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
