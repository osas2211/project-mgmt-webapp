import { TasksSummary } from "../components/TasksSummary"

export const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <div className="user-dashboard-top">
        <TasksSummary />
        <div className="user-projects">
          <h3>
            <span></span> Projects Progress
          </h3>
        </div>
      </div>
    </div>
  )
}
