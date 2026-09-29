import { Sparkles, Terminal } from "lucide-react";
import { cn, SIDEBAR_RAIL_HIDDEN_LABEL } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function AuroLogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-purple-600 to-cyan-500 shadow-sm shadow-indigo-500/30 text-white font-black text-xs tracking-wider select-none",
        className,
      )}
    >
      <span className="relative z-10 font-mono">AU</span>
      <div className="absolute inset-0 rounded-lg bg-white/10 backdrop-blur-xs opacity-0 hover:opacity-100 transition-opacity" />
    </div>
  );
}

export function AuroBrandHeader() {
  const { collapsed, peeking } = useSidebar();
  const rail = collapsed && !peeking;

  const content = (
    <div className="flex items-center gap-2.5 px-3 py-2.5 border-b border-border/40 bg-sidebar/50">
      <AuroLogoIcon />
      {!rail && (
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-1.5">
            <span className="truncate text-xs font-bold tracking-wider text-foreground uppercase font-mono">
              PROJECT AURO
            </span>
            <span className="flex items-center gap-1 rounded bg-emerald-500/10 px-1 py-0.2 text-[9px] font-medium text-emerald-400 border border-emerald-500/20">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LOCAL
            </span>
          </div>
          <span className="text-[10px] text-muted-foreground/70 truncate tracking-tight">
            Autonomous Agent Core
          </span>
        </div>
      )}
    </div>
  );

  if (rail) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-pointer">{content}</div>
        </TooltipTrigger>
        <TooltipContent side="right">Project Auro (Local Mode)</TooltipContent>
      </Tooltip>
    );
  }

  return content;
}
