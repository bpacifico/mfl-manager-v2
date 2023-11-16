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
        end: new Date(c.startingDate + 1000000000),
        styles: {
          backgroundColor: "#0dcaf0",
        }
      }));
  };

  const config = {
    todayColor: "red",
    rowHeight: 22,
  };

  return (
    <div className="py-4 px-1 px-md-3">
      <div className="w-100 border border-body">
        {!competitions
          ? <div className="ratio ratio-16x9">
            <LoadingSquare />
          </div>
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