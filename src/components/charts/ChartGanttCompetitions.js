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
      .map((c) => ({
        name: c.root?.name ? c.root.name : c.name,
        startingDate: c.startingDate,
        type: c.type,
      }))
      .reduce((accumulator, current) => {
        if (!accumulator.find((item) => item.name === current.name && item.startingDate === current.startingDate)) {
          accumulator.push(current);
        }
        return accumulator;
      }, [])
      .map((c, i) => ({
        id: i,
        name: c.name,
        start: new Date(c.startingDate),
        end: new Date(c.startingDate + 500000000),
        styles: {
          backgroundColor: c.type === "CUP" ? "#0dcaf0" : "#adb5bd",
        }
      }));
  };

  const config = {
    todayColor: "red",
    rowHeight: 18,
  };

  return (
    <div className="mb-4 py-2 px-1 px-md-3">
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
            allowSorting={true}
            {...config}
          />
        }
      </div>
  	</div>
  );
};

export default ChartGanttCompetitions;