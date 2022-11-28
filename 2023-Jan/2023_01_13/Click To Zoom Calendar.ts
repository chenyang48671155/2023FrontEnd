interface IDate {
  day: number;
  full: string;
  index: number;
  title: string;
}

interface ISize {
  height: number;
  width: number;
}

const dates: IDate[] = [
  {
    day: 30,
    full: "2022-01-30",
  },
  {
    day: 31,
    full: "2022-01-31",
  },
  {
    day: 1,
    full: "2022-02-01",
    title: "Dark Chocolate Day",
  },
  {
    day: 2,
    full: "2022-02-02",
    title: "Groundhog Day",
  },
  {
    day: 3,
    full: "2022-02-03",
    title: "Carrot Cake Day",
  },
  {
    day: 4,
    full: "2022-02-04",
    title: "Wear Red Day",
  },
  {
    day: 5,
    full: "2022-02-05",
    title: "Weatherperson's Day",
  },
  {
    day: 6,
    full: "2022-02-06",
    title: "Chopsticks Day",
  },
  {
    day: 7,
    full: "2022-02-07",
    title: "Periodic Table Day",
  },
  {
    day: 8,
    full: "2022-02-08",
    title: "Kite Flying Day",
  },
  {
    day: 9,
    full: "2022-02-09",
    title: "Pizza Day",
  },
  {
    day: 10,
    full: "2022-02-10",
    title: "Umbrella Day",
  },
  {
    day: 11,
    full: "2022-02-11",
    title: "Inventor's Day",
  },
  {
    day: 12,
    full: "2022-02-12",
    title: "Global Movie Day",
  },
  {
    day: 13,
    full: "2022-02-13",
    title: "Tortellini Day",
  },
  {
    day: 14,
    full: "2022-02-14",
    title: "Valentine's Day",
  },
  {
    day: 15,
    full: "2022-02-15",
    title: "Gumdrop Day",
  },
  {
    day: 16,
    full: "2022-02-16",
    title: "Do a Grouch a Favor Day",
  },
  {
    day: 17,
    full: "2022-02-17",
    title: "Cabbage Day",
  },
  {
    day: 18,
    full: "2022-02-18",
    title: "Battery Day",
  },
  {
    day: 19,
    full: "2022-02-19",
    title: "Chocolate Mint Day",
  },
  {
    day: 20,
    full: "2022-02-20",
    title: "Love Your Pet Day",
  },
  {
    day: 21,
    full: "2022-02-21",
    title: "President's Day",
  },
  {
    day: 22,
    full: "2022-02-22",
    title: "Cook a Sweet Potato Day",
  },
  {
    day: 23,
    full: "2022-02-23",
    title: "Tile Day",
  },
  {
    day: 24,
    full: "2022-02-24",
    title: "Toast Day",
  },
  {
    day: 25,
    full: "2022-02-25",
    title: "Clam Chowder Day",
  },
  {
    day: 26,
    full: "2022-02-26",
    title: "Pistachio Day",
  },
  {
    day: 27,
    full: "2022-02-27",
    title: "Polar Bear Day",
  },
  {
    day: 28,
    full: "2022-02-28",
    title: "Tooth Fairy Day",
  },
  {
    day: 1,
    full: "2022-03-01",
  },
  {
    day: 2,
    full: "2022-03-02",
  },
  {
    day: 3,
    full: "2022-03-03",
  },
  {
    day: 4,
    full: "2022-03-04",
  },
  {
    day: 5,
    full: "2022-03-05",
  },
].map((date: IDate, index: number) => ({ ...date, index }));

