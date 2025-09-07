import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/error-boundary";
import { useEffect } from "react";
import { initVersionManagement } from "@/lib/version-manager";
import Home from "@/pages/home";
import AnalysisDetail from "@/pages/analysis-detail";
import AdminSettings from "@/pages/admin-settings";
import NewInvestigation from "@/pages/new-investigation";
import InvestigationType from "@/pages/investigation-type";
import EvidenceCollectionOld from "@/pages/evidence-collection";
import EvidenceLibraryAdmin from "@/pages/evidence-library-admin";
import EvidenceLibraryManagement from "@/pages/evidence-library-management";
import EvidenceLibrarySimple from "@/pages/evidence-library-simple";
import IncidentReporting from "@/pages/incident-reporting";
import EquipmentSelection from "@/pages/equipment-selection";
import EquipmentSelectionTest from "@/pages/equipment-selection-test";
import EvidenceChecklist from "@/pages/evidence-checklist";
import EvidenceCollection from "@/pages/evidence-collection";
import HumanReview from "@/pages/human-review";
import AIAnalysis from "@/pages/ai-analysis";
import { FallbackAnalysisPage } from "@/pages/fallback-analysis";
import EngineerReview from "@/pages/engineer-review";
import NLPAnalysis from "@/pages/nlp-analysis";
import SummaryReport from "@/pages/summary-report";
import AnalysisDetails from "@/pages/analysis-details";
import NotFound from "@/pages/not-found";
import DebugRoutes from "@/pages/debug-routes";
import FaultReferenceLibrary from "@/pages/admin/fault-reference-library";
import TaxonomyManagement from "@/pages/admin/taxonomy-management";
// import EvidenceLibraryIntegration from "@/pages/evidence-library-integration"; // Removed - causing errors
import EvidenceAnalysisDemo from "@/pages/evidence-analysis-demo";
import RCAAnalysisDemo from "@/pages/rca-analysis-demo";
import WorkflowIntegrationDemo from "@/pages/workflow-integration-demo";
import DataIntegrationDemo from "@/pages/data-integration-demo";
import DeploymentReadyDashboard from "@/pages/deployment-ready-dashboard";
import { WorkflowIntegration } from "@/pages/WorkflowIntegration";
import RcaTriage from "@/pages/rca-triage";
import RcaCases from "@/pages/rca-cases";


function Router() {
  console.log('Current route:', window.location.pathname + window.location.search);
  console.log('Full URL:', window.location.href);
  
  // Initialize bulletproof caching solution
  useEffect(() => {
    initVersionManagement().catch(console.error);
  }, []);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/new" component={NewInvestigation} />
      <Route path="/investigation/:id/type" component={InvestigationType} />
      <Route path="/investigation/:id/evidence" component={EvidenceCollectionOld} />
      <Route path="/investigation/:id" component={AnalysisDetail} />
      <Route path="/admin" component={AdminSettings} />
      {/* Legacy admin-settings redirect - zero hardcoding compliance */}
      <Route path="/admin-settings">
        {() => {
          // Dynamic redirect to correct path using browser origin (no hardcoding)
          const redirectUrl = new URL('/admin', window.location.origin);
          redirectUrl.search = window.location.search; // Preserve query params
          window.location.replace(redirectUrl.toString());
          return null;
        }}
      </Route>
      {/* Canonical Admin Routes - Configuration Tools Only */}
      <Route path="/admin/evidence" component={EvidenceLibraryManagement} />
      <Route path="/admin/integrations" component={WorkflowIntegrationDemo} />
      <Route path="/admin/taxonomy" component={TaxonomyManagement} />
      
      {/* Main User Workflow Routes - For Investigators & Analysts */}
      <Route path="/incident-reporting" component={IncidentReporting} />
      <Route path="/incidents/:id/rca-triage" component={RcaTriage} />
      <Route path="/rca/cases" component={RcaCases} />
      <Route path="/workflow/integration" component={WorkflowIntegration} />
      <Route path="/analysis-engine" component={EvidenceAnalysisDemo} />
      <Route path="/ai-powered-rca" component={RCAAnalysisDemo} />
      <Route path="/analysis-history" component={DeploymentReadyDashboard} />
      
      {/* Legacy route redirects */}
      <Route path="/admin/evidence-library" component={EvidenceLibraryAdmin} />
      <Route path="/admin/evidence-management" component={EvidenceLibrarySimple} />
      <Route path="/admin/evidence-library-management" component={EvidenceLibraryManagement} />
      <Route path="/admin/fault-reference-library" component={FaultReferenceLibrary} />
      {/* Route removed - was causing JSX errors */}
      <Route path="/evidence-analysis-demo" component={EvidenceAnalysisDemo} />
      <Route path="/rca-analysis-demo" component={RCAAnalysisDemo} />
      <Route path="/workflow-integration-demo" component={WorkflowIntegrationDemo} />
      <Route path="/data-integration-demo" component={DataIntegrationDemo} />
      <Route path="/deployment-ready" component={DeploymentReadyDashboard} />
      <Route path="/evidence-library-management" component={EvidenceLibrarySimple} />
      <Route path="/evidence-library" component={EvidenceLibrarySimple} />
      <Route path="/debug" component={DebugRoutes} />
      
      {/* Legacy redirects for moved workflow routes */}
      <Route path="/admin/analysis-engine" component={() => { window.location.href = '/analysis-engine'; return null; }} />
      <Route path="/admin/ai-powered-rca" component={() => { window.location.href = '/ai-powered-rca'; return null; }} />
      <Route path="/admin/analysis" component={() => { window.location.href = '/analysis-engine'; return null; }} />
      <Route path="/admin/ai" component={() => { window.location.href = '/ai-powered-rca'; return null; }} />
      <Route path="/equipment-selection" component={EquipmentSelection} />
      <Route path="/evidence-checklist" component={EvidenceChecklist} />
      <Route path="/evidence-collection" component={EvidenceCollection} />
      <Route path="/human-review" component={HumanReview} />
      <Route path="/incidents/:id/human-review" component={HumanReview} />
      <Route path="/incidents/:id/analysis" component={AIAnalysis} />
      <Route path="/ai-analysis" component={AIAnalysis} />
      <Route path="/engineer-review" component={EngineerReview} />
      <Route path="/nlp-analysis" component={NLPAnalysis} />
      <Route path="/incidents/:id/fallback-analysis" component={FallbackAnalysisPage} />
      <Route path="/summary-report/:incidentId" component={SummaryReport} />
      <Route path="/analysis-details/:incidentId" component={AnalysisDetails} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
