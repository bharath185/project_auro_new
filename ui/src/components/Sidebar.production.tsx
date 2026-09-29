import {
  Inbox,
  CircleCheck,
  LayoutDashboard,
  Search,
  SquarePen,
  Boxes,
  Settings,
  Users,
  KeyRound,
  FolderKanban,
  Layers3,
  GitBranch,
  Workflow,
} from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SidebarSection } from "./SidebarSection";
import { SidebarNavItem } from "./SidebarNavItem.production";
import { useDialogActions } from "../context/DialogContext";
import { useCompany } from "../context/CompanyContext";
import { useSidebar } from "../context/SidebarContext";
import { heartbeatsApi } from "../api/heartbeats";
import { queryKeys } from "../lib/queryKeys";
import { useInboxBadge } from "../hooks/useInboxBadge";
import { usePublishSharedQueryData, useSharedPollingQuery } from "../hooks/useSharedPolling";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, SIDEBAR_RAIL_HIDDEN_LABEL } from "../lib/utils";
import { SidebarCompanyMenu } from "./SidebarCompanyMenu.production";
import { AuroBrandHeader } from "./AuroBrandHeader";

export function Sidebar() {
  const { openNewIssue } = useDialogActions();
  const [planningOpen, setPlanningOpen] = useState(true);
  const [intelOpen, setIntelOpen] = useState(true);
  const [systemOpen, setSystemOpen] = useState(false);
  const { selectedCompanyId } = useCompany();
  const { collapsed, peeking } = useSidebar();
  const rail = collapsed && !peeking;
  const inboxBadge = useInboxBadge(selectedCompanyId);

  const liveRunsQueryKey = queryKeys.liveRuns(selectedCompanyId!);
  const sharedLiveRuns = useSharedPollingQuery({
    companyId: selectedCompanyId,
    resourceKey: "live-runs",
    queryKey: liveRunsQueryKey,
    enabled: !!selectedCompanyId,
    refetchInterval: false,
    leaderOnly: true,
  });
  const { data: liveRuns, dataUpdatedAt: liveRunsUpdatedAt } = useQuery({
    queryKey: liveRunsQueryKey,
    queryFn: () => heartbeatsApi.liveRunsForCompany(selectedCompanyId!),
    enabled: sharedLiveRuns.enabled,
    refetchInterval: sharedLiveRuns.refetchInterval,
  });
  usePublishSharedQueryData(sharedLiveRuns, liveRuns, liveRunsUpdatedAt);
  const liveRunCount = liveRuns?.length ?? 0;

  return (
    <aside className="w-full h-full min-h-0 border-r border-border bg-background flex flex-col">
      <AuroBrandHeader />

      <div className="flex items-center gap-1 px-3 h-12 shrink-0 border-b border-border/20">
        <SidebarCompanyMenu />
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto scrollbar-auto-hide flex flex-col gap-4 pointer-coarse:gap-3 px-3 py-2">
        <div className="flex flex-col gap-0.5">
          {(() => {
            const newProjectButton = (
              <button
                onClick={() => openNewIssue()}
                data-slot="icon-button"
                aria-label={rail ? "New Project" : undefined}
                className="flex items-center gap-2.5 mx-2 rounded-lg px-2.5 py-2 text-(length:--text-compact) font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-700 hover:from-indigo-500 hover:to-violet-600 shadow-sm shadow-indigo-900/30 transition-all"
              >
                <SquarePen className="h-4 w-4 shrink-0" />
                <span className={rail ? SIDEBAR_RAIL_HIDDEN_LABEL : "truncate"}>+ New Project</span>
              </button>
            );
            return rail ? (
              <Tooltip>
                <TooltipTrigger asChild>{newProjectButton}</TooltipTrigger>
                <TooltipContent side="right">New Project</TooltipContent>
              </Tooltip>
            ) : (
              newProjectButton
            );
          })()}

          <SidebarNavItem to="/dashboard" label="Dashboard" icon={LayoutDashboard} liveCount={liveRunCount} />
          <SidebarNavItem to="/issues" label="Tasks & Stories" icon={CircleCheck} />
          <SidebarNavItem
            to="/inbox"
            label="Inbox"
            icon={Inbox}
            badge={inboxBadge.inbox}
            badgeLabel="unread"
            badgeTone={inboxBadge.failedRuns > 0 ? "danger" : "default"}
            alert={inboxBadge.failedRuns > 0}
          />
          <SidebarNavItem to="/search" label="Search" icon={Search} />
        </div>

        {/* Project Planning */}
        <SidebarSection label="Project Planning" collapsible={{ open: planningOpen, onOpenChange: setPlanningOpen }}>
          <SidebarNavItem to="/projects" label="Projects" icon={FolderKanban} />
          <SidebarNavItem to="/issues?filter=sprint" label="Sprints" icon={GitBranch} />
          <SidebarNavItem to="/issues?filter=story" label="User Stories" icon={Layers3} />
          <SidebarNavItem to="/issues?filter=backlog" label="Backlog" icon={Workflow} />
        </SidebarSection>

        <SidebarSection label="Intelligence" collapsible={{ open: intelOpen, onOpenChange: setIntelOpen }}>
          <SidebarNavItem to="/agents" label="Agents" icon={Users} />
          <SidebarNavItem to="/skills" label="Skills" icon={Boxes} />
        </SidebarSection>

        <SidebarSection label="System" collapsible={{ open: systemOpen, onOpenChange: setSystemOpen }}>
          <SidebarNavItem to="/company/settings" label="Settings" icon={Settings} />
          <SidebarNavItem to="/secrets" label="Secrets" icon={KeyRound} />
        </SidebarSection>
      </nav>
    </aside>
  );
}
