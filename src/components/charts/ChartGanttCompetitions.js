import React from 'react';
import { Gantt, ViewMode } from 'gantt-task-react';
import LoadingSquare from "components/loading/LoadingSquare";
import "gantt-task-react/dist/index.css";

interface Competition {
  id: number;
}

interface ChartGanttCompetitionsProps {
  competitions: Competition[];
}

const ChartGanttCompetitions: React.FC<ChartGanttCompetitionsProps> = ({ competitions }) => {
  
  const tasks = [
    {
      id: 'Task-1',
      name: 'Task 1',
      start: new Date(2020, 1, 1),
      end: new Date(2020, 1, 1),
    },
    {
      id: 'Task-2',
      name: 'Task 2',
      start: new Date(2020, 2, 10),
      end: new Date(2020, 2, 20),
      styles: {
      	backgroundColor: "blue",
      }
    },
  ];

  const config = {
    headerHasStartAndEnd: true,
    todayColor: "red",
  };

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="w-100">
        {!competitions
          ? <LoadingSquare />
          : <Gantt
          	tasks={tasks}
          	config={config}
          	viewMode={ViewMode.Year}
          	listCellWidth={""}
          />
        }
      </div>
  	</div>
  );
};

export default ChartGanttCompetitions;