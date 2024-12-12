import { GanttChart } from "./component/gantt/GanttChart";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
 return (
  <NotificationProvider>
   <div className="min-h-screen bg-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div className="bg-white rounded-lg shadow p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
       Project Timeline
      </h1>
      <GanttChart />
     </div>
    </div>
   </div>
  </NotificationProvider>
 );
}

export default App;
