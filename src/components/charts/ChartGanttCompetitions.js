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
  
  const computeData = () => {
    return competitions
      .filter((c) => !c.root)
      .map((c, i) => ({
        id: i,
        name: c.name,
        start: new Date(c.startingDate),
        end: new Date(c.startingDate + 2000000000),
        styles: {
          barBackgroundColor: "#6c757d",
        }
      }));
  };

  const config = {
    todayColor: "red",
    rowHeight: 22,
  };

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="w-100">
        {!competitions
          ? <LoadingSquare />
          : <Gantt
          	tasks={computeData()}
          	config={config}
          	viewMode={ViewMode.Week}
          	listCellWidth={""}
            {...config}
          />
        }
      </div>
  	</div>
  );
};

export default ChartGanttCompetitions;