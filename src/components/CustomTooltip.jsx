import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleHelp } from "lucide-react";

export function CustomTooltip({ message }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="absolute bottom-2 right-2">
            <CircleHelp className="w-4 h-4" />
          </span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-gray-700 text-gray-200 border-gray-600 text-xs">
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
