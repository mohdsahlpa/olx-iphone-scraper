"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter as FilterIcon } from "lucide-react";

interface iPhoneFilterProps {
  models: string[];
  selectedModel: string | null;
  onModelChange: (model: string | null) => void;
}

export function IPhoneFilter({ models, selectedModel, onModelChange }: iPhoneFilterProps) {
  const handleValueChange = (value: string) => {
    onModelChange(value === "all" ? null : value);
  };

  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center gap-4 p-4 bg-card rounded-lg shadow">
      <div className="flex items-center text-lg font-medium text-foreground">
        <FilterIcon className="mr-2 h-5 w-5 text-primary" />
        Filter by Model
      </div>
      <Select onValueChange={handleValueChange} value={selectedModel || "all"}>
        <SelectTrigger className="w-full sm:w-[280px] text-base">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Models</SelectItem>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
