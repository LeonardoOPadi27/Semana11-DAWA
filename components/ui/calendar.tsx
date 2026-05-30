"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function startOfWeek(date: Date) {
  const result = new Date(date)
  result.setHours(0, 0, 0, 0)
  return result
}

function formatLocalDate(date: Date) {
  return date.toISOString().split("T")[0]
}

function Calendar({
  selected,
  onSelect,
  className,
}: {
  selected?: Date
  onSelect?: (date: Date) => void
  className?: string
}) {
  const initial = selected ?? new Date()
  const [currentMonth, setCurrentMonth] = React.useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  )

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startDay = startOfWeek(firstDay).getDay()
  const daysInMonth = getDaysInMonth(year, month)
  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7

  const days = Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - startDay + 1
    if (dayNumber < 1 || dayNumber > daysInMonth) return null
    return new Date(year, month, dayNumber)
  })

  return (
    <div className={cn("rounded-xl border bg-background p-3 shadow-sm", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-sm font-medium">
          {currentMonth.toLocaleDateString("es-ES", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
        {["D", "L", "M", "X", "J", "V", "S"].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="h-8" />
          }

          const isSelected =
            selected && formatLocalDate(selected) === formatLocalDate(day)
          const isToday = formatLocalDate(day) === formatLocalDate(new Date())

          return (
            <Button
              key={day.toISOString()}
              type="button"
              size="icon-sm"
              variant={isSelected ? "default" : "ghost"}
              className={cn(
                "h-8 w-full rounded-lg text-xs",
                !isSelected && isToday && "border border-primary/30"
              )}
              onClick={() => onSelect?.(day)}
            >
              {day.getDate()}
            </Button>
          )
        })}
      </div>
      <div className="mt-3 text-xs text-muted-foreground">
        Rango visible: {firstDay.toLocaleDateString("es-ES")} - {lastDay.toLocaleDateString("es-ES")}
      </div>
    </div>
  )
}

export { Calendar }