const weekdays: string[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface IDateUtility {
  getAllDates: () => IDate[];
  getDayOfWeek: (day: number) => string;
  getWeekdays: () => string[];
}

const DateUtility: IDateUtility = {
  getAllDates: (): IDate[] => dates,
  getDayOfWeek: (day: number): string => DateUtility.getWeekdays()[day],
  getWeekdays: (): string[] => weekdays,
};

interface ITransformUtility {
  calculateX: () => number;
  calculateY: () => number;
  getGridGap: () => number;
}

const TransformUtility: ITransformUtility = {
  calculateX: (
    index: number,
    calendarWidth: number,
    boxSize: number,
    scale: number,
    gridGap: number
  ): number => {
    const startingColumnIndex: number = 3,
      startingXPercent: number = -50;

    const columnIndex: number = index % 7,
      columnIndexDiff: number = columnIndex - startingColumnIndex;

    const xPaddingPercent: number =
        ((gridGap * columnIndexDiff) / calendarWidth) * 100,
      xWidthPercent: number =
        ((columnIndexDiff * boxSize) / calendarWidth) * 100,
      xPercent: number = xPaddingPercent + xWidthPercent;

    return startingXPercent - xPercent * scale;
  },
  calculateY: (
    index: number,
    calendarHeight: number,
    boxSize: number,
    scale: number,
    gridGap: number
  ): number => {
    const startingRowIndex: number = 2,
      startingYPercent: number = -50;

    const rowIndex: number = Math.floor(index / 7),
      rowIndexDiff: number = rowIndex - startingRowIndex;

    const yPaddingPercent: number =
        ((gridGap * rowIndexDiff) / calendarHeight) * 100,
      yHeightPercent: number =
        ((rowIndexDiff * boxSize) / calendarHeight) * 100,
      yPercent: number = yPaddingPercent + yHeightPercent;

    return startingYPercent - yPercent * scale;
  },
  getGridGap: () => {
    const calendar: HTMLElement = document.getElementById("calendar-dates");

    if (calendar) {
      const style = window.getComputedStyle(calendar);

      return style.getPropertyValue("gap");
    }
  },
};

interface IDateBoxProps {
  full: string;
  title: string;
  selected: boolean;
  select: () => void;
}

const DateBox: React.FC<IDateBoxProps> = (props: IDateBoxProps) => {
  const today = new Date("2022-02-01T12:00:00"),
    date = new Date(`${props.full}T12:00:00`);

  const activeMonth = today.getMonth() === date.getMonth(),
    activeDay: boolean = activeMonth && today.getDate() === date.getDate();

  const getTitle = (): JSX.Element => {
    if (props.title) {
      return (
        <div className="date-title">
          <div className="date-title-dot" />
          <h2>{props.title}</h2>
        </div>
      );
    }
  };

  const getActiveDayIndicator = (): JSX.Element => {
    if (activeDay) {
      return <div className="active-day-indicator" />;
    }
  };

  const getClasses = (): string => {
    return classNames("date-wrapper", {
      "active-day": activeDay,
      "active-month": activeMonth,
    });
  };

  const id: string = `date-${props.full}`;

  return (
    <button
      id={id}
      className={getClasses()}
      disabled={!activeMonth}
      onClick={props.select}
    >
      <div className="date">
        <div className="date-day">
          <h2 className="date-day-of-month">{date.getDate()}</h2>
          <h2 className="date-day-of-week">
            {DateUtility.getDayOfWeek(date.getDay()).substring(0, 3)}
          </h2>
        </div>
        {getTitle()}
      </div>
      {getActiveDayIndicator()}
    </button>
  );
};

interface ICalendarState {
  boxSize: ISize;
  calendarSize: ISize;
  selectedDate: IDate;
  windowSize: ISize;
}

const Calendar: React.FC = () => {
  const [state, setStateTo] = React.useState<ICalendarState>({
    boxSize: null,
    calendarSize: null,
    selectedDate: null,
    windowSize: null,
  });

  const ref: React.MutableRefObject<HTMLDivElement> =
    React.useRef<HTMLDivElement>(null);

  const setBoxSizeTo = (boxSize: ISize): void => {
    setStateTo({ ...state, boxSize });
  };

  const setCalendarSizeTo = (calendarSize: ISize): void => {
    setStateTo({ ...state, calendarSize });
  };

  const setSelectedDateTo = (selectedDate: IDate): void => {
    setStateTo({ ...state, selectedDate });
  };

  React.useEffect(() => {
    if (ref) {
      const box: HTMLElement = document.getElementById("date-2022-02-01");

      const boxSize: ISize = {
        height: box.clientHeight,
        width: box.clientWidth,
      };

      const calendarSize: ISize = {
        height: ref.current.clientHeight,
        width: ref.current.clientWidth,
      };

      setStateTo({ ...state, boxSize, calendarSize });
    }
  }, [state.windowSize]);

  React.useEffect(() => {
    const handleOnResize = (): void => {
      const windowSize: ISize = {
        height: window.innerHeight,
        width: window.innerWidth,
      };

      setStateTo({ ...state, selectedDate: null, windowSize });
    };

    handleOnResize();

    window.addEventListener("resize", handleOnResize);

    return () => {
      window.removeEventListener("resize", handleOnResize);
    };
  }, []);

  const selectDate = (date: IDate): void => {
    if (state.windowSize && state.windowSize.width > 1000) {
      if (state.selectedDate && state.selectedDate.full === date.full) {
        setSelectedDateTo(null);
      } else {
        setSelectedDateTo(date);
      }
    }
  };

  const getDates = (): JSX.Element[] => {
    return dates.map((date: IDate) => {
      return (
        <DateBox
          key={date.full}
          day={date.day}
          full={date.full}
          title={date.title}
          selected={state.selectedDate && state.selectedDate.full === date.full}
          select={() => selectDate(date)}
        />
      );
    });
  };

  const getStyles = (): React.CSSProperties => {
    const styles: React.CSSProperties = {};

    const { calendarSize, boxSize, selectedDate } = state;

    if (calendarSize && boxSize && selectedDate) {
      const scale: number = 4,
        gridGap: number = parseInt(TransformUtility.getGridGap());

      const x: number = TransformUtility.calculateX(
          selectedDate.index,
          calendarSize.width,
          boxSize.width,
          scale,
          gridGap
        ),
        y: number = TransformUtility.calculateY(
          selectedDate.index,
          calendarSize.height,
          boxSize.height,
          scale,
          gridGap
        );

      styles.transform = `translate(${x}%, ${y}%) scale(${scale})`;
    }

    return styles;
  };

  return (
    <div id="calendar">
      <div ref={ref} id="calendar-dates" style={getStyles()}>
        {getDates()}
      </div>
    </div>
  );
};

const Background: React.FC = () => {
  return (
    <div id="calendar-background-wrapper">
      <div id="calendar-background" />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <div id="app">
      <Background />
      <Calendar />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
