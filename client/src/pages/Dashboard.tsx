import { ProjectsSummary } from "../components/ProjectsSummary"
import { TasksSummary } from "../components/TasksSummary"

export const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="user-dashboard-top">
        <TasksSummary />
        <ProjectsSummary />
      </div>
    </div>
  )
}
